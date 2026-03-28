/**
 * NOVA Mastery Hub - Analysis Module
 * Advanced Analytics & Intelligent Insights
 * Version 2.0
 */

const AnalyticsEngine = {
    data: {
        taskHistory: [],
        habitHistory: [],
        focusHistory: [],
        nutritionHistory: [],
        fitnessHistory: []
    },

    init() {
        this.loadHistoricalData();
        console.log('[Analytics] Initialized');
    },

    loadHistoricalData() {
        this.data.taskHistory = Storage.get('taskHistory', []);
        this.data.habitHistory = Storage.get('habitHistory', []);
        this.data.focusHistory = Storage.get('focusHistory', []);
        this.data.nutritionHistory = Storage.get('nutritionHistory', []);
        this.data.fitnessHistory = Storage.get('fitnessHistory', []);
    },

    saveHistoricalData() {
        Storage.set('taskHistory', this.data.taskHistory);
        Storage.set('habitHistory', this.data.habitHistory);
        Storage.set('focusHistory', this.data.focusHistory);
        Storage.set('nutritionHistory', this.data.nutritionHistory);
        Storage.set('fitnessHistory', this.data.fitnessHistory);
    },

    recordTaskCompletion(task) {
        this.data.taskHistory.push({
            timestamp: Date.now(),
            completed: task.completed,
            priority: task.priority,
            type: 'task'
        });
        this.saveHistoricalData();
    },

    recordHabitCompletion(habitId, completed) {
        this.data.habitHistory.push({
            timestamp: Date.now(),
            habitId,
            completed,
            type: 'habit'
        });
        this.saveHistoricalData();
    },

    recordFocusSession(minutes, type) {
        this.data.focusHistory.push({
            timestamp: Date.now(),
            minutes,
            type,
            type2: 'focus'
        });
        this.saveHistoricalData();
    },

    recordNutritionIntake(nutrition) {
        this.data.nutritionHistory.push({
            timestamp: Date.now(),
            ...nutrition,
            type: 'nutrition'
        });
        this.saveHistoricalData();
    },

    recordWorkout(workout) {
        this.data.fitnessHistory.push({
            timestamp: Date.now(),
            ...workout,
            type: 'fitness'
        });
        this.saveHistoricalData();
    },

    getProductivityScore() {
        const last7Days = this.getLast7DaysData();
        
        const taskScore = this.calculateTaskScore(last7Days.tasks);
        const habitScore = this.calculateHabitScore(last7Days.habits);
        const focusScore = this.calculateFocusScore(last7Days.focus);
        
        const weights = { tasks: 0.4, habits: 0.35, focus: 0.25 };
        
        const overall = (taskScore * weights.tasks) + 
                       (habitScore * weights.habits) + 
                       (focusScore * weights.focus);
        
        return {
            overall: Math.round(overall),
            taskScore: Math.round(taskScore),
            habitScore: Math.round(habitScore),
            focusScore: Math.round(focusScore),
            trend: this.getTrend()
        };
    },

    getLast7DaysData() {
        const now = Date.now();
        const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
        
        const tasks = this.data.taskHistory.filter(t => t.timestamp > sevenDaysAgo);
        const habits = this.data.habitHistory.filter(h => h.timestamp > sevenDaysAgo);
        const focus = this.data.focusHistory.filter(f => f.timestamp > sevenDaysAgo);
        
        return { tasks, habits, focus };
    },

    calculateTaskScore(tasks) {
        if (tasks.length === 0) return 50;
        
        const completed = tasks.filter(t => t.completed).length;
        const total = tasks.length;
        const completionRate = (completed / total) * 100;
        
        const highPriority = tasks.filter(t => t.priority === 'high');
        const highPriorityCompleted = highPriority.filter(t => t.completed).length;
        const highPriorityRate = highPriority.length > 0 
            ? (highPriorityCompleted / highPriority.length) * 100 
            : 100;
        
        return (completionRate * 0.6) + (highPriorityRate * 0.4);
    },

    calculateHabitScore(habits) {
        if (habits.length === 0) return 50;
        
        const completed = habits.filter(h => h.completed).length;
        const total = habits.length;
        
        return (completed / total) * 100;
    },

    calculateFocusScore(focusSessions) {
        if (focusSessions.length === 0) return 50;
        
        const totalMinutes = focusSessions.reduce((sum, s) => sum + s.minutes, 0);
        const goalMinutes = 25 * 7 * 5;
        
        const score = Math.min((totalMinutes / goalMinutes) * 100, 100);
        
        return score;
    },

    getTrend() {
        const now = Date.now();
        const thisWeek = now - (7 * 24 * 60 * 60 * 1000);
        const lastWeek = now - (14 * 24 * 60 * 60 * 1000);
        
        const thisWeekData = this.getHistoricalDataInRange(thisWeek, now);
        const lastWeekData = this.getHistoricalDataInRange(lastWeek, thisWeek);
        
        const thisWeekScore = this.calculatePeriodScore(thisWeekData);
        const lastWeekScore = this.calculatePeriodScore(lastWeekData);
        
        if (thisWeekScore > lastWeekScore + 5) return 'up';
        if (thisWeekScore < lastWeekScore - 5) return 'down';
        return 'stable';
    },

    getHistoricalDataInRange(start, end) {
        return {
            tasks: this.data.taskHistory.filter(t => t.timestamp >= start && t.timestamp < end),
            habits: this.data.habitHistory.filter(h => h.timestamp >= start && h.timestamp < end),
            focus: this.data.focusHistory.filter(f => f.timestamp >= start && f.timestamp < end)
        };
    },

    calculatePeriodScore(data) {
        let score = 0;
        let count = 0;
        
        if (data.tasks.length > 0) {
            score += this.calculateTaskScore(data.tasks);
            count++;
        }
        
        if (data.habits.length > 0) {
            score += this.calculateHabitScore(data.habits);
            count++;
        }
        
        if (data.focus.length > 0) {
            score += this.calculateFocusScore(data.focus);
            count++;
        }
        
        return count > 0 ? score / count : 50;
    },

    getInsights() {
        const insights = [];
        
        insights.push(...this.analyzeProductivity());
        insights.push(...this.analyzeHabits());
        insights.push(...this.analyzeNutrition());
        insights.push(...this.analyzeFocus());
        insights.push(...this.generateRecommendations());
        
        return insights.slice(0, 10);
    },

    analyzeProductivity() {
        const insights = [];
        const score = this.getProductivityScore();
        
        if (score.overall >= 80) {
            insights.push({
                type: 'success',
                title: 'Excellent Productivity',
                message: 'Your productivity is outstanding! Keep up the great work.',
                icon: 'trophy'
            });
        } else if (score.overall >= 60) {
            insights.push({
                type: 'info',
                title: 'Good Progress',
                message: 'You\'re on the right track. Try to maintain consistency.',
                icon: 'chart-line'
            });
        }
        
        if (score.taskScore < score.habitScore) {
            insights.push({
                type: 'tip',
                title: 'Task Focus Needed',
                message: 'Your task completion rate could use improvement. Try breaking tasks into smaller steps.',
                icon: 'tasks'
            });
        }
        
        return insights;
    },

    analyzeHabits() {
        const insights = [];
        const last7Days = this.getLast7DaysData();
        
        const completedDays = new Set();
        last7Days.habits.forEach(h => {
            const date = new Date(h.timestamp).toDateString();
            if (h.completed) completedDays.add(date);
        });
        
        if (completedDays.size >= 6) {
            insights.push({
                type: 'success',
                title: 'Habit Master',
                message: `You've been consistent with habits for ${completedDays.size} days this week!`,
                icon: 'fire'
            });
        } else if (completedDays.size < 3) {
            insights.push({
                type: 'warning',
                title: 'Build Consistency',
                message: 'Try to complete at least one habit daily to build momentum.',
                icon: 'exclamation-circle'
            });
        }
        
        return insights;
    },

    analyzeNutrition() {
        const insights = [];
        
        const today = new Date().toDateString();
        const todayMeals = this.data.nutritionHistory.filter(n => {
            const mealDate = new Date(n.timestamp).toDateString();
            return mealDate === today;
        });
        
        if (todayMeals.length === 0) {
            insights.push({
                type: 'tip',
                title: 'Track Your Meals',
                message: 'Start logging your meals to get personalized nutrition insights.',
                icon: 'utensils'
            });
        }
        
        const totalCalories = todayMeals.reduce((sum, m) => sum + (m.calories || 0), 0);
        const settings = User.getSettings();
        
        if (totalCalories > 0) {
            if (totalCalories < settings.dailyCalorieGoal * 0.7) {
                insights.push({
                    type: 'warning',
                    title: 'Low Calorie Intake',
                    message: `You've consumed only ${totalCalories} calories today. Aim for ${settings.dailyCalorieGoal}.`,
                    icon: 'exclamation-triangle'
                });
            } else if (totalCalories > settings.dailyCalorieGoal * 1.2) {
                insights.push({
                    type: 'tip',
                title: 'Calorie Awareness',
                message: `You've exceeded your daily calorie goal by ${Math.round(totalCalories - settings.dailyCalorieGoal)} calories.`,
                icon: 'info-circle'
                });
            }
        }
        
        return insights;
    },

    analyzeFocus() {
        const insights = [];
        const last7Days = this.getLast7DaysData();
        
        const totalMinutes = last7Days.focus.reduce((sum, s) => sum + s.minutes, 0);
        const avgMinutes = Math.round(totalMinutes / 7);
        
        if (totalMinutes >= 700) {
            insights.push({
                type: 'success',
                title: 'Focus Champion',
                message: `Amazing focus time! ${totalMinutes} minutes this week.`,
                icon: 'brain'
            });
        } else if (avgMinutes < 20) {
            insights.push({
                type: 'tip',
                title: 'Increase Focus Time',
                message: 'Try to aim for at least 2 hours of deep focus daily.',
                icon: 'clock'
            });
        }
        
        return insights;
    },

    generateRecommendations() {
        const recommendations = [];
        const score = this.getProductivityScore();
        
        if (score.taskScore < 50) {
            recommendations.push({
                type: 'action',
                title: 'Task Strategy',
                message: 'Start with your most important task each morning.',
                priority: 'high',
                action: 'Try the "Eat the Frog" technique'
            });
        }
        
        if (score.focusScore < 50) {
            recommendations.push({
                type: 'action',
                title: 'Improve Focus',
                message: 'Use the Pomodoro technique: 25 min work, 5 min break.',
                priority: 'medium',
                action: 'Start a 25-minute focus session'
            });
        }
        
        const strikeStatus = User.getStrikeStatus();
        if (strikeStatus.remaining <= 1) {
            recommendations.push({
                type: 'warning',
                title: 'Strike Warning',
                message: `You have ${strikeStatus.remaining} strikes remaining. Stay consistent!`,
                priority: 'high',
                action: 'Complete your daily tasks'
            });
        }
        
        return recommendations;
    },

    getWeeklyChartData() {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const data = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dayStart = new Date(date).setHours(0, 0, 0, 0);
            const dayEnd = new Date(date).setHours(23, 59, 59, 999);
            
            const dayTasks = this.data.taskHistory.filter(t => 
                t.timestamp >= dayStart && t.timestamp <= dayEnd
            );
            const dayHabits = this.data.habitHistory.filter(h => 
                h.timestamp >= dayStart && h.timestamp <= dayEnd
            );
            const dayFocus = this.data.focusHistory.filter(f => 
                f.timestamp >= dayStart && f.timestamp <= dayEnd
            );
            
            const completedTasks = dayTasks.filter(t => t.completed).length;
            const completedHabits = dayHabits.filter(h => h.completed).length;
            const focusMinutes = dayFocus.reduce((sum, f) => sum + f.minutes, 0);
            
            data.push({
                day: days[date.getDay()],
                tasks: completedTasks,
                habits: completedHabits,
                focus: focusMinutes,
                score: Math.round(((completedTasks * 10) + (completedHabits * 5) + (focusMinutes / 5)) / 2)
            });
        }
        
        return data;
    },

    getMonthlyStats() {
        const now = Date.now();
        const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);
        
        const tasks = this.data.taskHistory.filter(t => t.timestamp > thirtyDaysAgo);
        const habits = this.data.habitHistory.filter(h => h.timestamp > thirtyDaysAgo);
        const focus = this.data.focusHistory.filter(f => f.timestamp > thirtyDaysAgo);
        
        return {
            tasksCompleted: tasks.filter(t => t.completed).length,
            tasksCreated: tasks.length,
            habitsCompleted: habits.filter(h => h.completed).length,
            focusMinutes: focus.reduce((sum, f) => sum + f.minutes, 0),
            avgDailyFocus: Math.round(focus.reduce((sum, f) => sum + f.minutes, 0) / 30),
            bestDay: this.getBestDay(),
            consistencyScore: this.calculateConsistencyScore()
        };
    },

    getBestDay() {
        const dayStats = [0, 0, 0, 0, 0, 0, 0];
        
        this.data.taskHistory.forEach(t => {
            if (t.completed) {
                const day = new Date(t.timestamp).getDay();
                dayStats[day] += 10;
            }
        });
        
        this.data.habitHistory.forEach(h => {
            if (h.completed) {
                const day = new Date(h.timestamp).getDay();
                dayStats[day] += 5;
            }
        });
        
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const bestDayIndex = dayStats.indexOf(Math.max(...dayStats));
        
        return days[bestDayIndex];
    },

    calculateConsistencyScore() {
        const last30Days = [];
        
        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dayStart = new Date(date).setHours(0, 0, 0, 0);
            const dayEnd = new Date(date).setHours(23, 59, 59, 999);
            
            const dayActivity = this.data.taskHistory.filter(t => 
                t.timestamp >= dayStart && t.timestamp <= dayEnd && t.completed
            ).length;
            
            if (dayActivity > 0) last30Days.push(1);
            else last30Days.push(0);
        }
        
        const activeDays = last30Days.filter(d => d === 1).length;
        return Math.round((activeDays / 30) * 100);
    },

    predictNextWeek() {
        const lastWeek = this.getLast7DaysData();
        
        const avgTasks = Math.round(lastWeek.tasks.filter(t => t.completed).length / 7);
        const avgHabits = Math.round(lastWeek.habits.filter(h => h.completed).length / 7);
        const avgFocus = Math.round(lastWeek.focus.reduce((s, f) => s + f.minutes, 0) / 7);
        
        return {
            predictedTasks: avgTasks + Math.round(avgTasks * 0.1),
            predictedHabits: avgHabits,
            predictedFocus: avgFocus + Math.round(avgFocus * 0.05),
            confidence: avgTasks > 0 ? 'high' : 'low'
        };
    }
};

