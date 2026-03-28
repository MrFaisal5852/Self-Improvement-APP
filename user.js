/**
 * NOVA Mastery Hub - User Module
 * User Management, Reports & Strike System
 * Version 2.0
 */

const User = {
    currentUser: null,

    init() {
        this.currentUser = UserStorage.getUser();
        this.checkStrikes();
        console.log('[User] Loaded:', this.currentUser.name);
        return this.currentUser;
    },

    getProfile() {
        return this.currentUser;
    },

    updateProfile(updates) {
        this.currentUser = UserStorage.updateUser(updates);
        return this.currentUser;
    },

    setName(name) {
        this.currentUser = UserStorage.updateUser({ name });
    },

    getSettings() {
        return this.currentUser.settings || UserStorage.getDefaultSettings();
    },

    updateSettings(settings) {
        this.currentUser = UserStorage.updateUser({ settings: { ...this.getSettings(), ...settings } });
    },

    checkStrikes() {
        return StrikeStorage.checkAndReset();
    },

    getStrikeStatus() {
        return StrikeStorage.getStrikeStatus();
    },

    addStrike(reason) {
        const result = StrikeStorage.addStrike(reason);
        this.generateStrikeReport(result);
        return result;
    },

    resetStrikes() {
        StrikeStorage.resetStrikes();
    },

    generateStrikeReport(strikeResult) {
        ReportsStorage.addReport({
            type: 'strike',
            title: 'Strike Added',
            data: strikeResult,
            insights: [`Current strikes: ${strikeResult.currentCount}/${strikeResult.maxStrikes}`],
            score: 100 - (strikeResult.currentCount * 33)
        });
    },

    getActivityLog() {
        const reports = ReportsStorage.getReports();
        return reports.filter(r => r.type === 'activity').slice(0, 50);
    },

    logActivity(type, details = {}) {
        ReportsStorage.addReport({
            type: 'activity',
            title: type,
            data: details,
            score: 100
        });
    }
};

