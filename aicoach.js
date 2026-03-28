/**
 * NOVA Mastery Hub - AI Coach Module
 * Intelligent Insights & Recommendations
 * Version 2.0
 */

const AICoach = {
    insights: [],
    recommendations: [],
    moodHistory: [],
    lastAnalysis: null,

    init() {
        this.loadHistory();
        console.log('[AICoach] Initialized');
    },

    loadHistory() {
        this.insights = Storage.get('aiInsights', []);
        this.moodHistory = Storage.get('moodHistory', []);
        this.lastAnalysis = Storage.get('lastAnalysis', null);
    },

    saveHistory() {
        Storage.set('aiInsights', this.insights);
        Storage.set('moodHistory', this.moodHistory);
        Storage.set('lastAnalysis', this.lastAnalysis);
    },

    analyze() {
        const data = this.gatherData();
        const insights = this.generateInsights(data);
        const recommendations = this.generateRecommendations(data);
        
        const analysis = {
            timestamp: Date.now(),
            insights,
            recommendations,
            productivityScore: this.calculateProductivityScore(data),
            focusAreas: this.identifyFocusAreas(data),
            warnings: this.generateWarnings(data)
        };

        this.insights.unshift(analysis);
        if (this.insights.length > 30) this.insights.pop();
        
        this.lastAnalysis = analysis;
        this.saveHistory();
        
        return analysis;
    },

    gatherData() {
        const tasks = Storage.get('Tasks', []);
        const habits = Storage.get('Habits', []);
        const stats = Storage.get('Stats', {});
        const dietPlan = Storage.get('DietPlan', {});
        
        const today = new Date().toDateString();
        
        const completedTasks = tasks.filter(t => t.completed).length;
        const pendingTasks = tasks.filter(t => !t.completed).length;
        const highPriorityTasks = tasks.filter(t => t.priority === 'high' && !t.completed).length;
        
        const todayHabits = habits.filter(h => h.completedDates?.includes(today)).length;
        
        let totalCalories = 0;
        Object.values(dietPlan).forEach(meal => {
            meal.forEach(item => totalCalories += item.calories || 0);
        });
        
        return {
            tasks: { completed: completedTasks, pending: pendingTasks, highPriority: highPriorityTasks },
            habits: { completed: todayHabits, total: habits.length },
            focus: { minutes: stats.focusMinutes || 0 },
            nutrition: { calories: totalCalories },
            streak: stats.streak || 0,
            points: stats.totalPoints || 0
        };
    },

    generateInsights(data) {
        const insights = [];
        
        // Task insights
        if (data.tasks.pending > 10) {
            insights.push({
                type: 'warning',
                category: 'tasks',
                title: 'Heavy Task Load',
                message: `You have ${data.tasks.pending} pending tasks. Consider prioritizing or breaking them down.`,
                action: 'Review pending tasks'
            });
        } else if (data.tasks.pending === 0 && data.tasks.completed > 0) {
            insights.push({
                type: 'success',
                category: 'tasks',
                title: 'All Clear!',
                message: 'Great job! You have no pending tasks. Time to add new goals!',
                action: null
            });
        }
        
        // Habit insights
        const habitCompletionRate = data.habits.total > 0 ? (data.habits.completed / data.habits.total) * 100 : 0;
        if (habitCompletionRate >= 80) {
            insights.push({
                type: 'success',
                category: 'habits',
                title: 'Habit Excellence',
                message: `You're maintaining ${Math.round(habitCompletionRate)}% of your habits today!`,
                action: null
            });
        } else if (habitCompletionRate < 50) {
            insights.push({
                type: 'tip',
                category: 'habits',
                title: 'Build Momentum',
                message: 'Start with just one habit today to build consistency.',
                action: 'Complete one habit'
            });
        }
        
        // Focus insights
        if (data.focus.minutes < 30) {
            insights.push({
                type: 'tip',
                category: 'focus',
                title: 'Increase Focus Time',
                message: 'Your focus time today is below average. Try a 25-minute Pomodoro session.',
                action: 'Start focus session'
            });
        }
        
        // Streak insights
        if (data.streak >= 7) {
            insights.push({
                type: 'success',
                category: 'streak',
                title: `Amazing ${data.streak}-Day Streak!`,
                message: 'Your consistency is inspiring. Keep the momentum going!',
                action: null
            });
        }
        
        return insights;
    },

    generateRecommendations(data) {
        const recommendations = [];
        
        // Priority-based recommendations
        if (data.tasks.highPriority > 0) {
            recommendations.push({
                priority: 'high',
                title: 'High Priority Tasks',
                message: `You have ${data.tasks.highPriority} high-priority tasks waiting.`,
                action: 'Focus on high priority',
                icon: 'exclamation-triangle'
            });
        }
        
        // Time-based recommendations
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 9) {
            recommendations.push({
                priority: 'medium',
                title: 'Morning Routine',
                message: 'Start your day with exercise and a healthy breakfast.',
                action: 'Start morning routine',
                icon: 'sun'
            });
        } else if (hour >= 9 && hour < 12) {
            recommendations.push({
                priority: 'high',
                title: 'Deep Work Time',
                message: 'This is your peak productivity hours. Focus on important tasks.',
                action: 'Start deep work',
                icon: 'brain'
            });
        } else if (hour >= 14 && hour < 17) {
            recommendations.push({
                priority: 'medium',
                title: 'Afternoon Energy',
                message: 'Take a short walk or do light exercise to boost energy.',
                action: 'Take a break',
                icon: 'walking'
            });
        } else if (hour >= 21) {
            recommendations.push({
                priority: 'medium',
                title: 'Wind Down',
                message: 'Time to review tomorrow\'s tasks and prepare for rest.',
                action: 'Review tomorrow',
                icon: 'moon'
            });
        }
        
        // Streak-based recommendations
        if (data.streak > 0 && data.streak % 7 === 0) {
            recommendations.push({
                priority: 'high',
                title: 'Weekly Milestone!',
                message: `You've maintained a ${data.streak}-day streak. Amazing!`,
                action: 'Celebrate achievement',
                icon: 'trophy'
            });
        }
        
        return recommendations;
    },

    calculateProductivityScore(data) {
        let score = 50;
        
        // Task completion contribution
        const taskScore = data.tasks.completed > 0 ? Math.min(30, data.tasks.completed * 3) : 0;
        score += taskScore;
        
        // Habit contribution
        const habitScore = data.habits.total > 0 ? (data.habits.completed / data.habits.total) * 20 : 0;
        score += habitScore;
        
        // Focus contribution
        const focusScore = Math.min(20, data.focus.minutes / 5);
        score += focusScore;
        
        return Math.min(100, Math.max(0, Math.round(score)));
    },

    identifyFocusAreas(data) {
        const areas = [];
        
        if (data.tasks.highPriority > 3) {
            areas.push({ area: 'tasks', urgency: 'high', message: 'Many high-priority tasks pending' });
        }
        
        if (data.habits.completed < data.habits.total * 0.5) {
            areas.push({ area: 'habits', urgency: 'medium', message: 'Habit completion below target' });
        }
        
        if (data.focus.minutes < 60) {
            areas.push({ area: 'focus', urgency: 'medium', message: 'Focus time below daily goal' });
        }
        
        return areas;
    },

    generateWarnings(data) {
        const warnings = [];
        
        if (data.tasks.pending > 20) {
            warnings.push({
                level: 'warning',
                message: 'Task overload detected. Consider archiving or delegating tasks.'
            });
        }
        
        if (data.streak > 0 && data.streak % 3 === 0 && data.habits.completed === 0) {
            warnings.push({
                level: 'danger',
                message: `Your ${data.streak}-day streak is at risk! Complete at least one habit.`
            });
        }
        
        return warnings;
    },

    // Smart Intervention System (Stop/Start/Shift)
    getIntervention() {
        const data = this.gatherData();
        const challenges = DailyChallenges.getProgress();
        
        const intervention = this.analyzeBehaviorPattern(data, challenges);
        return intervention;
    },

    analyzeBehaviorPattern(data, challenges) {
        const patterns = {
            overextended: data.tasks.pending > 10 && data.habits.completed > 3,
            drifting: data.tasks.pending < 3 && data.habits.completed < 2 && data.streak < 3,
            strategist: data.tasks.completed > 5 && data.habits.completed >= data.habits.total * 0.8,
            blocked: data.tasks.highPriority > 5 && data.tasks.completed < 2,
            balanced: data.habits.completed >= data.habits.total * 0.6 && data.tasks.completed > 0
        };

        if (patterns.overextended) {
            return {
                type: 'STOP',
                title: 'Stop: Remove the Noise',
                message: 'You\'re doing too much. Focus on fewer tasks to make real progress. Quality over quantity.',
                action: 'Choose your top 3 priorities and let go of the rest.',
                icon: 'ban',
                color: '#ef4444'
            };
        }

        if (patterns.blocked) {
            return {
                type: 'START',
                title: 'Start: Take the First Step',
                message: 'You have important tasks but haven\'t started. Just do one small part to break the inertia.',
                action: 'Start your highest priority task for just 5 minutes.',
                icon: 'play',
                color: '#22c55e'
            };
        }

        if (patterns.drifting) {
            return {
                type: 'START',
                title: 'Start: Build Momentum',
                message: 'Your energy is stable but you\'re not moving forward. Time to begin something new.',
                action: 'Pick one challenge and complete it today.',
                icon: 'rocket',
                color: '#22c55e'
            };
        }

        if (patterns.strategist) {
            return {
                type: 'SHIFT',
                title: 'Shift: Level Up',
                message: 'You\'re doing great! Time to push beyond your comfort zone with harder challenges.',
                action: 'Try an expert-level challenge or help someone else.',
                icon: 'arrow-up',
                color: '#8b5cf6'
            };
        }

        // Default balanced
        return {
            type: 'MAINTAIN',
            title: 'Maintain: Keep Going',
            message: 'You\'re on the right track. Keep your consistent effort going.',
            action: 'Complete today\'s challenges and maintain your streak.',
            icon: 'check',
            color: '#3b82f6'
        };
    },

    // Get personalized challenge recommendation
    getChallengeRecommendation() {
        const challenges = DailyChallenges.getProgress();
        const pending = challenges.challenges.filter(c => c.status !== 'completed');
        
        if (pending.length === 0) {
            return { message: 'All challenges completed! Great job!', type: 'success' };
        }

        // Recommend based on time of day
        const hour = new Date().getHours();
        
        if (hour >= 5 && hour < 12) {
            const fitness = pending.find(c => c.category === 'fitness');
            if (fitness) return { challenge: fitness, reason: 'Start your day with physical energy!' };
        }

        if (hour >= 12 && hour < 17) {
            const practice = pending.find(c => c.category === 'practice');
            if (practice) return { challenge: practice, reason: 'Afternoon is perfect for deep practice.' };
        }

        if (hour >= 17) {
            const knowledge = pending.find(c => c.category === 'knowledge');
            if (knowledge) return { challenge: knowledge, reason: 'Wind down with learning something new.' };
        }

        return { challenge: pending[0], reason: 'Complete this challenge now!' };
    },

    getQuickAdvice(topic) {
        const advice = {
            productivity: [
                'Start your day with the most important task (MIT).',
                'Use the 2-minute rule: if it takes less than 2 minutes, do it now.',
                'Take regular breaks to maintain high focus.',
                'Batch similar tasks together for better efficiency.',
                'Review your tasks the night before for better planning.'
            ],
            habits: [
                'Start with just one habit and master it before adding more.',
                'Attach new habits to existing routines.',
                'Track your habits consistently - what gets measured gets managed.',
                'Make habits small and achievable initially.',
                'Reward yourself after completing habits.'
            ],
            focus: [
                'Use the Pomodoro technique: 25 min work, 5 min break.',
                'Eliminate distractions before starting focus sessions.',
                'Start with shorter focus periods and gradually increase.',
                'End sessions with a clear next step.',
                'Take breaks away from your workspace.'
            ],
            health: [
                'Drink water regularly throughout the day.',
                'Get 7-8 hours of sleep for optimal performance.',
                'Exercise daily, even if just for 15 minutes.',
                'Eat protein-rich foods for sustained energy.',
                'Take regular breaks from screen time.'
            ],
            learning: [
                'Apply the Feynman technique: teach what you learn.',
                'Spaced repetition is more effective than cramming.',
                'Take notes by hand for better retention.',
                'Review learned material within 24 hours.',
                'Connect new knowledge to existing knowledge.'
            ]
        };
        
        const topicAdvice = advice[topic] || advice.productivity;
        return topicAdvice[Math.floor(Math.random() * topicAdvice.length)];
    },

    getDailyTip() {
        const tips = [
            { tip: 'Start tomorrow today', category: 'planning' },
            { tip: 'Energy management > time management', category: 'productivity' },
            { tip: 'Small consistent actions beat occasional big efforts', category: 'habits' },
            { tip: 'Rest is part of productivity', category: 'wellness' },
            { tip: 'Your only limit is your mind', category: 'motivation' },
            { tip: 'Progress, not perfection', category: 'mindset' },
            { tip: 'Celebrate small wins', category: 'motivation' },
            { tip: 'Learn by doing', category: 'learning' },
            { tip: 'Quality over quantity', category: 'productivity' },
            { tip: 'Take care of your body', category: 'health' }
        ];
        
        const today = new Date().getDate();
        return tips[today % tips.length];
    },

    getConversation(context) {
        const responses = this.getResponsesForContext(context);
        return responses[Math.floor(Math.random() * responses.length)];
    },

    getResponsesForContext(context) {
        const contextLower = context.toLowerCase();
        
        if (contextLower.includes('help') || contextLower.includes('what can you do')) {
            return [
                "I can help you with productivity tips, track your progress, analyze your patterns, and provide personalized recommendations. Just ask!",
                "I'm your personal AI coach! I can help with task management, habit building, focus optimization, and motivation. What would you like help with?"
            ];
        }
        
        if (contextLower.includes('productive') || contextLower.includes('focus')) {
            return [
                "For better focus, try the Pomodoro technique: 25 minutes of deep work followed by a 5-minute break. After 4 cycles, take a longer break!",
                "Start your day with your most important task (MIT). This ensures you make progress on what matters most, regardless of distractions later."
            ];
        }
        
        if (contextLower.includes('habit') || contextLower.includes('routine')) {
            return [
                "The best way to build a habit is to start incredibly small. Want to exercise? Start with just 2 minutes. Want to read? Start with just 1 page.",
                "Attach new habits to existing ones. After I [existing habit], I will [new habit]. This creates a powerful trigger."
            ];
        }
        
        if (contextLower.includes('tired') || contextLower.includes('exhausted') || contextLower.includes('burnout')) {
            return [
                "Remember: rest is productive too. Taking breaks actually improves focus and creativity. Consider taking a short walk or doing some light stretching.",
                "When you're feeling burnt out, try the 5-4-3-2-1 technique: 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. This brings you back to the present."
            ];
        }
        
        if (contextLower.includes('motivate') || contextLower.includes('discourage') || contextLower.includes('down')) {
            return [
                "You've already accomplished so much! Look at how far you've come. Every small step counts toward your bigger goals.",
                "Remember why you started. Your past self believed in you - don't let them down. You've got this!",
                "Success isn't about being perfect; it's about being consistent. Every effort counts, even when it doesn't feel like it."
            ];
        }
        
        if (contextLower.includes('goal') || contextLower.includes('target')) {
            return [
                "Great goals are SMART: Specific, Measurable, Achievable, Relevant, and Time-bound. Break big goals into smaller, actionable steps.",
                "Focus on systems, not goals. Instead of 'lose weight', focus on 'exercise 30 minutes daily' - the habits lead to the results."
            ];
        }
        
        if (contextLower.includes('time') || contextLower.includes('procrastinate')) {
            return [
                "Procrastination often comes from feeling overwhelmed. Break tasks into smaller pieces and commit to just 5 minutes - often that's all you need to get started.",
                "The 2-minute rule: if something takes less than 2 minutes, do it immediately. This prevents small tasks from piling up."
            ];
        }
        
        // Default responses
        return [
            "That's a great question! Remember, consistency is key. Small daily actions compound into massive results over time.",
            "I'm here to help you succeed! Keep pushing forward - you're capable of amazing things.",
            "Every expert was once a beginner. Focus on progress, not perfection. You've got this!",
            "Stay focused on your goals, but be flexible with your methods. What works today might need adjustment tomorrow."
        ];
    }
};

AICoach.init();
