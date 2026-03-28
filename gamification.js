/**
 * NOVA Mastery Hub - Gamification System v3.0
 * Advanced XP, Levels, Achievements & Rewards
 * Pro-Level Architecture with Animations
 */

const Gamification = (function() {
    'use strict';

    // ============================================
    // LEVEL CONFIGURATION
    // ============================================
    const LEVELS = {
        // 🌱 Early Levels (1-5)
        1: { name: 'Beginner', emoji: '🌱', minXP: 0, color: '#22c55e', title: 'Just Starting' },
        2: { name: 'Starter', emoji: '🌿', minXP: 100, color: '#4ade80', title: 'Getting Going' },
        3: { name: 'Explorer', emoji: '🌳', minXP: 250, color: '#86efac', title: 'Exploring' },
        4: { name: 'Learner', emoji: '📚', minXP: 500, color: '#fde047', title: 'Growing' },
        5: { name: 'Rising Star', emoji: '⭐', minXP: 1000, color: '#fbbf24', title: 'Shining Bright' },
        
        // ⚡ Mid Levels (6-15)
        6: { name: 'Achiever', emoji: '🎯', minXP: 1800, color: '#f97316', title: 'Goal Crusher' },
        7: { name: 'Performer', emoji: '🎭', minXP: 2800, color: '#fb923c', title: 'Stage Ready' },
        8: { name: 'Consistent', emoji: '🔄', minXP: 4000, color: '#fdba74', title: 'Never Stops' },
        9: { name: 'Dedicated', emoji: '💪', minXP: 5500, color: '#ef4444', title: 'Fully Committed' },
        10: { name: 'Prodigy', emoji: '🔥', minXP: 7500, color: '#f87171', title: 'On Fire!' },
        11: { name: 'Advanced', emoji: '🚀', minXP: 10000, color: '#ec4899', title: 'Leveling Up' },
        12: { name: 'Specialist', emoji: '💎', minXP: 13000, color: '#f472b6', title: 'Deep Focus' },
        13: { name: 'Expert', emoji: '🏆', minXP: 17000, color: '#a855f7', title: 'Authority' },
        14: { name: 'Elite', emoji: '⚡', minXP: 22000, color: '#c084fc', title: 'Top Tier' },
        15: { name: 'Master', emoji: '🧠', minXP: 28000, color: '#9333ea', title: 'Grand Knowledge' },
        
        // 👑 High Levels (16-25)
        16: { name: 'Grandmaster', emoji: '👑', minXP: 35000, color: '#6366f1', title: 'Royalty' },
        17: { name: 'Champion', emoji: '🏅', minXP: 43000, color: '#818cf8', title: 'First Place' },
        18: { name: 'Titan', emoji: '🗿', minXP: 52000, color: '#0ea5e9', title: 'Unstoppable' },
        19: { name: 'Legend', emoji: '📜', minXP: 62000, color: '#38bdf8', title: 'Story Worth Telling' },
        20: { name: 'Mythic', emoji: '✨', minXP: 75000, color: '#22d3ee', title: 'Beyond Normal' },
        21: { name: 'Ascended', emoji: '🌟', minXP: 90000, color: '#fb7185', title: 'Transcending' },
        22: { name: 'Supreme', emoji: '💫', minXP: 110000, color: '#f43f5e', title: 'Peak Power' },
        23: { name: 'Immortal', emoji: '♾️', minXP: 135000, color: '#e11d48', title: 'Eternal' },
        24: { name: 'Transcendent', emoji: '🌌', minXP: 165000, color: '#be185d', title: 'Beyond Reality' },
        25: { name: 'NOVA Master', emoji: '🌌', minXP: 200000, color: '#8b5cf6', title: 'The Ultimate' }
    };

    const MAX_LEVEL = 25;
    const XP_MULTIPLIER = 1.15;

    // ============================================
    // ACHIEVEMENT DEFINITIONS
    // ============================================
    const ACHIEVEMENTS = [
        // Task Achievements
        { id: 'task_1', category: 'tasks', name: 'First Step', desc: 'Complete your first task', icon: 'fa-check-circle', xp: 25, requirement: { type: 'tasks', count: 1 } },
        { id: 'task_10', category: 'tasks', name: 'Getting Started', desc: 'Complete 10 tasks', icon: 'fa-tasks', xp: 50, requirement: { type: 'tasks', count: 10 } },
        { id: 'task_50', category: 'tasks', name: 'Task Master', desc: 'Complete 50 tasks', icon: 'fa-list-check', xp: 150, requirement: { type: 'tasks', count: 50 } },
        { id: 'task_100', category: 'tasks', name: 'Task Champion', desc: 'Complete 100 tasks', icon: 'fa-trophy', xp: 300, requirement: { type: 'tasks', count: 100 } },
        { id: 'task_500', category: 'tasks', name: 'Task Legend', desc: 'Complete 500 tasks', icon: 'fa-crown', xp: 1000, requirement: { type: 'tasks', count: 500 } },
        
        // Habit Achievements
        { id: 'habit_1', category: 'habits', name: 'Habit Former', desc: 'Complete habits 1 day in a row', icon: 'fa-calendar-check', xp: 25, requirement: { type: 'habits', count: 1 } },
        { id: 'habit_7', category: 'habits', name: 'Week Warrior', desc: 'Complete habits for 7 days', icon: 'fa-fire', xp: 100, requirement: { type: 'habits', count: 7 } },
        { id: 'habit_30', category: 'habits', name: 'Monthly Master', desc: 'Complete habits for 30 days', icon: 'fa-calendar', xp: 500, requirement: { type: 'habits', count: 30 } },
        { id: 'habit_100', category: 'habits', name: 'Habit God', desc: 'Complete habits for 100 days', icon: 'fa-infinity', xp: 2000, requirement: { type: 'habits', count: 100 } },
        
        // Streak Achievements
        { id: 'streak_3', category: 'streaks', name: 'Triple Threat', desc: 'Maintain a 3-day streak', icon: 'fa-bolt', xp: 30, requirement: { type: 'streaks', count: 3 } },
        { id: 'streak_7', category: 'streaks', name: 'Week Streak', desc: 'Maintain a 7-day streak', icon: 'fa-fire-alt', xp: 100, requirement: { type: 'streaks', count: 7 } },
        { id: 'streak_30', category: 'streaks', name: 'Monthly Streak', desc: 'Maintain a 30-day streak', icon: 'fa-mountain', xp: 500, requirement: { type: 'streaks', count: 30 } },
        { id: 'streak_100', category: 'streaks', name: 'Unstoppable', desc: 'Maintain a 100-day streak', icon: 'fa-rocket', xp: 2500, requirement: { type: 'streaks', count: 100 } },
        
        // Focus/Pomodoro Achievements
        { id: 'focus_1', category: 'focus', name: 'Focus Beginner', desc: 'Accumulate 1 hour of focus', icon: 'fa-brain', xp: 50, requirement: { type: 'focus', count: 60 } },
        { id: 'focus_10', category: 'focus', name: 'Deep Worker', desc: 'Accumulate 10 hours of focus', icon: 'fa-hourglass-half', xp: 300, requirement: { type: 'focus', count: 600 } },
        { id: 'focus_50', category: 'focus', name: 'Focus Master', desc: 'Accumulate 50 hours of focus', icon: 'fa-gem', xp: 1500, requirement: { type: 'focus', count: 3000 } },
        
        // Learning Achievements
        { id: 'learn_1', category: 'learning', name: 'First Course', desc: 'Complete your first course', icon: 'fa-graduation-cap', xp: 100, requirement: { type: 'learning', count: 1 } },
        { id: 'learn_5', category: 'learning', name: 'Knowledge Seeker', desc: 'Complete 5 courses', icon: 'fa-book-open', xp: 500, requirement: { type: 'learning', count: 5 } },
        { id: 'learn_10', category: 'learning', name: 'Scholar', desc: 'Complete 10 courses', icon: 'fa-university', xp: 1500, requirement: { type: 'learning', count: 10 } },
        
        // Social/Challenge Achievements
        { id: 'challenge_1', category: 'challenges', name: 'Challenger', desc: 'Complete your first daily challenge', icon: 'fa-bullseye', xp: 50, requirement: { type: 'challenges', count: 1 } },
        { id: 'challenge_10', category: 'challenges', name: 'Challenge Seeker', desc: 'Complete 10 challenges', icon: 'fa-crosshairs', xp: 200, requirement: { type: 'challenges', count: 10 } },
        { id: 'challenge_50', category: 'challenges', name: 'Challenge Champion', desc: 'Complete 50 challenges', icon: 'fa-medal', xp: 750, requirement: { type: 'challenges', count: 50 } },
        
        // Level Achievements
        { id: 'level_5', category: 'levels', name: 'Rising Star', desc: 'Reach Level 5', icon: 'fa-star', xp: 200, requirement: { type: 'level', count: 5 } },
        { id: 'level_10', category: 'levels', name: 'Prodigy', desc: 'Reach Level 10', icon: 'fa-fire', xp: 500, requirement: { type: 'level', count: 10 } },
        { id: 'level_15', category: 'levels', name: 'Master', desc: 'Reach Level 15', icon: 'fa-crown', xp: 1000, requirement: { type: 'level', count: 15 } },
        { id: 'level_20', category: 'levels', name: 'Mythic', desc: 'Reach Level 20', icon: 'fa-gem', xp: 2500, requirement: { type: 'level', count: 20 } },
        { id: 'level_25', category: 'levels', name: 'NOVA Master', desc: 'Reach Level 25', icon: 'fa-sun', xp: 10000, requirement: { type: 'level', count: 25 } },
        
        // Special Achievements
        { id: 'night_owl', category: 'special', name: 'Night Owl', desc: 'Complete a task after midnight', icon: 'fa-moon', xp: 50, requirement: { type: 'special', id: 'night_owl' } },
        { id: 'early_bird', category: 'special', name: 'Early Bird', desc: 'Complete a task before 6 AM', icon: 'fa-sunrise', xp: 50, requirement: { type: 'special', id: 'early_bird' } },
        { id: 'perfectionist', category: 'special', name: 'Perfectionist', desc: 'Complete all daily tasks', icon: 'fa-check-double', xp: 100, requirement: { type: 'special', id: 'perfectionist' } }
    ];

    // ============================================
    // PRIVATE STATE
    // ============================================
    let _state = {
        level: 1,
        xp: 0,
        totalXP: 0,
        xpToNextLevel: 100,
        achievements: [],
        badges: [],
        streak: 0,
        maxStreak: 0,
        dailyXP: 0,
        weeklyXP: 0,
        monthlyXP: 0,
        lastActiveDate: null,
        lastXPReset: null,
        lifetimeStats: {
            tasksCompleted: 0,
            habitsCompleted: 0,
            focusMinutes: 0,
            challengesCompleted: 0,
            coursesCompleted: 0,
            perfectDays: 0
        }
    };

    let _eventListeners = new Map();
    let _animationQueue = [];

    // ============================================
    // EVENT SYSTEM
    // ============================================
    const _emit = (event, data) => {
        if (_eventListeners.has(event)) {
            _eventListeners.get(event).forEach(cb => {
                try { cb(data); } catch (e) { console.error('[Gamification] Event error:', e); }
            });
        }
    };

    const on = (event, callback) => {
        if (!_eventListeners.has(event)) _eventListeners.set(event, new Set());
        _eventListeners.get(event).add(callback);
        return () => _eventListeners.get(event)?.delete(callback);
    };

    // ============================================
    // CORE FUNCTIONS
    // ============================================
    const _loadState = () => {
        const saved = Storage.get('gamification_v3', {});
        _state = { ..._state, ...saved };
        _checkDailyReset();
    };

    const _saveState = () => {
        Storage.set('gamification_v3', _state);
    };

    const _checkDailyReset = () => {
        const today = new Date().toDateString();
        if (_state.lastXPReset !== today) {
            _state.dailyXP = 0;
            _state.lastXPReset = today;
            
            // Check streak
            if (_state.lastActiveDate) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                
                if (_state.lastActiveDate !== yesterday.toDateString() && _state.lastActiveDate !== today) {
                    _state.streak = 0;
                }
            }
        }
    };

    const _calculateXPForLevel = (level) => {
        if (level <= 0) return 0;
        let xp = 0;
        for (let i = 1; i < level; i++) {
            xp += Math.floor(100 * Math.pow(XP_MULTIPLIER, i - 1));
        }
        return xp;
    };

    const _getLevelFromXP = (totalXP) => {
        for (let level = MAX_LEVEL; level >= 1; level--) {
            if (totalXP >= LEVELS[level].minXP) {
                return level;
            }
        }
        return 1;
    };

    // ============================================
    // XP & LEVEL SYSTEM
    // ============================================
    const addXP = (amount, source = 'general') => {
        if (amount <= 0) return null;
        
        const oldLevel = _state.level;
        _state.xp += amount;
        _state.totalXP += amount;
        _state.dailyXP += amount;
        _state.weeklyXP += amount;
        _state.monthlyXP += amount;
        
        // Calculate new level
        _state.level = _getLevelFromXP(_state.totalXP);
        _state.xpToNextLevel = LEVELS[_state.level + 1] 
            ? LEVELS[_state.level + 1].minXP - _state.totalXP 
            : 0;
        
        const leveledUp = _state.level > oldLevel;
        
        if (leveledUp) {
            _emit('levelUp', {
                newLevel: _state.level,
                oldLevel: oldLevel,
                levelData: LEVELS[_state.level]
            });
            
            // Bonus XP for level up
            const bonusXP = _state.level * 50;
            _state.xp += bonusXP;
            _state.totalXP += bonusXP;
        }
        
        _saveState();
        
        // Check achievements
        _checkAchievements();
        
        _emit('xpGained', {
            amount,
            source,
            totalXP: _state.totalXP,
            currentLevel: _state.level,
            leveledUp
        });
        
        return {
            amount,
            totalXP: _state.totalXP,
            currentXP: _state.xp,
            xpToNextLevel: _state.xpToNextLevel,
            level: _state.level,
            levelName: LEVELS[_state.level].name,
            leveledUp,
            progress: getProgress()
        };
    };

    const getProgress = () => {
        const levelData = LEVELS[_state.level];
        const nextLevelData = LEVELS[_state.level + 1];
        const prevLevelXP = levelData.minXP;
        const nextLevelXP = nextLevelData ? nextLevelData.minXP : _state.totalXP;
        const levelProgress = nextLevelXP > prevLevelXP 
            ? ((_state.totalXP - prevLevelXP) / (nextLevelXP - prevLevelXP)) * 100 
            : 100;
        
        return {
            level: _state.level,
            levelName: levelData.name,
            levelEmoji: levelData.emoji,
            levelColor: levelData.color,
            levelTitle: levelData.title,
            xp: _state.xp,
            totalXP: _state.totalXP,
            xpToNextLevel: _state.xpToNextLevel,
            progressPercent: Math.min(100, Math.round(levelProgress)),
            isMaxLevel: _state.level >= MAX_LEVEL,
            nextLevelEmoji: nextLevelData?.emoji || '🏆',
            streak: _state.streak,
            maxStreak: _state.maxStreak,
            achievementsUnlocked: _state.achievements.length,
            totalAchievements: ACHIEVEMENTS.length,
            dailyXP: _state.dailyXP,
            weeklyXP: _state.weeklyXP,
            monthlyXP: _state.monthlyXP,
            lifetimeStats: _state.lifetimeStats
        };
    };

    // ============================================
    // ACHIEVEMENT SYSTEM
    // ============================================
    const _checkAchievements = () => {
        const stats = _getStats();
        
        ACHIEVEMENTS.forEach(achievement => {
            if (_hasAchievement(achievement.id)) return;
            
            let unlocked = false;
            const req = achievement.requirement;
            
            switch (req.type) {
                case 'tasks':
                    unlocked = stats.tasksCompleted >= req.count;
                    break;
                case 'habits':
                    unlocked = stats.habitsCompleted >= req.count;
                    break;
                case 'streaks':
                    unlocked = _state.streak >= req.count;
                    break;
                case 'focus':
                    unlocked = (_state.lifetimeStats.focusMinutes || 0) >= req.count;
                    break;
                case 'learning':
                    unlocked = (_state.lifetimeStats.coursesCompleted || 0) >= req.count;
                    break;
                case 'challenges':
                    unlocked = (_state.lifetimeStats.challengesCompleted || 0) >= req.count;
                    break;
                case 'level':
                    unlocked = _state.level >= req.count;
                    break;
            }
            
            if (unlocked) {
                _unlockAchievement(achievement);
            }
        });
    };

    const _unlockAchievement = (achievement) => {
        const unlocked = {
            ...achievement,
            unlockedAt: Date.now(),
            unlockedDate: new Date().toISOString()
        };
        
        _state.achievements.push(unlocked);
        
        // Bonus XP
        addXP(achievement.xp, 'achievement');
        
        _saveState();
        
        _emit('achievementUnlocked', unlocked);
        
        return unlocked;
    };

    const _hasAchievement = (id) => {
        return _state.achievements.some(a => a.id === id);
    };

    const getAchievements = () => {
        return ACHIEVEMENTS.map(achievement => ({
            ...achievement,
            unlocked: _hasAchievement(achievement.id),
            unlockedAt: _state.achievements.find(a => a.id === achievement.id)?.unlockedAt || null
        }));
    };

    const getUnlockedAchievements = () => {
        return _state.achievements;
    };

    const getLockedAchievements = () => {
        return ACHIEVEMENTS.filter(a => !_hasAchievement(a.id));
    };

    // ============================================
    // STATS & TRACKING
    // ============================================
    const _getStats = () => {
        const tasks = Storage.get('Tasks', []);
        const habits = Storage.get('Habits', []);
        const stats = Storage.get('Stats', {});
        
        return {
            tasksCompleted: tasks.filter(t => t.completed).length + (_state.lifetimeStats.tasksCompleted || 0),
            habitsCompleted: habits.reduce((sum, h) => sum + (h.completedDates?.length || 0), 0) + (_state.lifetimeStats.habitsCompleted || 0),
            focusMinutes: (stats.focusMinutes || 0) + (_state.lifetimeStats.focusMinutes || 0),
            coursesCompleted: (_state.lifetimeStats.coursesCompleted || 0),
            challengesCompleted: (_state.lifetimeStats.challengesCompleted || 0),
            streak: _state.streak
        };
    };

    const recordActivity = () => {
        const today = new Date().toDateString();
        
        if (_state.lastActiveDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (_state.lastActiveDate === yesterday.toDateString()) {
                _state.streak++;
            } else if (_state.lastActiveDate !== today) {
                _state.streak = 1;
            }
            
            if (_state.streak > _state.maxStreak) {
                _state.maxStreak = _state.streak;
            }
            
            _state.lastActiveDate = today;
            _saveState();
            
            _emit('streakUpdated', { streak: _state.streak, maxStreak: _state.maxStreak });
        }
    };

    const updateLifetimeStat = (stat, value) => {
        if (_state.lifetimeStats.hasOwnProperty(stat)) {
            _state.lifetimeStats[stat] += value;
            _saveState();
            _checkAchievements();
        }
    };

    // ============================================
    // LEADERBOARD
    // ============================================
    const getLeaderboard = () => {
        return {
            level: _state.level,
            totalXP: _state.totalXP,
            streak: _state.streak,
            achievements: _state.achievements.length,
            rank: _calculateRank()
        };
    };

    const _calculateRank = () => {
        if (_state.level >= 25) return 'NOVA Master';
        if (_state.level >= 20) return 'Mythic';
        if (_state.level >= 15) return 'Master';
        if (_state.level >= 10) return 'Elite';
        if (_state.level >= 5) return 'Rising Star';
        return 'Beginner';
    };

    // ============================================
    // DATA EXPORT/IMPORT
    // ============================================
    const exportData = () => {
        return JSON.stringify(_state, null, 2);
    };

    const importData = (jsonString) => {
        try {
            const data = JSON.parse(jsonString);
            _state = { ..._state, ...data };
            _saveState();
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    };

    // ============================================
    // INITIALIZATION
    // ============================================
    const init = () => {
        _loadState();
        console.log(`[Gamification v3] Level ${_state.level} - ${LEVELS[_state.level].emoji} ${LEVELS[_state.level].name}`);
        _emit('ready', getProgress());
        
        return {
            version: '3.0',
            ...getProgress()
        };
    };

    // Public API
    return {
        // Core
        addXP, getProgress, init,
        
        // Achievements
        getAchievements, getUnlockedAchievements, getLockedAchievements,
        
        // Stats
        recordActivity, updateLifetimeStat, getLeaderboard,
        
        // Data
        exportData, importData,
        
        // Events
        on,
        
        // Getters
        getState: () => ({ ..._state }),
        getLevelData: (level) => LEVELS[level] || null,
        getAllLevels: () => LEVELS,
        getAllAchievements: () => ACHIEVEMENTS,
        getMaxLevel: () => MAX_LEVEL
    };
})();

