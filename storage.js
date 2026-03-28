/**
 * NOVA Mastery Hub - Storage Module
 * Advanced Data Persistence System
 * Version 2.0
 */

const Storage = {
    prefix: 'nova_',
    version: '2.0.0',

    init() {
        this.migrateIfNeeded();
        console.log('[Storage] Initialized v' + this.version);
    },

    get(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(this.prefix + key);
            if (data === null) return defaultValue;
            const parsed = JSON.parse(data);
            return parsed.value !== undefined ? parsed.value : parsed;
        } catch (e) {
            console.error('[Storage] Error reading:', key, e);
            return defaultValue;
        }
    },

    set(key, value) {
        try {
            const data = {
                value,
                timestamp: Date.now(),
                version: this.version
            };
            localStorage.setItem(this.prefix + key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('[Storage] Error writing:', key, e);
            return false;
        }
    },

    remove(key) {
        localStorage.removeItem(this.prefix + key);
    },

    clear() {
        const keys = Object.keys(localStorage).filter(k => k.startsWith(this.prefix));
        keys.forEach(k => localStorage.removeItem(k));
    },

    getAll() {
        const data = {};
        Object.keys(localStorage).forEach(k => {
            if (k.startsWith(this.prefix)) {
                const key = k.replace(this.prefix, '');
                data[key] = this.get(key);
            }
        });
        return data;
    },

    migrateIfNeeded() {
        const lastVersion = this.get('version');
        if (lastVersion !== this.version) {
            console.log('[Storage] Migrating from', lastVersion, 'to', this.version);
            this.set('version', this.version);
        }
    }
};

// User Data Management
const UserStorage = {
    getUser() {
        return Storage.get('user', {
            id: this.generateId(),
            name: 'User',
            createdAt: Date.now(),
            settings: this.getDefaultSettings()
        });
    },

    saveUser(user) {
        Storage.set('user', user);
    },

    updateUser(updates) {
        const user = this.getUser();
        Object.assign(user, updates);
        this.saveUser(user);
        return user;
    },

    generateId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    getDefaultSettings() {
        return {
            theme: 'cosmic-purple',
            dailyCalorieGoal: 2500,
            dailyProteinGoal: 150,
            dailyCarbsGoal: 250,
            dailyFatsGoal: 70,
            notifications: true,
            autoSave: true
        };
    }
};

// Reports Storage System
const ReportsStorage = {
    getReports() {
        return Storage.get('reports', []);
    },

    addReport(report) {
        const reports = this.getReports();
        const newReport = {
            id: 'report_' + Date.now(),
            date: new Date().toISOString(),
            type: report.type || 'general',
            title: report.title || 'Report',
            data: report.data || {},
            insights: report.insights || [],
            score: report.score || 0,
            createdAt: Date.now()
        };
        reports.unshift(newReport);
        Storage.set('reports', reports);
        return newReport;
    },

    getReportById(id) {
        const reports = this.getReports();
        return reports.find(r => r.id === id);
    },

    deleteReport(id) {
        const reports = this.getReports().filter(r => r.id !== id);
        Storage.set('reports', reports);
    },

    getReportsByType(type) {
        return this.getReports().filter(r => r.type === type);
    },

    getReportsInRange(startDate, endDate) {
        return this.getReports().filter(r => {
            const date = new Date(r.date).getTime();
            return date >= startDate && date <= endDate;
        });
    },

    clearOldReports(daysToKeep = 30) {
        const cutoff = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000);
        const reports = this.getReports().filter(r => r.createdAt > cutoff);
        Storage.set('reports', reports);
    },

    getReportStats() {
        const reports = this.getReports();
        const types = {};
        reports.forEach(r => {
            types[r.type] = (types[r.type] || 0) + 1;
        });
        return {
            total: reports.length,
            byType: types,
            latest: reports[0] || null
        };
    }
};