const AdvancedAnalytics = {
    init() {
        AnalyticsEngine.init();
        this.updateDashboard();
        console.log('[AdvancedAnalytics] Ready');
    },

    updateDashboard() {
        this.updateProductivityScore();
        this.updateInsights();
        this.updateCharts();
    },

    updateProductivityScore() {
        const score = AnalyticsEngine.getProductivityScore();
        
        const scoreEl = document.getElementById('productivity-score');
        if (scoreEl) scoreEl.textContent = score.overall;
        
        const trendEl = document.getElementById('productivity-trend');
        if (trendEl) {
            trendEl.textContent = score.trend === 'up' ? '↑' : score.trend === 'down' ? '↓' : '→';
            trendEl.className = 'trend trend-' + score.trend;
        }
    },

    updateInsights() {
        const insights = AnalyticsEngine.getInsights();
        const container = document.getElementById('insights-container');
        
        if (!container) return;
        
        container.innerHTML = insights.map(insight => `
            <div class="insight-card insight-${insight.type}">
                <div class="insight-icon"><i class="fas fa-${insight.icon || 'info-circle'}"></i></div>
                <div class="insight-content">
                    <h4>${insight.title}</h4>
                    <p>${insight.message}</p>
                </div>
            </div>
        `).join('');
    },

    updateCharts() {
        const chartData = AnalyticsEngine.getWeeklyChartData();
        
        chartData.forEach((data, index) => {
            const bar = document.querySelector(`.day-bar[data-index="${index}"]`);
            if (bar) {
                const fill = bar.querySelector('.bar-fill');
                if (fill) fill.style.height = `${Math.min(data.score, 100)}%`;
            }
        });
    },

    getStats() {
        return {
            productivity: AnalyticsEngine.getProductivityScore(),
            monthly: AnalyticsEngine.getMonthlyStats(),
            prediction: AnalyticsEngine.predictNextWeek(),
            insights: AnalyticsEngine.getInsights()
        };
    }
};

AnalyticsEngine.init();