// Legacy compatibility
const GamificationUI = {
    render: () => {
        const progress = Gamification.getProgress();
        
        return `
            <div class="gamification-panel">
                ${GamificationUI.renderLevelCard(progress)}
                ${GamificationUI.renderProgressBar(progress)}
                ${GamificationUI.renderStats(progress)}
            </div>
        `;
    },
    
    renderLevelCard: (progress) => {
        return `
            <div class="level-card" style="background: linear-gradient(135deg, ${progress.levelColor}22, ${progress.levelColor}44); border-color: ${progress.levelColor}">
                <div class="level-emoji">${progress.levelEmoji}</div>
                <div class="level-info">
                    <div class="level-number">Level ${progress.level}</div>
                    <div class="level-name" style="color: ${progress.levelColor}">${progress.levelName}</div>
                    <div class="level-title">${progress.levelTitle}</div>
                </div>
                ${!progress.isMaxLevel ? `
                    <div class="next-level">
                        <span>Next: ${progress.nextLevelEmoji} Level ${progress.level + 1}</span>
                    </div>
                ` : '<div class="max-level">🌟 MAX LEVEL 🌟</div>'}
            </div>
        `;
    },
    
    renderProgressBar: (progress) => {
        return `
            <div class="xp-progress-container">
                <div class="xp-progress-info">
                    <span class="xp-current">${progress.xp} XP</span>
                    <span class="xp-percent">${progress.progressPercent}%</span>
                    ${!progress.isMaxLevel ? `<span class="xp-next">${progress.xpToNextLevel} XP to Level ${progress.level + 1}</span>` : ''}
                </div>
                <div class="xp-progress-bar">
                    <div class="xp-progress-fill" style="width: ${progress.progressPercent}%; background: ${progress.levelColor}"></div>
                </div>
            </div>
        `;
    },
    
    renderStats: (progress) => {
        return `
            <div class="gamification-stats">
                <div class="stat-item">
                    <i class="fas fa-fire"></i>
                    <span class="stat-value">${progress.streak}</span>
                    <span class="stat-label">Day Streak</span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-trophy"></i>
                    <span class="stat-value">${progress.achievementsUnlocked}/${progress.totalAchievements}</span>
                    <span class="stat-label">Achievements</span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-bolt"></i>
                    <span class="stat-value">${progress.dailyXP}</span>
                    <span class="stat-label">Today's XP</span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-star"></i>
                    <span class="stat-value">${progress.totalXP.toLocaleString()}</span>
                    <span class="stat-label">Total XP</span>
                </div>
            </div>
        `;
    },
    
    showLevelUp: (oldLevel, newLevel, levelData) => {
        const modal = document.createElement('div');
        modal.className = 'level-up-modal';
        modal.innerHTML = `
            <div class="level-up-content">
                <div class="level-up-icon">${levelData.emoji}</div>
                <h2>LEVEL UP!</h2>
                <div class="level-up-number">${newLevel}</div>
                <div class="level-up-name">${levelData.name}</div>
                <div class="level-up-title">${levelData.title}</div>
                <p>+${newLevel * 50} Bonus XP!</p>
                <button onclick="this.closest('.level-up-modal').remove()">Continue</button>
            </div>
        `;
        document.body.appendChild(modal);
        
        setTimeout(() => modal.classList.add('show'), 100);
    },
    
    showAchievement: (achievement) => {
        const toast = document.createElement('div');
        toast.className = 'achievement-toast';
        toast.innerHTML = `
            <div class="achievement-icon"><i class="fas ${achievement.icon}"></i></div>
            <div class="achievement-info">
                <div class="achievement-unlocked">Achievement Unlocked!</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-xp">+${achievement.xp} XP</div>
            </div>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 5000);
    }
};

// Event handlers
Gamification.on('levelUp', (data) => {
    GamificationUI.showLevelUp(data.oldLevel, data.newLevel, data.levelData);
});

Gamification.on('achievementUnlocked', (achievement) => {
    GamificationUI.showAchievement(achievement);
});

Gamification.on('xpGained', (data) => {
    console.log(`[XP] +${data.amount} XP from ${data.source}`);
    if (typeof Dashboard !== 'undefined' && Dashboard.updateLevelDisplay) {
        Dashboard.updateLevelDisplay();
    }
});

// Initialize
Gamification.init();

// Legacy
window.Gamification = Gamification;
window.GamificationUI = GamificationUI;