// Strike System
const StrikeStorage = {
    STRIKE_CONFIG: {
        maxStrikes: 3,
        resetHours: 24,
        graceMinutes: 30
    },

    getStrikes() {
        return Storage.get('strikes', {
            count: 0,
            history: [],
            lastReset: null,
            currentStreak: 0,
            longestStreak: 0,
            lastActivity: null
        });
    },

    addStrike(reason = '') {
        const strikes = this.getStrikes();
        const now = Date.now();
        
        const newStrike = {
            id: 'strike_' + now,
            timestamp: now,
            reason: reason,
            date: new Date().toISOString()
        };
        
        strikes.count++;
        strikes.history.push(newStrike);
        strikes.lastActivity = now;
        
        if (strikes.count >= this.STRIKE_CONFIG.maxStrikes) {
            strikes.currentStreak = 0;
        }
        
        Storage.set('strikes', strikes);
        
        return {
            added: true,
            currentCount: strikes.count,
            maxStrikes: this.STRIKE_CONFIG.maxStrikes,
            isLocked: strikes.count >= this.STRIKE_CONFIG.maxStrikes
        };
    },

    removeStrike(strikeId) {
        const strikes = this.getStrikes();
        strikes.history = strikes.history.filter(s => s.id !== strikeId);
        strikes.count = Math.max(0, strikes.count - 1);
        Storage.set('strikes', strikes);
    },

    checkAndReset() {
        const strikes = this.getStrikes();
        const now = Date.now();
        
        if (strikes.lastReset) {
            const hoursSinceReset = (now - strikes.lastReset) / (1000 * 60 * 60);
            
            if (hoursSinceReset >= this.STRIKE_CONFIG.resetHours && strikes.count > 0) {
                strikes.count = 0;
                strikes.currentStreak++;
                strikes.lastReset = now;
                
                if (strikes.currentStreak > strikes.longestStreak) {
                    strikes.longestStreak = strikes.currentStreak;
                }
                
                Storage.set('strikes', strikes);
                return { reset: true, newStreak: strikes.currentStreak };
            }
        }
        
        return { reset: false };
    },

    recordActivity() {
        const strikes = this.getStrikes();
        strikes.lastActivity = Date.now();
        
        if (!strikes.lastReset) {
            strikes.lastReset = Date.now();
        }
        
        Storage.set('strikes', strikes);
    },

    getStrikeStatus() {
        const strikes = this.getStrikes();
        const now = Date.now();
        
        let timeUntilReset = 0;
        if (strikes.lastReset) {
            const resetTime = strikes.lastReset + (this.STRIKE_CONFIG.resetHours * 60 * 60 * 1000);
            timeUntilReset = Math.max(0, resetTime - now);
        }
        
        return {
            current: strikes.count,
            max: this.STRIKE_CONFIG.maxStrikes,
            remaining: this.STRIKE_CONFIG.maxStrikes - strikes.count,
            currentStreak: strikes.currentStreak,
            longestStreak: strikes.longestStreak,
            isLocked: strikes.count >= this.STRIKE_CONFIG.maxStrikes,
            timeUntilReset: timeUntilReset,
            canReset: timeUntilReset === 0 && strikes.count > 0
        };
    },

    resetStrikes() {
        const strikes = this.getStrikes();
        strikes.count = 0;
        strikes.history = [];
        strikes.currentStreak = 0;
        Storage.set('strikes', strikes);
    }
};