// Reports Module
const Reports = {
    generateDailyReport() {
        const today = new Date().toDateString();
        const tasks = App?.state?.tasks || [];
        const habits = App?.state?.habits || [];
        const stats = App?.state?.stats || {};
        
        const completedTasks = tasks.filter(t => t.completed).length;
        const totalTasks = tasks.length;
        const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        
        const todayHabits = habits.filter(h => h.completedDates?.includes(today)).length;
        const habitCompletionRate = habits.length > 0 ? Math.round((todayHabits / habits.length) * 100) : 0;
        
        const report = {
            type: 'daily',
            title: `Daily Report - ${new Date().toLocaleDateString()}`,
            data: {
                tasks: { completed: completedTasks, total: totalTasks, rate: taskCompletionRate },
                habits: { completed: todayHabits, total: habits.length, rate: habitCompletionRate },
                focus: { minutes: stats.focusMinutes || 0 },
                points: stats.totalPoints || 0,
                streak: stats.streak || 0
            },
            insights: this.generateInsights(taskCompletionRate, habitCompletionRate),
            score: Math.round((taskCompletionRate + habitCompletionRate) / 2)
        };
        
        const savedReport = ReportsStorage.addReport(report);
        
        if (taskCompletionRate >= 80 && habitCompletionRate >= 80) {
            User.addStrike('Good activity - No strike earned');
        }
        
        return savedReport;
    },

    generateInsights(taskRate, habitRate) {
        const insights = [];
        
        if (taskRate >= 80) {
            insights.push('Excellent task completion! Keep up the great work.');
        } else if (taskRate >= 50) {
            insights.push('Good progress on tasks. Try to complete more tomorrow.');
        } else {
            insights.push('Focus on completing your tasks. Break them into smaller steps.');
        }
        
        if (habitRate >= 80) {
            insights.push('Amazing habit consistency! Your discipline is showing.');
        } else if (habitRate >= 50) {
            insights.push('Good habit tracking. Try not to miss any days.');
        } else {
            insights.push('Build consistency by starting with just one habit.');
        }
        
        return insights;
    },

    generateWeeklyReport() {
        const weekData = ProgressStorage.getWeeklyStats();
        const avgDaily = {
            tasks: Math.round(weekData.tasks / 7),
            habits: Math.round(weekData.habits / 7),
            focus: Math.round(weekData.focus / 7)
        };
        
        const report = {
            type: 'weekly',
            title: `Weekly Report - Week of ${new Date().toLocaleDateString()}`,
            data: {
                totals: weekData,
                averages: avgDaily,
                goals: User.getSettings()
            },
            insights: this.analyzeWeeklyTrends(weekData),
            score: this.calculateWeeklyScore(weekData)
        };
        
        return ReportsStorage.addReport(report);
    },

    analyzeWeeklyTrends(data) {
        const insights = [];
        
        if (data.tasks >= 50) {
            insights.push('Outstanding week! You completed over 50 tasks.');
        } else if (data.tasks >= 30) {
            insights.push('Great week with solid task completion.');
        }
        
        if (data.habits >= 40) {
            insights.push('Excellent habit consistency this week!');
        }
        
        if (data.focus >= 300) {
            insights.push('Amazing focus time - over 5 hours this week!');
        }
        
        return insights;
    },

    calculateWeeklyScore(data) {
        let score = 0;
        score += Math.min(data.tasks / 50 * 30, 30);
        score += Math.min(data.habits / 40 * 30, 30);
        score += Math.min(data.focus / 300 * 20, 20);
        score += Math.min(data.nutrition / 20 * 10, 10);
        score += Math.min(data.fitness / 5 * 10, 10);
        return Math.round(score);
    },

    generateMonthlyReport() {
        const monthData = ProgressStorage.getMonthlyStats();
        const daysPassed = new Date().getDate();
        const avgDaily = {
            tasks: Math.round(monthData.tasks / daysPassed),
            habits: Math.round(monthData.habits / daysPassed),
            focus: Math.round(monthData.focus / daysPassed)
        };
        
        const report = {
            type: 'monthly',
            title: `Monthly Report - ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
            data: {
                totals: monthData,
                averages: avgDaily,
                daysTracked: daysPassed
            },
            insights: this.analyzeMonthlyTrends(monthData, daysPassed),
            score: this.calculateMonthlyScore(monthData, daysPassed)
        };
        
        return ReportsStorage.addReport(report);
    },

    analyzeMonthlyTrends(data, days) {
        const insights = [];
        
        if (data.tasks >= 200) {
            insights.push('Incredible month! Over 200 tasks completed.');
        }
        
        if (data.habits >= 150) {
            insights.push('Outstanding habit consistency for the month!');
        }
        
        if (data.focus >= 1200) {
            insights.push('20+ hours of focused work this month - amazing dedication!');
        }
        
        return insights;
    },

    calculateMonthlyScore(data, days) {
        let score = 0;
        score += Math.min(data.tasks / (days * 5) * 30, 30);
        score += Math.min(data.habits / (days * 4) * 30, 30);
        score += Math.min(data.focus / (days * 45) * 20, 20);
        score += Math.min(data.nutrition / days * 10, 10);
        score += Math.min(data.fitness / days * 10, 10);
        return Math.round(score);
    },

    getReportById(id) {
        return ReportsStorage.getReportById(id);
    },

    getAllReports(type = null) {
        if (type) {
            return ReportsStorage.getReportsByType(type);
        }
        return ReportsStorage.getReports();
    },

    deleteReport(id) {
        ReportsStorage.deleteReport(id);
    },

    getReportStats() {
        return ReportsStorage.getReportStats();
    }
};

// Auto-generate reports
const ReportScheduler = {
    interval: null,

    init() {
        this.checkAndGenerateReports();
        
        this.interval = setInterval(() => {
            this.checkAndGenerateReports();
        }, 60 * 60 * 1000);
        
        console.log('[ReportScheduler] Started');
    },

    checkAndGenerateReports() {
        const now = new Date();
        const hour = now.getHours();
        
        if (hour === 0) {
            Reports.generateDailyReport();
        }
        
        if (now.getDay() === 0 && hour === 1) {
            Reports.generateWeeklyReport();
        }
        
        if (now.getDate() === 1 && hour === 2) {
            Reports.generateMonthlyReport();
        }
    },

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
};

User.init();