// Progress Tracking
const ProgressStorage = {
    getProgress() {
        return Storage.get('progress', {
            tasks: { completed: 0, total: 0, streak: 0 },
            habits: { completed: 0, total: 0, streak: 0 },
            focus: { minutes: 0, sessions: 0 },
            nutrition: { mealsLogged: 0, caloriesConsumed: 0 },
            learning: { words: 0, hours: 0 },
            fitness: { workouts: 0, caloriesBurned: 0 },
            weeklyData: this.getEmptyWeeklyData(),
            monthlyData: this.getEmptyMonthlyData()
        });
    },

    getEmptyWeeklyData() {
        return Array(7).fill(null).map(() => ({
            tasks: 0,
            habits: 0,
            focus: 0,
            nutrition: 0,
            fitness: 0
        }));
    },

    getEmptyMonthlyData() {
        return Array(30).fill(null).map(() => ({
            tasks: 0,
            habits: 0,
            focus: 0,
            nutrition: 0,
            fitness: 0
        }));
    },

    updateProgress(category, value) {
        const progress = this.getProgress();
        const today = new Date();
        const dayIndex = today.getDay();
        
        if (progress.weeklyData[dayIndex]) {
            progress.weeklyData[dayIndex][category] += value;
        }
        
        const monthIndex = today.getDate() - 1;
        if (progress.monthlyData[monthIndex]) {
            progress.monthlyData[monthIndex][category] += value;
        }
        
        Storage.set('progress', progress);
    },

    getWeeklyStats() {
        const progress = this.getProgress();
        const today = new Date();
        const dayIndex = today.getDay();
        
        let weekData = { tasks: 0, habits: 0, focus: 0, nutrition: 0, fitness: 0 };
        
        for (let i = 0; i <= dayIndex; i++) {
            if (progress.weeklyData[i]) {
                Object.keys(weekData).forEach(key => {
                    weekData[key] += progress.weeklyData[i][key] || 0;
                });
            }
        }
        
        return weekData;
    },

    getMonthlyStats() {
        const progress = this.getProgress();
        const today = new Date();
        const dayOfMonth = today.getDate();
        
        let monthData = { tasks: 0, habits: 0, focus: 0, nutrition: 0, fitness: 0 };
        
        for (let i = 0; i < dayOfMonth; i++) {
            if (progress.monthlyData[i]) {
                Object.keys(monthData).forEach(key => {
                    monthData[key] += progress.monthlyData[i][key] || 0;
                });
            }
        }
        
        return monthData;
    }
};

// Data Export/Import
const DataManager = {
    exportData(format = 'json') {
        const data = {
            exportDate: new Date().toISOString(),
            version: Storage.version,
            user: UserStorage.getUser(),
            reports: ReportsStorage.getReports(),
            strikes: StrikeStorage.getStrikes(),
            progress: ProgressStorage.getProgress(),
            tasks: App?.state?.tasks || [],
            habits: App?.state?.habits || [],
            notes: App?.state?.notes || [],
            quickTodos: App?.state?.quickTodos || [],
            dietPlan: Nutrition?.dietPlan || {},
            stats: App?.state?.stats || {}
        };

        if (format === 'json') {
            return JSON.stringify(data, null, 2);
        } else if (format === 'blob') {
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `nova_backup_${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
            return true;
        }
        
        return data;
    },

    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            
            if (data.user) Storage.set('user', data.user);
            if (data.reports) Storage.set('reports', data.reports);
            if (data.strikes) Storage.set('strikes', data.strikes);
            if (data.progress) Storage.set('progress', data.progress);
            if (data.tasks) Storage.set('Tasks', data.tasks);
            if (data.habits) Storage.set('Habits', data.habits);
            if (data.notes) Storage.set('Notes', data.notes);
            if (data.quickTodos) Storage.set('QuickTodos', data.quickTodos);
            if (data.dietPlan) Storage.set('DietPlan', data.dietPlan);
            if (data.stats) Storage.set('Stats', data.stats);
            
            return { success: true, message: 'Data imported successfully' };
        } catch (e) {
            return { success: false, message: 'Invalid JSON format' };
        }
    },

    clearAllData() {
        Storage.clear();
        return { success: true, message: 'All data cleared' };
    },

    getStorageSize() {
        let total = 0;
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(Storage.prefix)) {
                total += localStorage[key].length;
            }
        });
        return {
            used: (total / 1024).toFixed(2) + ' KB',
            items: Object.keys(localStorage).filter(k => k.startsWith(Storage.prefix)).length
        };
    }
};

Storage.init();
