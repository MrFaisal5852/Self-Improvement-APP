/**
 * NOVA Mastery Hub - Main Application
 * Production-Ready JavaScript
 * Version 2.0
 */

// ============================================
// APP STATE & CONFIGURATION
// ============================================
const App = {
    state: {
        theme: localStorage.getItem('novaTheme') || 'cosmic-purple',
        activeSection: 'dashboard',
        pomodoro: {
            isRunning: false,
            minutes: 25,
            seconds: 0,
            totalSeconds: 25 * 60,
            sessions: 0,
            type: 'focus',
            interval: null
        },
        tasks: [],
        habits: [],
        notes: [],
        quickTodos: [],
        stats: {
            totalPoints: 0,
            completedTasks: 0,
            focusMinutes: 0,
            streak: 0,
            lastVisit: null,
            weeklyProgress: [0, 0, 0, 0, 0, 0, 0]
        }
    },
    
    storage: Storage,
    
    config: {
        defaultTasks: [
            { id: 1, text: 'Complete morning workout routine', priority: 'high', completed: false, createdAt: Date.now() },
            { id: 2, text: 'Learn 15 new Japanese vocabulary words', priority: 'medium', completed: false, createdAt: Date.now() },
            { id: 3, text: 'Complete React component module', priority: 'high', completed: false, createdAt: Date.now() },
            { id: 4, text: 'Read documentation for new API', priority: 'low', completed: false, createdAt: Date.now() }
        ],
        
        defaultHabits: [
            { id: 1, name: 'Morning Meditation', category: 'health', completedDates: [], streak: 0 },
            { id: 2, name: 'Read 30 minutes', category: 'learning', completedDates: [], streak: 0 },
            { id: 3, name: 'Drink 3L water', category: 'health', completedDates: [], streak: 0 },
            { id: 4, name: 'Code review', category: 'productivity', completedDates: [], streak: 0 },
            { id: 5, name: 'Exercise', category: 'fitness', completedDates: [], streak: 0 }
        ],
        
        quotes: [
            "The journey of a thousand miles begins with a single step.",
            "Discipline is the bridge between goals and accomplishment.",
            "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            "The only way to do great work is to love what you do.",
            "Your limitation—it's only your imagination.",
            "The future belongs to those who believe in the beauty of their dreams.",
            "Don't watch the clock; do what it does. Keep going.",
            "Success doesn't just find you. You have to go out and get it.",
            "The harder you work for something, the greater you'll feel when you achieve it.",
            "Dream big. Start small. Act now.",
            "Excellence is not a destination but a continuous journey that never ends.",
            "The secret of getting ahead is getting started.",
            "Your time is limited, don't waste it living someone else's life.",
            "The only limit to our realization of tomorrow will be our doubts of today.",
            "The pain you feel today will be the strength you feel tomorrow.",
            "Push yourself, because no one else is going to do it for you.",
            "Small progress is still progress.",
            "Success starts with self-discipline.",
            "Great things never come from comfort zones.",
            "It always seems impossible until it’s done.",
            "Don’t stop when you’re tired. Stop when you’re done.",
            "Consistency is what transforms average into excellence.",
            "Work hard in silence, let success make the noise.",
            "Focus on your goal. Don’t look in any direction but ahead.",
            "Discipline is choosing between what you want now and what you want most.",
            "Your only limit is your mind.",
            "Make each day your masterpiece.",
            "The difference between who you are and who you want to be is what you do.",
            "Do something today that your future self will thank you for.",
            "Stay patient and trust your journey.",
            "Success is the sum of small efforts repeated day in and day out.",
            "Don’t wait for opportunity. Create it.",
            "You don’t have to be great to start, but you have to start to be great.",
            "The best way to predict the future is to create it.",
            "Hard work beats talent when talent doesn’t work hard.",
            "Your dreams don’t work unless you do.",
            "Dream it. Wish it. Do it.",
            "Progress, not perfection.",
            "Start where you are. Use what you have. Do what you can.",
            "Success is built on daily habits, not once-in-a-lifetime efforts.",
            "Every accomplishment starts with the decision to try.",
            "Believe you can and you're halfway there.",
            "Fall seven times, stand up eight.",
            "Be stronger than your excuses.",
            "Action is the foundational key to all success.",
            "Don’t be afraid to give up the good to go for the great.",
            "The only limit to our realization of tomorrow is our doubts of today.",
            "Winners are not afraid of losing, but losers are.",
            "If you want something you’ve never had, you must be willing to do something you’ve never done.",
            "Success is what comes after you stop making excuses.",
            "Motivation gets you started. Discipline keeps you going.",
            "Keep your eyes on the stars and your feet on the ground.",
            "Turn your wounds into wisdom.",
            "Do what is hard now, and your life will be easy later."
        ]
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
const Utils = {
    $: (selector, parent = document) => parent.querySelector(selector),
    $$: (selector, parent = document) => [...parent.querySelectorAll(selector)],
    
    formatDate(date) {
        const d = new Date(date);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        if (d.toDateString() === today.toDateString()) return 'Today';
        if (d.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    },
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    shuffle(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },
    
    animateValue(element, start, end, duration = 1000) {
        const startTime = performance.now();
        const change = end - start;
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + change * easeProgress);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }
};

// ============================================
// UI MANAGER
// ============================================
const UI = {
    toast(message, type = 'info', duration = 3000) {
        const container = Utils.$('#toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        };
        
        toast.innerHTML = `<i class="fas ${icons[type]}"></i> ${message}`;
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'toastSlide 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },
    
    modal(content, title = 'Modal') {
        const modal = Utils.$('#modal');
        Utils.$('#modal-title', modal).textContent = title;
        Utils.$('#modal-body', modal).innerHTML = content;
        modal.classList.add('active');
        
        Utils.$('.modal-close', modal)?.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    },
    
    closeModal() {
        Utils.$('#modal')?.classList.remove('active');
    },
    
    showLoading() {
        Utils.$('#loading-screen')?.classList.remove('hidden');
    },
    
    hideLoading() {
        const loading = document.getElementById('loading-screen');
        if (loading) {
            loading.style.display = 'none';
        }
    },
    
    updateDateTime() {
        const now = new Date();
        const timeEl = Utils.$('#current-time');
        const dateEl = Utils.$('#current-date');
        
        if (timeEl) {
            timeEl.textContent = now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
        }
        
        if (dateEl) {
            dateEl.textContent = now.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
            });
        }
    },
    
    updateGreeting() {
        const hour = new Date().getHours();
        let greeting = 'Good Morning';
        if (hour >= 12 && hour < 17) greeting = 'Good Afternoon';
        else if (hour >= 17) greeting = 'Good Evening';
        
        const el = Utils.$('#greeting-message');
        if (el) {
            el.textContent = `${greeting}! Let's make it count.`;
        }
    }
};

// ============================================
// THEME MANAGER
// ============================================
const ThemeManager = {
    init() {
        this.apply(App.state.theme);
        this.bindEvents();
    },
    
    apply(themeName) {
        document.documentElement.dataset.theme = themeName;
        App.state.theme = themeName;
        App.storage.set('Theme', themeName);
        
        Utils.$$('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === themeName);
        });
    },
    
    bindEvents() {
        Utils.$$('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.apply(btn.dataset.theme);
                UI.toast(`Theme changed to ${themeName.replace('-', ' ')}`, 'success');
            });
        });
    }
};

// ============================================
// NAVIGATION MANAGER
// ============================================
const Navigation = {
    init() {
        this.bindEvents();
        this.restoreState();
    },
    
    bindEvents() {
        Utils.$$('.sidebar-nav .nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigate(link.dataset.target);
            });
        });
        
        Utils.$('#mobile-menu-toggle')?.addEventListener('click', () => {
            const sidebar = Utils.$('.sidebar');
            const mobileNav = Utils.$('.mobile-nav');
            const overlay = Utils.$('.mobile-nav-overlay');
            
            // Check screen width to decide which to toggle
            if (window.innerWidth <= 1200) {
                // Mobile: toggle mobile-nav
                const isOpen = mobileNav.classList.contains('active');
                if (isOpen) {
                    mobileNav.classList.remove('active');
                    overlay.classList.remove('active');
                    setTimeout(() => overlay.style.display = 'none', 300);
                } else {
                    mobileNav.classList.add('active');
                    overlay.style.display = 'block';
                    setTimeout(() => overlay.classList.add('active'), 10);
                }
            } else {
                // Desktop: toggle sidebar
                sidebar.classList.toggle('active');
            }
        });
        
        Utils.$('#mobile-nav-close')?.addEventListener('click', () => this.closeMobileNav());
        Utils.$('.mobile-nav-overlay')?.addEventListener('click', () => this.closeMobileNav());
        
        Utils.$$('.sidebar-nav a').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileNav();
                setTimeout(() => this.navigate(link.dataset.target), 300);
            });
        });
        
        // Mobile nav links
        Utils.$$('.mobile-nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileNav();
                setTimeout(() => this.navigate(link.dataset.target), 300);
            });
        });
    },
    
    closeMobileNav() {
        Utils.$('.mobile-nav-overlay')?.classList.remove('active');
        setTimeout(() => { 
            const overlay = Utils.$('.mobile-nav-overlay');
            if (overlay) overlay.style.display = 'none'; 
        }, 300);
        Utils.$('.mobile-nav')?.classList.remove('active');
    },
    
    navigate(sectionId) {
        App.state.activeSection = sectionId;
        
        // Update sidebar nav links
        Utils.$$('.sidebar-nav .nav-link').forEach(l => l.classList.remove('active'));
        Utils.$(`.sidebar-nav [data-target="${sectionId}"]`)?.classList.add('active');
        
        // Update mobile nav links
        Utils.$$('.mobile-nav-links a').forEach(l => l.classList.remove('active'));
        Utils.$(`.mobile-nav-links [data-target="${sectionId}"]`)?.classList.add('active');
        
        // Show the section
        Utils.$$('.content-section').forEach(s => s.classList.remove('active-section'));
        Utils.$(`#${sectionId}`)?.classList.add('active-section');
        
        App.storage.set('ActiveSection', sectionId);
    },
    
    restoreState() {
        const saved = App.storage.get('ActiveSection');
        if (saved) this.navigate(saved);
    }
};

// ============================================
// THREE.JS BACKGROUND
// ============================================
const ThreeJSBackground = {
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    clock: null,
    
    init() {
        try {
            const container = Utils.$('#canvas-container');
            if (!container || typeof THREE === 'undefined') return;
            
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.camera.position.z = 3.5;
            
            this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
            container.appendChild(this.renderer.domElement);
            
            this.createGeometry();
            this.createParticles();
            this.animate();
            this.bindEvents();
        } catch (err) {
            console.warn('ThreeJS background init failed:', err);
        }
    },
    
    createGeometry() {
        const geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 24);
        const material = new THREE.ShaderMaterial({
            uniforms: {
                color1: { value: new THREE.Color(0xa855f7) },
                color2: { value: new THREE.Color(0xec4899) },
                time: { value: 0 }
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vPosition;
                void main() {
                    vUv = uv;
                    vPosition = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 color1;
                uniform vec3 color2;
                uniform float time;
                varying vec2 vUv;
                varying vec3 vPosition;
                
                void main() {
                    float noise = sin(vPosition.y * 2.5 + time * 0.3) * 0.5 + 0.5;
                    vec3 color = mix(color1, color2, noise);
                    float alpha = 0.08 + sin(vPosition.x * 3.0 + time * 0.2) * 0.03;
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            wireframe: true
        });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
        this.clock = new THREE.Clock();
    },
    
    createParticles() {
        const particleCount = 100;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 10;
            positions[i + 1] = (Math.random() - 0.5) * 10;
            positions[i + 2] = (Math.random() - 0.5) * 10;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const material = new THREE.PointsMaterial({
            color: 0xa855f7,
            size: 0.02,
            transparent: true,
            opacity: 0.6
        });
        
        const particles = new THREE.Points(geometry, material);
        this.scene.add(particles);
    },
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const elapsedTime = this.clock.getElapsedTime();
        
        if (this.mesh) {
            this.mesh.rotation.x = elapsedTime * 0.05;
            this.mesh.rotation.y = elapsedTime * 0.08;
            this.mesh.material.uniforms.time.value = elapsedTime;
        }
        
        this.renderer.render(this.scene, this.camera);
    },
    
    bindEvents() {
        window.addEventListener('resize', Utils.throttle(() => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }, 200));
    }
};

// ============================================
// CSS PARTICLES
// ============================================
const Particles = {
    init() {
        const container = Utils.$('#particles-container');
        if (!container) return;
        
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Utils.random(2, 6);
            const x = Utils.random(0, window.innerWidth);
            const y = Utils.random(0, window.innerHeight);
            const duration = Utils.random(15000, 25000);
            const hue = Utils.random(260, 320);
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: linear-gradient(${hue}deg, var(--primary), var(--secondary));
                opacity: ${Utils.random(10, 40) / 100};
            `;
            
            container.appendChild(particle);
            
            gsap.to(particle, {
                x: `+=${Utils.random(-150, 150)}`,
                y: `+=${Utils.random(-150, 150)}`,
                duration: duration / 1000,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Utils.random(0, 5)
            });
        }
    }
};

// ============================================
// DASHBOARD MODULE
// ============================================
const Dashboard = {
    init() {
        this.loadData();
        this.updateStats();
        this.updateLevelDisplay();
        this.renderQuickTasks();
        this.bindEvents();
        
        UI.updateDateTime();
        UI.updateGreeting();
        setInterval(() => UI.updateDateTime(), 1000);
    },
    
    loadData() {
        App.state.tasks = App.storage.get('Tasks') || App.config.defaultTasks;
        App.state.habits = App.storage.get('Habits') || App.config.defaultHabits;
        App.state.quickTodos = App.storage.get('QuickTodos') || [];
        App.state.stats = App.storage.get('Stats') || App.state.stats;
    },
    
    updateStats() {
        const today = new Date().toDateString();
        const todayTasks = App.state.tasks.filter(t => t.completed && t.completedAt?.startsWith(today)).length;
        const todayHabits = App.state.habits.filter(h => h.completedDates?.includes(today)).length;
        
        Utils.$('#tasks-completed-today').textContent = todayTasks;
        Utils.$('#habits-completed-today').textContent = `${todayHabits}/${App.state.habits.length}`;
        Utils.$('#focus-minutes').textContent = App.state.stats.focusMinutes;
        Utils.$('#total-points').textContent = App.state.stats.totalPoints;
        Utils.$('#streak-count').textContent = App.state.stats.streak;
        
        this.updateWeeklyProgress();
        this.updateNextActivity();
        this.updateQuote();
    },
    
    updateWeeklyProgress() {
        Utils.$$('.day-bar').forEach((bar, index) => {
            const dayIndex = index === 0 ? 6 : index - 1;
            const progress = App.state.stats.weeklyProgress[dayIndex] || 0;
            bar.querySelector('.bar').style.setProperty('--progress', `${progress}%`);
        });
    },
    
    updateNextActivity() {
        const hour = new Date().getHours();
        let activity = 'Rest & Recovery';
        
        const schedule = [
            { start: 5, end: 7.5, activity: 'Morning Workout' },
            { start: 7.5, end: 9, activity: 'Language Learning' },
            { start: 9, end: 12, activity: 'Deep Work Session' },
            { start: 12, end: 13, activity: 'Lunch Break' },
            { start: 13, end: 17, activity: 'Afternoon Development' },
            { start: 17, end: 19, activity: 'Combat Training' },
            { start: 19, end: 21, activity: 'Evening Review' }
        ];
        
        for (const item of schedule) {
            if (hour >= item.start && hour < item.end) {
                activity = item.activity;
                break;
            }
        }
        
        Utils.$('#next-activity').textContent = activity;
    },
    
    updateQuote() {
        const quotes = App.config.quotes;
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        const el = Utils.$('#daily-quote');
        if (el) {
            gsap.to(el, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    el.textContent = `"${quote}"`;
                    gsap.to(el, { opacity: 1, duration: 0.3 });
                }
            });
        }
    },
    
    renderQuickTasks() {
        const list = Utils.$('#quick-task-list');
        if (!list) return;
        
        list.innerHTML = App.state.quickTodos.slice(0, 5).map(task => `
            <li data-id="${task.id}">
                <div class="quick-task-checkbox ${task.completed ? 'checked' : ''}" 
                     onclick="Dashboard.toggleQuickTodo(${task.id})"></div>
                <span style="${task.completed ? 'text-decoration: line-through; opacity: 0.5' : ''}">${task.text}</span>
            </li>
        `).join('');
    },
    
    addQuickTask() {
        const input = Utils.$('#quick-task-input');
        const text = input.value.trim();
        if (!text) return;
        
        App.state.quickTodos.unshift({
            id: Date.now(),
            text,
            completed: false
        });
        
        App.storage.set('QuickTodos', App.state.quickTodos);
        input.value = '';
        this.renderQuickTasks();
        UI.toast('Quick task added!', 'success');
    },
    
    toggleQuickTodo(id) {
        const task = App.state.quickTodos.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            App.storage.set('QuickTodos', App.state.quickTodos);
            this.renderQuickTasks();
        }
    },
    
    bindEvents() {
        Utils.$('#quick-add-task')?.addEventListener('click', () => this.addQuickTask());
        Utils.$('#quick-task-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addQuickTask();
        });
        Utils.$('#new-quote-btn')?.addEventListener('click', () => this.updateQuote());
    },
    
    updateLevelDisplay() {
        if (typeof Gamification !== 'undefined' && Gamification.getProgress) {
            const progress = Gamification.getProgress();
            
            const emojiEl = Utils.$('#user-level-emoji');
            const levelEl = Utils.$('#user-level');
            const nameEl = Utils.$('#user-level-name');
            const xpFillEl = Utils.$('#user-xp-fill');
            const xpTextEl = Utils.$('#user-xp-text');
            
            if (emojiEl) emojiEl.textContent = progress.levelEmoji;
            if (levelEl) levelEl.textContent = progress.level;
            if (nameEl) nameEl.textContent = progress.levelName;
            if (xpFillEl) xpFillEl.style.width = `${progress.progressPercent}%`;
            if (xpTextEl) {
                xpTextEl.textContent = progress.isMaxLevel 
                    ? `${progress.xp} XP (MAX)` 
                    : `${progress.xp}/${progress.nextLevelXP} XP`;
            }
        }
    }
};

// ============================================
// HABITS MODULE
// ============================================
const Habits = {
    currentFilter: 'all',
    
    init() {
        this.bindEvents();
        this.render();
        this.updateStats();
    },
    
    render() {
        const list = Utils.$('#habit-list');
        if (!list) return;
        
        const today = new Date().toDateString();
        let habits = [...App.state.habits];
        
        if (this.currentFilter !== 'all') {
            habits = habits.filter(h => h.category === this.currentFilter);
        }
        
        if (habits.length === 0) {
            list.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 40px;">No habits yet. Add your first habit to get started!</p>';
            return;
        }
        
        list.innerHTML = habits.map(habit => {
            const isCompleted = habit.completedDates?.includes(today);
            return `
                <div class="habit-item" data-id="${habit.id}" style="animation-delay: ${habits.indexOf(habit) * 0.05}s">
                    <div class="habit-checkbox ${isCompleted ? 'checked' : ''}" onclick="Habits.toggle(${habit.id})"></div>
                    <div class="habit-info">
                        <h4>${habit.name}</h4>
                        <span class="habit-category">${habit.category}</span>
                    </div>
                    <div class="habit-streak">
                        <i class="fas fa-fire"></i>
                        <span>${this.calculateStreak(habit)} days</span>
                    </div>
                    <div class="task-actions">
                        <button class="btn-delete" onclick="Habits.delete(${habit.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },
    
    calculateStreak(habit) {
        if (!habit.completedDates?.length) return 0;
        
        let streak = 0;
        const today = new Date();
        
        for (let i = 0; i < 365; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            if (habit.completedDates.includes(date.toDateString())) {
                streak++;
            } else if (i > 0) {
                break;
            }
        }
        
        return streak;
    },
    
    toggle(id) {
        const habit = App.state.habits.find(h => h.id === id);
        if (!habit) return;
        
        const today = new Date().toDateString();
        if (!habit.completedDates) habit.completedDates = [];
        
        const index = habit.completedDates.indexOf(today);
        if (index > -1) {
            habit.completedDates.splice(index, 1);
        } else {
            habit.completedDates.push(today);
            App.state.stats.totalPoints += 10;
            Gamification.addXP(10, 'habit');
        }
        
        App.storage.set('Habits', App.state.habits);
        App.storage.set('Stats', App.state.stats);
        this.render();
        this.updateStats();
        Dashboard.updateStats();
        Dashboard.updateLevelDisplay();
        
        UI.toast(index > -1 ? 'Habit unchecked' : 'Habit completed! +10 points', 'success');
    },
    
    delete(id) {
        App.state.habits = App.state.habits.filter(h => h.id !== id);
        App.storage.set('Habits', App.state.habits);
        this.render();
        this.updateStats();
        UI.toast('Habit deleted', 'info');
    },
    
    filter(category) {
        this.currentFilter = category;
        Utils.$$('.habit-category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        this.render();
    },
    
    updateStats() {
        const today = new Date().toDateString();
        const completed = App.state.habits.filter(h => h.completedDates?.includes(today)).length;
        const bestStreak = Math.max(...App.state.habits.map(h => this.calculateStreak(h)), 0);
        
        Utils.$('#total-habits').textContent = App.state.habits.length;
        Utils.$('#completed-habits-today').textContent = completed;
        Utils.$('#current-habit-streak').textContent = bestStreak;
    },
    
    showAddModal() {
        UI.modal(`
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; color: var(--text-secondary);">Habit Name</label>
                <input type="text" id="habit-name-input" style="width: 100%; padding: 14px; background: var(--bg-widget); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-primary);">
            </div>
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; color: var(--text-secondary);">Category</label>
                <select id="habit-category-input" style="width: 100%; padding: 14px; background: var(--bg-widget); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-primary);">
                    <option value="health">Health</option>
                    <option value="productivity">Productivity</option>
                    <option value="learning">Learning</option>
                    <option value="fitness">Fitness</option>
                </select>
            </div>
            <button class="btn btn-primary" style="width: 100%;" onclick="Habits.add()">Add Habit</button>
        `, 'Add New Habit');
    },
    
    add() {
        const name = Utils.$('#habit-name-input')?.value.trim();
        const category = Utils.$('#habit-category-input')?.value;
        
        if (!name) {
            UI.toast('Please enter a habit name', 'error');
            return;
        }
        
        App.state.habits.push({
            id: Date.now(),
            name,
            category,
            completedDates: [],
            streak: 0,
            createdAt: new Date().toISOString()
        });
        
        App.storage.set('Habits', App.state.habits);
        UI.closeModal();
        this.render();
        this.updateStats();
        UI.toast('Habit added successfully!', 'success');
    },
    
    bindEvents() {
        Utils.$('#add-habit-btn')?.addEventListener('click', () => this.showAddModal());
        Utils.$$('.habit-category-btn').forEach(btn => {
            btn.addEventListener('click', () => this.filter(btn.dataset.category));
        });
    }
};

// ============================================
// TASKS MODULE
// ============================================
const Tasks = {
    currentFilter: 'all',
    
    init() {
        this.loadTasks();
        this.bindEvents();
        this.render();
        this.updateCounts();
    },
    
    loadTasks() {
        const saved = App.storage.get('Tasks');
        if (saved && Array.isArray(saved)) {
            App.state.tasks = saved;
        }
    },
    
    render() {
        const list = Utils.$('#task-list');
        if (!list) return;
        
        const today = new Date().toDateString();
        let tasks = [...App.state.tasks];
        
        if (this.currentFilter === 'today') {
            tasks = tasks.filter(t => !t.completed && (!t.dueDate || t.dueDate === today));
        } else if (this.currentFilter === 'upcoming') {
            tasks = tasks.filter(t => !t.completed && t.dueDate && t.dueDate !== today);
        } else if (this.currentFilter === 'completed') {
            tasks = tasks.filter(t => t.completed);
        }
        
        if (tasks.length === 0) {
            list.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 40px;">No tasks found. Add a task to get started!</p>';
            return;
        }
        
        list.innerHTML = tasks.map((task, idx) => `
            <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}" style="animation-delay: ${idx * 0.03}s">
                <div class="task-checkbox" data-action="toggle" data-id="${task.id}"></div>
                <span class="task-text">${task.text}</span>
                <span class="task-priority ${task.priority}">${task.priority}</span>
                ${task.dueDate ? `<span class="task-due">${Utils.formatDate(task.dueDate)}</span>` : ''}
                <div class="task-actions">
                    <button class="btn-delete" data-action="delete" data-id="${task.id}"><i class="fas fa-trash"></i></button>
                </div>
            </li>
        `).join('');
        
        // Add event listeners to rendered items
        list.querySelectorAll('[data-action]').forEach(el => {
            el.addEventListener('click', (e) => {
                const action = el.dataset.action;
                const id = parseInt(el.dataset.id);
                if (action === 'toggle') this.toggle(id);
                if (action === 'delete') this.delete(id);
            });
        });
    },
    
    add() {
        const input = Utils.$('#new-task-input');
        const priority = Utils.$('#task-priority')?.value || 'medium';
        const dueDate = Utils.$('#task-due-date')?.value;
        
        if (!input.value.trim()) {
            UI.toast('Please enter a task', 'error');
            return;
        }
        
        App.state.tasks.unshift({
            id: Date.now(),
            text: input.value.trim(),
            priority,
            dueDate: dueDate || null,
            completed: false,
            createdAt: new Date().toISOString()
        });
        
        App.storage.set('Tasks', App.state.tasks);
        input.value = '';
        this.render();
        this.updateCounts();
        Dashboard.updateStats();
        UI.toast('Task added!', 'success');
    },
    
    toggle(id) {
        const task = App.state.tasks.find(t => t.id === id);
        if (!task) return;
        
        const points = { high: 30, medium: 20, low: 10 };
        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date().toISOString() : null;
        
        if (task.completed) {
            App.state.stats.completedTasks++;
            App.state.stats.totalPoints += points[task.priority] || 20;
            Gamification.addXP(points[task.priority] || 20, 'task');
            this.updateWeeklyStats();
        }
        
        App.storage.set('Tasks', App.state.tasks);
        App.storage.set('Stats', App.state.stats);
        this.render();
        this.updateCounts();
        Dashboard.updateStats();
        Dashboard.updateLevelDisplay();
        
        UI.toast(task.completed ? `Task completed! +${points[task.priority] || 20} points` : 'Task reopened', 'success');
    },
    
    delete(id) {
        App.state.tasks = App.state.tasks.filter(t => t.id !== id);
        App.storage.set('Tasks', App.state.tasks);
        this.render();
        this.updateCounts();
        Dashboard.updateStats();
        UI.toast('Task deleted', 'info');
    },
    
    filter(filter) {
        this.currentFilter = filter;
        Utils.$$('.task-filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.render();
    },
    
    updateCounts() {
        const today = new Date().toDateString();
        const todayCount = App.state.tasks.filter(t => !t.completed && (!t.dueDate || t.dueDate === today)).length;
        const upcomingCount = App.state.tasks.filter(t => !t.completed && t.dueDate && t.dueDate !== today).length;
        const completedCount = App.state.tasks.filter(t => t.completed).length;
        
        Utils.$('#count-all').textContent = App.state.tasks.length;
        Utils.$('#count-today').textContent = todayCount;
        Utils.$('#count-upcoming').textContent = upcomingCount;
        Utils.$('#count-completed').textContent = completedCount;
    },
    
    updateWeeklyStats() {
        const dayIndex = new Date().getDay();
        App.state.stats.weeklyProgress[dayIndex] = Math.min(
            (App.state.stats.weeklyProgress[dayIndex] || 0) + 10,
            100
        );
    },
    
    bindEvents() {
        Utils.$('#add-task-btn')?.addEventListener('click', () => this.add());
        Utils.$('#new-task-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.add();
        });
        Utils.$$('.task-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => this.filter(btn.dataset.filter));
        });
    }
};

// ============================================
// POMODORO MODULE
// ============================================
const Pomodoro = {
    init() {
        this.bindEvents();
        this.updateDisplay();
    },
    
    start() {
        if (App.state.pomodoro.isRunning) return;
        
        App.state.pomodoro.isRunning = true;
        Utils.$('#pomodoro-start').style.display = 'none';
        Utils.$('#pomodoro-pause').style.display = 'inline-flex';
        
        App.state.pomodoro.interval = setInterval(() => {
            App.state.pomodoro.totalSeconds--;
            
            if (App.state.pomodoro.totalSeconds <= 0) {
                this.complete();
            } else {
                this.updateDisplay();
            }
        }, 1000);
    },
    
    pause() {
        App.state.pomodoro.isRunning = false;
        clearInterval(App.state.pomodoro.interval);
        Utils.$('#pomodoro-start').style.display = 'inline-flex';
        Utils.$('#pomodoro-pause').style.display = 'none';
    },
    
    reset() {
        this.pause();
        App.state.pomodoro.minutes = parseInt(Utils.$('#focus-duration')?.value) || 25;
        App.state.pomodoro.totalSeconds = App.state.pomodoro.minutes * 60;
        this.updateDisplay();
    },
    
    updateDisplay() {
        const minutes = Math.floor(App.state.pomodoro.totalSeconds / 60);
        const seconds = App.state.pomodoro.totalSeconds % 60;
        
        Utils.$('#pomodoro-minutes').textContent = minutes.toString().padStart(2, '0');
        Utils.$('#pomodoro-seconds').textContent = seconds.toString().padStart(2, '0');
        
        const progress = 1 - (App.state.pomodoro.totalSeconds / (App.state.pomodoro.minutes * 60));
        const circumference = 2 * Math.PI * 90;
        const offset = circumference * (1 - progress);
        Utils.$('#pomodoro-ring').style.strokeDashoffset = offset;
    },
    
    complete() {
        clearInterval(App.state.pomodoro.interval);
        App.state.pomodoro.isRunning = false;
        App.state.pomodoro.sessions++;
        
        App.state.stats.focusMinutes += App.state.pomodoro.minutes;
        App.state.stats.totalPoints += 5;
        
        if (App.state.pomodoro.type === 'focus') {
            Gamification.addXP(5, 'focus');
        }
        
        App.storage.set('Stats', App.state.stats);
        
        Utils.$('#pomodoro-start').style.display = 'inline-flex';
        Utils.$('#pomodoro-pause').style.display = 'none';
        
        const sessionNum = App.state.pomodoro.sessions % 4 || 4;
        Utils.$$(`.session-dot[data-session="${sessionNum}"]`).forEach(dot => {
            dot.classList.add('completed');
        });
        
        Utils.$('#sessions-today').textContent = App.state.pomodoro.sessions;
        Utils.$('#total-focus-time').textContent = App.state.stats.focusMinutes;
        Dashboard.updateLevelDisplay();
        
        UI.toast(`${App.state.pomodoro.type === 'focus' ? 'Focus' : 'Break'} session complete!`, 'success');
        
        if (App.state.pomodoro.type === 'focus') {
            App.state.pomodoro.type = 'break';
            const isLongBreak = App.state.pomodoro.sessions % 4 === 0;
            App.state.pomodoro.minutes = isLongBreak 
                ? parseInt(Utils.$('#long-break')?.value) || 15 
                : parseInt(Utils.$('#short-break')?.value) || 5;
            Utils.$('#pomodoro-label').textContent = 'Break Time';
        } else {
            App.state.pomodoro.type = 'focus';
            App.state.pomodoro.minutes = parseInt(Utils.$('#focus-duration')?.value) || 25;
            Utils.$('#pomodoro-label').textContent = 'Focus Time';
        }
        
        App.state.pomodoro.totalSeconds = App.state.pomodoro.minutes * 60;
        this.updateDisplay();
        Dashboard.updateStats();
    },
    
    bindEvents() {
        Utils.$('#pomodoro-start')?.addEventListener('click', () => this.start());
        Utils.$('#pomodoro-pause')?.addEventListener('click', () => this.pause());
        Utils.$('#pomodoro-reset')?.addEventListener('click', () => this.reset());
        
        Utils.$('#focus-duration')?.addEventListener('change', (e) => {
            if (!App.state.pomodoro.isRunning) {
                App.state.pomodoro.minutes = parseInt(e.target.value) || 25;
                App.state.pomodoro.totalSeconds = App.state.pomodoro.minutes * 60;
                this.updateDisplay();
            }
        });
    }
};

// ============================================
// NOTES MODULE
// ============================================
const Notes = {
    currentEditing: null,
    
    init() {
        this.bindEvents();
        this.render();
    },
    
    render() {
        const list = Utils.$('#notes-list');
        if (!list) return;
        
        if (App.state.notes.length === 0) {
            list.innerHTML = '<p style="text-align: center; color: var(--text-muted); grid-column: 1/-1;">No notes yet. Click "New Note" to create one.</p>';
            return;
        }
        
        list.innerHTML = App.state.notes.map(note => `
            <div class="note-card" onclick="Notes.edit(${note.id})">
                <h4>${note.title || 'Untitled'}</h4>
                <p>${note.content?.substring(0, 100) || 'No content'}</p>
                <span class="note-date">${Utils.formatDate(note.updatedAt)}</span>
            </div>
        `).join('');
    },
    
    showEditor() {
        this.currentEditing = null;
        Utils.$('#note-editor').style.display = 'flex';
        Utils.$('#notes-list').parentElement.style.display = 'grid';
        Utils.$('#notes-list').style.display = 'grid';
        Utils.$('#note-title-input').value = '';
        Utils.$('#note-content-input').value = '';
        Utils.$('#note-tags-input').value = '';
        Utils.$('#note-timestamp').textContent = '';
        Utils.$('#delete-note').style.display = 'none';
    },
    
    edit(id) {
        const note = App.state.notes.find(n => n.id === id);
        if (!note) return;
        
        this.currentEditing = id;
        Utils.$('#note-editor').style.display = 'flex';
        Utils.$('#notes-list').style.display = 'grid';
        Utils.$('#note-title-input').value = note.title || '';
        Utils.$('#note-content-input').value = note.content || '';
        Utils.$('#note-tags-input').value = note.tags?.join(', ') || '';
        Utils.$('#note-timestamp').textContent = `Last edited: ${Utils.formatDate(note.updatedAt)}`;
        Utils.$('#delete-note').style.display = 'inline-flex';
    },
    
    save() {
        const title = Utils.$('#note-title-input')?.value.trim();
        const content = Utils.$('#note-content-input')?.value.trim();
        const tags = Utils.$('#note-tags-input')?.value.split(',').map(t => t.trim()).filter(Boolean);
        
        if (!title && !content) {
            UI.toast('Please add a title or content', 'error');
            return;
        }
        
        if (this.currentEditing) {
            const note = App.state.notes.find(n => n.id === this.currentEditing);
            if (note) {
                note.title = title;
                note.content = content;
                note.tags = tags;
                note.updatedAt = new Date().toISOString();
            }
        } else {
            App.state.notes.unshift({
                id: Date.now(),
                title,
                content,
                tags,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        }
        
        App.storage.set('Notes', App.state.notes);
        this.hideEditor();
        this.render();
        UI.toast('Note saved!', 'success');
    },
    
    delete() {
        if (!this.currentEditing) return;
        
        App.state.notes = App.state.notes.filter(n => n.id !== this.currentEditing);
        App.storage.set('Notes', App.state.notes);
        this.hideEditor();
        this.render();
        UI.toast('Note deleted', 'info');
    },
    
    hideEditor() {
        Utils.$('#note-editor').style.display = 'none';
        this.currentEditing = null;
    },
    
    bindEvents() {
        Utils.$('#add-note-btn')?.addEventListener('click', () => this.showEditor());
        Utils.$('#save-note')?.addEventListener('click', () => this.save());
        Utils.$('#cancel-note')?.addEventListener('click', () => this.hideEditor());
        Utils.$('#delete-note')?.addEventListener('click', () => this.delete());
    }
};

// ============================================
// AI CHAT MODULE
// ============================================
const AIChat = {
    init() {
        this.bindEvents();
    },
    
    toggle() {
        Utils.$('#ai-chat-widget')?.classList.toggle('active');
    },
    
    send() {
        const input = Utils.$('#chat-input');
        const message = input.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        input.value = '';
        
        setTimeout(() => {
            const response = this.getResponse(message);
            this.addMessage(response, 'bot');
        }, 1000);
    },
    
    addMessage(content, type) {
        const messages = Utils.$('#chat-messages');
        const div = document.createElement('div');
        div.className = `chat-message ${type}`;
        div.innerHTML = `<div class="message-content">${content}</div>`;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    },
    
    getResponse(message) {
        const responses = [
            "That's a great goal! Remember, consistency is key to achieving anything.",
            "I recommend breaking that task into smaller, manageable steps.",
            "Don't forget to take breaks. Your brain needs time to rest and recharge.",
            "You're making great progress! Keep up the momentum.",
            "Consider using the Pomodoro technique to improve your focus.",
            "Hydration is important! Have you had enough water today?",
            "Great question! I'm here to help you stay productive and motivated.",
            "Remember the 2-minute rule: If something takes less than 2 minutes, do it now!"
        ];
        
        const lower = message.toLowerCase();
        
        if (lower.includes('help')) {
            return "I can help you with productivity tips, task management advice, motivation, and tracking your habits. What would you like to know?";
        }
        if (lower.includes('motivate') || lower.includes('tip')) {
            return "Here's a productivity tip: Try the 'Eat the Frog' method - tackle your most challenging task first thing in the morning!";
        }
        if (lower.includes('habit')) {
            return "For building habits, start small! It's better to do 5 minutes every day than 1 hour once a week.";
        }
        if (lower.includes('focus') || lower.includes('concentrate')) {
            return "Try the Pomodoro technique: 25 minutes of focused work followed by a 5-minute break. After 4 cycles, take a longer break!";
        }
        
        return responses[Math.floor(Math.random() * responses.length)];
    },
    
    bindEvents() {
        Utils.$('#toggle-ai-chat')?.addEventListener('click', () => this.toggle());
        Utils.$('#close-chat')?.addEventListener('click', () => this.toggle());
        Utils.$('#send-chat')?.addEventListener('click', () => this.send());
        Utils.$('#chat-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.send();
        });
    }
};

// ============================================
// TOOLS MODULE
// ============================================
const Tools = {
    init() {
        this.initPasswordGenerator();
        this.initTimer();
        this.initColorPicker();
        this.initWaterTracker();
        this.initBMICalculator();
        this.initTDEECalculator();
    },
    
    initPasswordGenerator() {
        Utils.$('#gen-password')?.addEventListener('click', () => this.generatePassword());
        Utils.$('#copy-password')?.addEventListener('click', () => {
            navigator.clipboard.writeText(Utils.$('#generated-password').value);
            UI.toast('Password copied!', 'success');
        });
        this.generatePassword();
    },
    
    generatePassword() {
        const length = 16;
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars[Math.floor(Math.random() * chars.length)];
        }
        Utils.$('#generated-password').value = password;
    },
    
    initTimer() {
        Utils.$('#start-timer')?.addEventListener('click', () => {
            const minutes = parseInt(Utils.$('#timer-minutes').value) || 5;
            let seconds = minutes * 60;
            
            const interval = setInterval(() => {
                seconds--;
                const mins = Math.floor(seconds / 60);
                const secs = seconds % 60;
                Utils.$('#timer-display').textContent = 
                    `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                
                if (seconds <= 0) {
                    clearInterval(interval);
                    UI.toast('Timer complete!', 'success');
                }
            }, 1000);
        });
    },
    
    initColorPicker() {
        Utils.$('#color-input')?.addEventListener('input', (e) => {
            const color = e.target.value;
            Utils.$('#hex-value').textContent = color.toUpperCase();
            
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            Utils.$('#rgb-value').textContent = `RGB(${r}, ${g}, ${b})`;
        });
    },
    
    initWaterTracker() {
        let count = 0;
        
        Utils.$$('.water-cup').forEach(cup => {
            cup.addEventListener('click', () => {
                cup.classList.toggle('filled');
                count = Utils.$$('.water-cup.filled').length;
                Utils.$('#water-consumed').textContent = count;
            });
        });
        
        Utils.$('#reset-water')?.addEventListener('click', () => {
            count = 0;
            Utils.$$('.water-cup').forEach(c => c.classList.remove('filled'));
            Utils.$('#water-consumed').textContent = '0';
        });
    },
    
    initBMICalculator() {
        Utils.$('#calc-bmi')?.addEventListener('click', () => {
            const weight = parseFloat(Utils.$('#bmi-weight')?.value);
            const height = parseFloat(Utils.$('#bmi-height')?.value) / 100;
            
            if (!weight || !height) {
                UI.toast('Please enter valid values', 'error');
                return;
            }
            
            const bmi = weight / (height * height);
            let category = '';
            
            if (bmi < 18.5) category = 'Underweight';
            else if (bmi < 25) category = 'Normal weight';
            else if (bmi < 30) category = 'Overweight';
            else category = 'Obese';
            
            Utils.$('#bmi-result').innerHTML = `Your BMI: <strong>${bmi.toFixed(1)}</strong> (${category})`;
        });
    },
    
    initTDEECalculator() {
        Utils.$('#calc-tdee')?.addEventListener('click', () => {
            const weight = parseFloat(Utils.$('#tdee-weight')?.value);
            const height = parseFloat(Utils.$('#tdee-height')?.value);
            const age = parseFloat(Utils.$('#tdee-age')?.value);
            const activity = parseFloat(Utils.$('#tdee-activity')?.value);
            
            if (!weight || !height || !age) {
                UI.toast('Please enter valid values', 'error');
                return;
            }
            
            const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
            const tdee = Math.round(bmr * activity);
            
            Utils.$('#tdee-result').innerHTML = `
                Your TDEE: <strong>${tdee} calories/day</strong><br>
                <small>Bulk: +300-500 | Cut: -300-500</small>
            `;
        });
    }
};

// ============================================
// ANALYTICS MODULE
// ============================================
const Analytics = {
    init() {
        try {
            this.updateStats();
            this.bindEvents();
        } catch(e) {
            console.log('Analytics init error:', e);
        }
    },
    
    updateStats() {
        const completedTasks = App.state.tasks.filter(t => t.completed).length;
        const completedHabits = App.state.habits.reduce((sum, h) => sum + (h.completedDates?.length || 0), 0);
        const focusHours = Math.floor(App.state.stats.focusMinutes / 60);
        
        const el1 = Utils.$('#total-tasks-completed');
        const el2 = Utils.$('#total-habits-completed');
        const el3 = Utils.$('#total-focus-hours');
        const el4 = Utils.$('#longest-streak');
        if (el1) el1.textContent = completedTasks;
        if (el2) el2.textContent = completedHabits;
        if (el3) el3.textContent = focusHours;
        if (el4) el4.textContent = App.state.stats.streak;
    },
    
    exportData(format) {
        const data = {
            tasks: App.state.tasks,
            habits: App.state.habits,
            notes: App.state.notes,
            stats: App.state.stats,
            exportDate: new Date().toISOString()
        };
        
        let content, filename, type;
        
        if (format === 'json') {
            content = JSON.stringify(data, null, 2);
            filename = 'nova-data.json';
            type = 'application/json';
        } else {
            const rows = [
                ['Type', 'Title', 'Completed', 'Date'],
                ...App.state.tasks.map(t => ['Task', t.text, t.completed ? 'Yes' : 'No', t.createdAt]),
                ...App.state.habits.map(h => ['Habit', h.name, 'Yes', h.createdAt]),
                ...App.state.notes.map(n => ['Note', n.title, '', n.createdAt])
            ];
            content = rows.map(r => r.join(',')).join('\n');
            filename = 'nova-data.csv';
            type = 'text/csv';
        }
        
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        
        UI.toast(`Data exported as ${format.toUpperCase()}`, 'success');
    },
    
    bindEvents() {
        Utils.$('#export-json')?.addEventListener('click', () => this.exportData('json'));
        Utils.$('#export-csv')?.addEventListener('click', () => this.exportData('csv'));
    }
};

// ============================================
// TABS INITIALIZATION
// ============================================
const Tabs = {
    init() {
        this.initScheduleTabs();
        this.initTrainingTabs();
        this.initDietTabs();
    },
    
    initScheduleTabs() {
        Utils.$$('.schedule-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                Utils.$$('.schedule-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                Utils.$$('.schedule-view').forEach(v => v.classList.remove('active'));
                Utils.$(`#${tab.dataset.view}-schedule`)?.classList.add('active');
            });
        });
    },
    
    initTrainingTabs() {
        Utils.$$('.training-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                Utils.$$('.training-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                Utils.$$('.training-content').forEach(c => c.classList.remove('active'));
                Utils.$(`#${tab.dataset.training}-training`)?.classList.add('active');
            });
        });
    },
    
    initDietTabs() {
        Utils.$$('.diet-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                Utils.$$('.diet-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                Utils.$$('.diet-content').forEach(c => c.classList.remove('active'));
                Utils.$(`#${tab.dataset.tab}-diet`)?.classList.add('active');
            });
        });
    }
};

// ============================================
// QUICK ACTIONS
// ============================================
const QuickActions = {
    init() {
        Utils.$('#toggle-fullscreen')?.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });
    }
};

// ============================================
// FOOD DATABASE - Uses external NutritionDB module
// ============================================
const FoodDatabase = NutritionDB;

// ============================================
// NUTRITION MODULE
// ============================================
const Nutrition = {
    selectedFood: null,
    dietPlan: {
        breakfast: [],
        lunch: [],
        snacks: [],
        dinner: []
    },
    dailyGoals: {
        calories: 2500,
        protein: 150,
        carbs: 250,
        fats: 70
    },

    init() {
        this.loadDietPlan();
        this.bindEvents();
        this.renderFoodDatabase();
        this.renderDietPlan();
        this.updateDailyTotals();
    },

    bindEvents() {
        Utils.$$('.food-category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                Utils.$$('.food-category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderFoodDatabase(btn.dataset.category);
            });
        });

        const searchInput = Utils.$('#food-search-input');
        let searchTimeout;
        searchInput?.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.handleSearch(e.target.value);
            }, 150);
        });

        Utils.$('#clear-search')?.addEventListener('click', () => {
            searchInput.value = '';
            Utils.$('#search-results').innerHTML = '';
            Utils.$('#selected-food-nutrition').style.display = 'none';
        });

        const servingInput = Utils.$('#serving-size');
        servingInput?.addEventListener('input', () => {
            if (this.selectedFood) {
                this.showFoodDetails(this.selectedFood);
            }
        });

        Utils.$('#add-to-diet-btn')?.addEventListener('click', () => {
            Utils.$('#add-to-meal-selector').style.display = 'block';
        });

        Utils.$$('.meal-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.selectedFood) {
                    this.addToMeal(btn.dataset.meal);
                }
            });
        });

        Utils.$('#clear-diet-plan')?.addEventListener('click', () => {
            if (confirm('Clear all foods from your diet plan?')) {
                this.dietPlan = { breakfast: [], lunch: [], snacks: [], dinner: [] };
                this.saveDietPlan();
                this.renderDietPlan();
                this.updateDailyTotals();
                UI.toast('Diet plan cleared!', 'info');
            }
        });
    },

    renderFoodDatabase(category = 'all') {
        const grid = Utils.$('#food-database-grid');
        if (!grid) return;

        const foods = FoodDatabase.getByCategory(category);
        grid.innerHTML = foods.map(food => `
            <div class="food-item-card" data-id="${food.id}">
                <div class="food-name">${food.name}</div>
                <div class="food-calories">${food.calories} <span>kcal/100g</span></div>
                <div class="food-macros">
                    <span><i class="fas fa-drumstick-bite"></i> ${food.protein}g</span>
                    <span><i class="fas fa-bread-slice"></i> ${food.carbs}g</span>
                    <span><i class="fas fa-oil-can"></i> ${food.fats}g</span>
                </div>
            </div>
        `).join('');

        grid.querySelectorAll('.food-item-card').forEach(card => {
            card.addEventListener('click', () => {
                const food = FoodDatabase.getById(parseInt(card.dataset.id));
                this.selectedFood = food;
                this.showFoodDetails(food);
            });
        });
    },

    handleSearch(query) {
        const results = Utils.$('#search-results');
        if (!results) return;

        if (!query.trim()) {
            results.innerHTML = '';
            return;
        }

        const foods = FoodDatabase.search(query);
        results.innerHTML = foods.map(food => `
            <div class="search-result-item" data-id="${food.id}">
                <div class="result-icon"><i class="fas fa-utensils"></i></div>
                <div class="result-info">
                    <div class="result-name">${food.name}</div>
                    <div class="result-cal">${food.calories} kcal / 100g</div>
                </div>
            </div>
        `).join('');

        results.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const food = FoodDatabase.getById(parseInt(item.dataset.id));
                this.selectedFood = food;
                Utils.$('#food-search-input').value = food.name;
                results.innerHTML = '';
                this.showFoodDetails(food);
            });
        });
    },

    showFoodDetails(food) {
        const container = Utils.$('#selected-food-nutrition');
        const grams = parseInt(Utils.$('#serving-size')?.value) || 100;
        const nutrition = FoodDatabase.calculateNutrition(food, grams);

        Utils.$('#selected-food-name').textContent = `${food.name} (${grams}g)`;
        Utils.$('#detail-calories').textContent = nutrition.calories;
        Utils.$('#detail-protein').textContent = `${nutrition.protein}g`;
        Utils.$('#detail-carbs').textContent = `${nutrition.carbs}g`;
        Utils.$('#detail-fats').textContent = `${nutrition.fats}g`;
        Utils.$('#detail-fiber').textContent = `${nutrition.fiber}g`;
        Utils.$('#detail-sugar').textContent = `${nutrition.sugar}g`;
        Utils.$('#detail-sodium').textContent = `${nutrition.sodium}mg`;
        Utils.$('#detail-cholesterol').textContent = `${nutrition.cholesterol}mg`;

        container.style.display = 'block';
    },

    addToMeal(meal) {
        if (!this.selectedFood) return;

        const grams = parseInt(Utils.$('#serving-size')?.value) || 100;
        const nutrition = FoodDatabase.calculateNutrition(this.selectedFood, grams);

        this.dietPlan[meal].push({
            id: this.selectedFood.id,
            name: this.selectedFood.name,
            grams,
            ...nutrition
        });

        this.saveDietPlan();
        this.renderDietPlan();
        this.updateDailyTotals();

        Utils.$('#add-to-meal-selector').style.display = 'none';
        UI.toast(`Added ${this.selectedFood.name} to ${meal}!`, 'success');
    },

    removeFromMeal(meal, index) {
        this.dietPlan[meal].splice(index, 1);
        this.saveDietPlan();
        this.renderDietPlan();
        this.updateDailyTotals();
    },

    updateServing(meal, index, delta) {
        const item = this.dietPlan[meal][index];
        if (!item) return;

        item.grams = Math.max(10, item.grams + delta);
        
        const food = FoodDatabase.getById(item.id);
        if (food) {
            const nutrition = FoodDatabase.calculateNutrition(food, item.grams);
            item.calories = nutrition.calories;
            item.protein = nutrition.protein;
            item.carbs = nutrition.carbs;
            item.fats = nutrition.fats;
        }

        this.saveDietPlan();
        this.renderDietPlan();
        this.updateDailyTotals();
    },

    renderDietPlan() {
        ['breakfast', 'lunch', 'snacks', 'dinner'].forEach(meal => {
            const container = Utils.$(`#${meal}-items`);
            if (!container) return;

            const items = this.dietPlan[meal];
            let mealCalories = 0;

            if (items.length === 0) {
                container.innerHTML = '<div class="empty-meal">No foods added yet</div>';
            } else {
                container.innerHTML = items.map((item, index) => {
                    mealCalories += item.calories;
                    return `
                        <div class="meal-food-item">
                            <div class="food-info">
                                <div class="name">${item.name}</div>
                                <div class="macros">${item.grams}g | ${item.calories} cal | P: ${item.protein}g C: ${item.carbs}g F: ${item.fats}g</div>
                            </div>
                            <div class="food-actions">
                                <div class="serving-ctrl">
                                    <button onclick="Nutrition.updateServing('${meal}', ${index}, -10)">-</button>
                                    <span>${item.grams}g</span>
                                    <button onclick="Nutrition.updateServing('${meal}', ${index}, 10)">+</button>
                                </div>
                                <button class="remove-food" onclick="Nutrition.removeFromMeal('${meal}', ${index})">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                    `;
                }).join('');
            }

            const calElement = Utils.$(`#${meal}-calories`);
            if (calElement) calElement.textContent = `${mealCalories} cal`;
        });
    },

    updateDailyTotals() {
        let totals = { calories: 0, protein: 0, carbs: 0, fats: 0 };

        Object.values(this.dietPlan).forEach(meal => {
            meal.forEach(item => {
                totals.calories += item.calories;
                totals.protein += item.protein;
                totals.carbs += item.carbs;
                totals.fats += item.fats;
            });
        });

        Utils.$('#daily-calories').textContent = totals.calories;
        Utils.$('#daily-protein').textContent = `${Math.round(totals.protein)}g`;
        Utils.$('#daily-carbs').textContent = `${Math.round(totals.carbs)}g`;
        Utils.$('#daily-fats').textContent = `${Math.round(totals.fats)}g`;

        Utils.$('#plan-total-calories').textContent = totals.calories;
        Utils.$('#plan-total-protein').textContent = `${Math.round(totals.protein)}g`;
        Utils.$('#plan-total-carbs').textContent = `${Math.round(totals.carbs)}g`;
        Utils.$('#plan-total-fats').textContent = `${Math.round(totals.fats)}g`;

        this.updateProgressBar('cal', totals.calories, this.dailyGoals.calories);
        this.updateProgressBar('protein', totals.protein, this.dailyGoals.protein);
        this.updateProgressBar('carbs', totals.carbs, this.dailyGoals.carbs);
        this.updateProgressBar('fats', totals.fats, this.dailyGoals.fats);
    },

    updateProgressBar(type, current, goal) {
        const percentage = Math.min((current / goal) * 100, 100);
        const bar = Utils.$(`#${type}-progress-bar`);
        const text = Utils.$(`#${type}-progress-text`);
        
        if (bar) bar.style.width = `${percentage}%`;
        if (text) {
            if (type === 'cal') {
                text.textContent = `${current} / ${goal}`;
            } else {
                text.textContent = `${Math.round(current)}g / ${goal}g`;
            }
        }
    },

    saveDietPlan() {
        App.storage.set('DietPlan', this.dietPlan);
    },

    loadDietPlan() {
        const saved = App.storage.get('DietPlan');
        if (saved) {
            this.dietPlan = saved;
        }
    }
};

// ============================================
// KNOWLEDGE UI MODULE
// ============================================
const KnowledgeUI = {
    currentTab: 'links',

    init() {
        try {
            this.initTabs();
            this.renderLinks();
            this.renderCourses();
            this.renderSkills();
            this.bindEvents();
        } catch(e) {
            console.log('KnowledgeUI init error:', e);
        }
    },

    initTabs() {
        Utils.$$('.knowledge-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                Utils.$$('.knowledge-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.currentTab = tab.dataset.tab;
                Utils.$$('.knowledge-content').forEach(c => c.classList.remove('active'));
                Utils.$(`#knowledge-${tab.dataset.tab}`)?.classList.add('active');
            });
        });
    },

    bindEvents() {
        Utils.$('#add-knowledge-btn')?.addEventListener('click', () => this.showAddLinkModal());
        
        Utils.$('#knowledge-search-input')?.addEventListener('input', (e) => {
            this.searchLinks(e.target.value);
        });

        Utils.$$('.knowledge-category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                Utils.$$('.knowledge-category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterByCategory(btn.dataset.category);
            });
        });

        Utils.$('#add-course-btn')?.addEventListener('click', () => this.showAddCourseModal());
        Utils.$('#add-skill-btn')?.addEventListener('click', () => this.showAddSkillModal());
    },

    renderLinks(links = null) {
        const grid = Utils.$('#links-grid');
        if (!grid) return;
        
        const displayLinks = links || KnowledgeBase.links;
        
        if (displayLinks.length === 0) {
            grid.innerHTML = '<div class="empty-state"><p>No links saved yet. Add your first learning resource!</p></div>';
            return;
        }
        
        grid.innerHTML = displayLinks.map(link => `
            <div class="link-card" data-id="${link.id}">
                <div class="link-card-header">
                    <div class="link-favicon">
                        <img src="${link.favicon}" alt="" onerror="this.style.display=\\'none\\'; this.parentElement.innerHTML=\\'<i class=\\'fas fa-link\\'></i>\\'">
                    </div>
                    <div class="link-info">
                        <h4>${link.title}</h4>
                        <span class="link-category">${link.category}</span>
                    </div>
                </div>
                <p class="link-description">${link.description || 'No description'}</p>
                <div class="link-meta">
                    <span class="link-visits"><i class="fas fa-eye"></i> ${link.visits} visits</span>
                    <span>${new Date(link.createdAt).toLocaleDateString()}</span>
                </div>
                ${link.tags.length > 0 ? `
                    <div class="link-tags">
                        ${link.tags.map(tag => `<span class="link-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        `).join('');

        grid.querySelectorAll('.link-card').forEach(card => {
            card.addEventListener('click', () => {
                const link = KnowledgeBase.getLink(card.dataset.id);
                if (link) {
                    window.open(link.url, '_blank');
                    KnowledgeBase.incrementVisit(card.dataset.id);
                }
            });
        });
    },

    searchLinks(query) {
        const results = KnowledgeBase.searchLinks(query);
        this.renderLinks(results);
    },

    filterByCategory(category) {
        const filtered = KnowledgeBase.getLinksByCategory(category);
        this.renderLinks(filtered);
    },

    showAddLinkModal() {
        UI.modal(`
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; color: var(--text-secondary);">Title</label>
                <input type="text" id="link-title" style="width: 100%; padding: 14px; background: var(--bg-widget); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-primary);" placeholder="e.g., React Documentation">
            </div>
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; color: var(--text-secondary);">URL</label>
                <input type="url" id="link-url" style="width: 100%; padding: 14px; background: var(--bg-widget); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-primary);" placeholder="https://...">
            </div>
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; color: var(--text-secondary);">Description</label>
                <textarea id="link-description" style="width: 100%; padding: 14px; background: var(--bg-widget); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-primary);" placeholder="Brief description..."></textarea>
            </div>
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; color: var(--text-secondary);">Category</label>
                <select id="link-category" style="width: 100%; padding: 14px; background: var(--bg-widget); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-primary);">
                    ${KnowledgeBase.categories.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
            </div>
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; color: var(--text-secondary);">Tags (comma separated)</label>
                <input type="text" id="link-tags" style="width: 100%; padding: 14px; background: var(--bg-widget); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-primary);" placeholder="javascript, react, frontend">
            </div>
            <button class="btn btn-primary" style="width: 100%;" onclick="Knowledge.addLink()">Add Link</button>
        `, 'Add Knowledge Link');
    },

    addLink() {
        const title = Utils.$('#link-title')?.value.trim();
        const url = Utils.$('#link-url')?.value.trim();
        const description = Utils.$('#link-description')?.value.trim();
        const category = Utils.$('#link-category')?.value;
        const tagsInput = Utils.$('#link-tags')?.value.trim();
        const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : [];
        
        if (!title || !url) {
            UI.toast('Please fill in title and URL', 'error');
            return;
        }
        
        KnowledgeBase.addLink({ title, url, description, category, tags });
        UI.closeModal();
        this.renderLinks();
        Gamification.addXP(10, 'knowledge');
        Dashboard.updateLevelDisplay();
        UI.toast('Link added successfully! +10 XP', 'success');
    },

    renderCourses() {
        const list = Utils.$('#courses-list');
        if (!list) return;
        
        const courses = LearningTracker.getCourses();
        
        if (courses.length === 0) {
            list.innerHTML = '<div class="empty-state"><p>No courses added yet.</p></div>';
            return;
        }
        
        list.innerHTML = courses.map(course => `
            <div class="course-item">
                <div class="course-progress-bar">
                    <div class="course-progress-fill" style="width: ${course.progress}%"></div>
                </div>
                <div class="course-info">
                    <h4>${course.title}</h4>
                    <p>${course.platform || 'Self-paced'} | ${course.progress}% complete</p>
                </div>
                <span class="course-status ${course.status}">${course.status === 'completed' ? 'Completed' : 'In Progress'}</span>
            </div>
        `).join('');
    },

    renderSkills() {
        const grid = Utils.$('#skills-grid');
        if (!grid) return;
        
        const skills = LearningTracker.getSkills();
        
        if (skills.length === 0) {
            grid.innerHTML = '<div class="empty-state"><p>No skills added yet.</p></div>';
            return;
        }
        
        grid.innerHTML = skills.map(skill => `
            <div class="skill-card">
                <div class="skill-header">
                    <h4>${skill.name}</h4>
                    <span class="skill-level">Lv. ${skill.level}</span>
                </div>
                <div class="skill-progress">
                    <div class="skill-xp-bar">
                        <div class="skill-xp-fill" style="width: ${(skill.xp / skill.xpToNextLevel) * 100}%"></div>
                    </div>
                    <p class="skill-xp-text">${skill.xp} / ${skill.xpToNextLevel} XP</p>
                </div>
            </div>
        `).join('');
    },

    showAddCourseModal() {
        UI.modal(`
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px;">Course Title</label>
                <input type="text" id="course-title" style="width: 100%; padding: 14px; background: var(--bg-widget); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-primary);">
            </div>
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px;">Platform/URL</label>
                <input type="text" id="course-platform" style="width: 100%; padding: 14px; background: var(--bg-widget); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-primary);">
            </div>
            <button class="btn btn-primary" style="width: 100%;" onclick="Knowledge.addCourse()">Add Course</button>
        `, 'Add Learning Course');
    },

    addCourse() {
        const title = Utils.$('#course-title')?.value.trim();
        const platform = Utils.$('#course-platform')?.value.trim();
        
        if (!title) {
            UI.toast('Please enter course title', 'error');
            return;
        }
        
        LearningTracker.addCourse({ title, platform, category: 'General' });
        UI.closeModal();
        this.renderCourses();
        Gamification.addXP(15, 'learning');
        Dashboard.updateLevelDisplay();
        UI.toast('Course added! +15 XP', 'success');
    },

    showAddSkillModal() {
        UI.modal(`
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px;">Skill Name</label>
                <input type="text" id="skill-name" style="width: 100%; padding: 14px; background: var(--bg-widget); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-primary);">
            </div>
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px;">Category</label>
                <select id="skill-category" style="width: 100%; padding: 14px; background: var(--bg-widget); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-primary);">
                    <option value="Technical">Technical</option>
                    <option value="Physical">Physical</option>
                    <option value="Creative">Creative</option>
                    <option value="Social">Social</option>
                    <option value="Cognitive">Cognitive</option>
                </select>
            </div>
            <button class="btn btn-primary" style="width: 100%;" onclick="Knowledge.addSkill()">Add Skill</button>
        `, 'Add Skill to Track');
    },

    addSkill() {
        const name = Utils.$('#skill-name')?.value.trim();
        const category = Utils.$('#skill-category')?.value;
        
        if (!name) {
            UI.toast('Please enter skill name', 'error');
            return;
        }
        
        LearningTracker.addSkill({ name, category });
        UI.closeModal();
        this.renderSkills();
        Gamification.addXP(20, 'skill');
        Dashboard.updateLevelDisplay();
        UI.toast('Skill added! +20 XP', 'success');
    }
};

// ============================================
// CHALLENGES UI MODULE
// ============================================
const ChallengesUI = {
    init() {
        try {
            this.renderChallenges();
            this.updateStats();
        } catch(e) {
            console.log('ChallengesUI init error:', e);
        }
    },

    renderChallenges() {
        const grid = Utils.$('#challenges-grid');
        if (!grid) return;

        const progress = DailyChallenges.getProgress();
        const challenges = progress.challenges;

        grid.innerHTML = challenges.map((challenge, index) => {
            const isCompleted = challenge.status === 'completed';
            const categoryIcon = DailyChallenges.getCategoryIcon(challenge.category);
            const difficultyColor = DailyChallenges.getDifficultyColor(challenge.difficulty);

            return `
                <div class="challenge-card ${challenge.category} ${isCompleted ? 'completed' : ''}" data-id="${challenge.id}">
                    <div class="challenge-header">
                        <span class="challenge-category ${challenge.category}">
                            <i class="fas ${categoryIcon}"></i> ${challenge.category}
                        </span>
                        <span class="challenge-difficulty ${challenge.difficulty}" style="background: ${difficultyColor}20; color: ${difficultyColor}">${challenge.difficulty}</span>
                    </div>
                    <h3 class="challenge-title">${challenge.title}</h3>
                    <p class="challenge-description">${challenge.description}</p>
                    <div class="challenge-footer">
                        <span class="challenge-xp">
                            <i class="fas fa-star"></i> +${challenge.xp} XP
                        </span>
                        ${isCompleted ? `
                            <span class="challenge-completed-badge">
                                <i class="fas fa-check-circle"></i> Completed
                            </span>
                        ` : `
                            <button class="challenge-complete-btn" onclick="ChallengesUI.completeChallenge('${challenge.id}')">
                                <i class="fas fa-check"></i> Complete
                            </button>
                        `}
                    </div>
                </div>
            `;
        }).join('');

        // Update progress
        Utils.$('#challenge-count').textContent = `${progress.completed}/${progress.total} Completed`;
        Utils.$('#challenge-progress-fill').style.width = `${progress.percentage}%`;

        // Show completion card if all done
        const completionEl = Utils.$('#challenge-completion');
        if (completionEl) {
            completionEl.style.display = progress.allCompleted ? 'block' : 'none';
        }
    },

    updateStats() {
        const progress = DailyChallenges.getProgress();
        
        const streakEl = Utils.$('#challenge-streak');
        const pointsEl = Utils.$('#challenge-points');
        
        if (streakEl) streakEl.textContent = progress.streak;
        if (pointsEl) pointsEl.textContent = progress.totalPointsEarned;
    },

    completeChallenge(challengeId) {
        const result = DailyChallenges.completeChallenge(challengeId);
        
        if (result) {
            this.renderChallenges();
            this.updateStats();
            
            UI.toast(`🎉 Challenge Completed! +${result.xpEarned} XP`, 'success');
            
            // Check if all completed
            if (result.allCompleted) {
                setTimeout(() => {
                    UI.toast('🏆 ALL CHALLENGES COMPLETE! Day streak increased!', 'success');
                }, 1000);
            }
        }
    },

    refreshChallenges() {
        DailyChallenges.generateDailyChallenges();
        this.renderChallenges();
        this.updateStats();
    }
};

// ============================================
// PROFILE & SETTINGS MODULE
// ============================================
const Profile = {
    defaultExercises: {
        cardio: [
            { id: 1, name: 'Running', sets: '20-30 min', category: 'cardio' },
            { id: 2, name: 'Jump Rope', sets: '3x5 min', category: 'cardio' },
            { id: 3, name: 'Cycling', sets: '30-45 min', category: 'cardio' },
            { id: 4, name: 'Swimming', sets: '20-30 min', category: 'cardio' },
            { id: 5, name: 'Rowing', sets: '15-20 min', category: 'cardio' }
        ],
        strength: [
            { id: 1, name: 'Push-ups', sets: '4x15-20', category: 'strength' },
            { id: 2, name: 'Pull-ups', sets: '4x8-12', category: 'strength' },
            { id: 3, name: 'Squats', sets: '4x12-15', category: 'strength' },
            { id: 4, name: 'Deadlift', sets: '4x8-10', category: 'strength' },
            { id: 5, name: 'Bench Press', sets: '4x8-12', category: 'strength' }
        ],
        flexibility: [
            { id: 1, name: 'Yoga Flow', sets: '20 min', category: 'flexibility' },
            { id: 2, name: 'Hamstring Stretch', sets: '3x30s each', category: 'flexibility' },
            { id: 3, name: 'Hip Flexor Stretch', sets: '3x30s each', category: 'flexibility' },
            { id: 4, name: 'Shoulder Mobility', sets: '10 min', category: 'flexibility' },
            { id: 5, name: 'Foam Rolling', sets: '15 min', category: 'flexibility' }
        ],
        hiit: [
            { id: 1, name: 'Burpees', sets: '4x15', category: 'hiit' },
            { id: 2, name: 'Mountain Climbers', sets: '4x30s', category: 'hiit' },
            { id: 3, name: 'Box Jumps', sets: '4x12', category: 'hiit' },
            { id: 4, name: 'Battle Ropes', sets: '4x30s', category: 'hiit' },
            { id: 5, name: 'Sprints', sets: '8x30s', category: 'hiit' }
        ]
    },
    
    defaultCombatSkills: {
        striking: [
            { id: 1, name: 'Jab', level: 1, category: 'striking' },
            { id: 2, name: 'Cross', level: 1, category: 'striking' },
            { id: 3, name: 'Hook', level: 2, category: 'striking' },
            { id: 4, name: 'Uppercut', level: 2, category: 'striking' },
            { id: 5, name: 'Spinning Backfist', level: 5, category: 'striking' },
            { id: 6, name: 'Axe Kick', level: 4, category: 'striking' },
            { id: 7, name: 'Superman Punch', level: 5, category: 'striking' },
            { id: 8, name: 'Head Kick', level: 3, category: 'striking' },
            { id: 9, name: 'Liver Kick', level: 4, category: 'striking' },
            { id: 10, name: 'Superman Punch', level: 5, category: 'striking' },
            { id: 11, name: 'Question Mark Kick', level: 6, category: 'striking' },
            { id: 12, name: 'Spinning Hook Kick', level: 7, category: 'striking' }
        ],
        grappling: [
            { id: 1, name: 'Armbar', level: 2, category: 'grappling' },
            { id: 2, name: 'Triangle Choke', level: 3, category: 'grappling' },
            { id: 3, name: 'Rear Naked Choke', level: 2, category: 'grappling' },
            { id: 4, name: 'Guillotine', level: 2, category: 'grappling' },
            { id: 5, name: 'Kimura', level: 3, category: 'grappling' },
            { id: 6, name: 'Omoplata', level: 4, category: 'grappling' },
            { id: 7, name: 'Anaconda Choke', level: 4, category: 'grappling' },
            { id: 8, name: 'North-South Choke', level: 5, category: 'grappling' },
            { id: 9, name: 'Peruvian Neck Tie', level: 6, category: 'grappling' },
            { id: 10, name: 'Americana', level: 3, category: 'grappling' },
            { id: 11, name: 'Keylock', level: 4, category: 'grappling' },
            { id: 12, name: 'Crotch Ripper', level: 7, category: 'grappling' }
        ],
        defense: [
            { id: 1, name: 'Parry', level: 1, category: 'defense' },
            { id: 2, name: 'Slip', level: 1, category: 'defense' },
            { id: 3, name: 'Block', level: 1, category: 'defense' },
            { id: 4, name: 'Cover Up', level: 2, category: 'defense' },
            { id: 5, name: 'Pull Back', level: 2, category: 'defense' },
            { id: 6, name: 'Shrimp Escape', level: 3, category: 'defense' },
            { id: 7, name: 'Bridge Escape', level: 3, category: 'defense' },
            { id: 8, name: 'Granby Roll', level: 4, category: 'defense' },
            { id: 9, name: 'Wall Run', level: 5, category: 'defense' },
            { id: 10, name: 'Sprawl', level: 2, category: 'defense' }
        ],
        footwork: [
            { id: 1, name: 'Step-In', level: 1, category: 'footwork' },
            { id: 2, name: 'Step-Out', level: 1, category: 'footwork' },
            { id: 3, name: 'Pivot', level: 2, category: 'footwork' },
            { id: 4, name: 'Cut Angle', level: 2, category: 'footwork' },
            { id: 5, name: 'Circle Left', level: 1, category: 'footwork' },
            { id: 6, name: 'Circle Right', level: 1, category: 'footwork' },
            { id: 7, name: 'Level Change', level: 2, category: 'footwork' },
            { id: 8, name: 'Angle Off', level: 3, category: 'footwork' },
            { id: 9, name: 'Angle Shift', level: 4, category: 'footwork' },
            { id: 10, name: 'Slide Step', level: 3, category: 'footwork' },
            { id: 11, name: 'Stutter Step', level: 4, category: 'footwork' },
            { id: 12, name: 'Bounce Step', level: 2, category: 'footwork' }
        ]
    },
    
    init() {
        try {
            this.loadProfile();
            this.loadExercises();
            this.loadCombatSkills();
            this.bindTabs();
            this.updateLevelProgress();
        } catch(e) {
            console.log('Profile init error:', e);
        }
    },
    
    bindTabs() {
        document.querySelectorAll('.profile-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.profile-content').forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(tab.dataset.tab)?.classList.add('active');
                
                if (tab.dataset.tab === 'level-progress') {
                    this.updateLevelProgress();
                }
            });
        });
    },
    
    loadProfile() {
        const profile = App.storage.get('Profile') || { username: 'Warrior', email: '', bio: '', avatar: 'U' };
        const usernameEl = Utils.$('#profile-username');
        const emailEl = Utils.$('#profile-email');
        const bioEl = Utils.$('#profile-bio');
        const avatarEl = Utils.$('#profile-avatar-display');
        if (usernameEl) usernameEl.value = profile.username;
        if (emailEl) emailEl.value = profile.email;
        if (bioEl) bioEl.textContent = profile.bio || '';
        if (avatarEl) avatarEl.textContent = profile.avatar;
    },
    
    saveProfile() {
        const profile = {
            username: Utils.$('#profile-username')?.value || 'Warrior',
            email: Utils.$('#profile-email')?.value || '',
            bio: Utils.$('#profile-bio')?.value || '',
            avatar: Utils.$('#profile-avatar-display')?.textContent || 'U'
        };
        App.storage.set('Profile', profile);
        UI.toast('Profile saved!', 'success');
    },
    
    editAvatar() {
        const letters = ['W', 'N', 'S', 'A', 'M', 'K', 'R', 'F', 'T', 'C', 'B', 'X'];
        let html = '<div style="text-align: center;"><p style="margin-bottom: 20px;">Choose an avatar letter:</p><div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">';
        for (let i = 0; i < letters.length; i++) {
            html += '<button onclick="Profile.setAvatar(\'' + letters[i] + '\')" style="width: 50px; height: 50px; border-radius: 50%; background: var(--gradient-primary); border: none; color: white; font-size: 1.5rem; font-weight: 700; cursor: pointer;">' + letters[i] + '</button>';
        }
        html += '</div></div>';
        UI.modal(html, 'Choose Avatar');
    },
    
    setAvatar(letter) {
        const profile = App.storage.get('Profile') || {};
        profile.avatar = letter;
        App.storage.set('Profile', profile);
        Utils.$('#profile-avatar-display').textContent = letter;
        UI.closeModal();
    },
    
    updateLevelProgress() {
        if (typeof Gamification !== 'undefined' && Gamification.getProgress) {
            const progress = Gamification.getProgress();
            const state = Gamification.getState();
            
            const el1 = Utils.$('#profile-level-emoji');
            const el2 = Utils.$('#profile-level-number');
            const el3 = Utils.$('#profile-level-name');
            const el4 = Utils.$('#profile-level-title');
            const el5 = Utils.$('#profile-xp-current');
            const el6 = Utils.$('#profile-xp-percent');
            const el7 = Utils.$('#profile-xp-fill');
            const el8 = Utils.$('#profile-total-xp');
            const el9 = Utils.$('#profile-achievements');
            const el10 = Utils.$('#profile-streak');
            const el11 = Utils.$('#profile-xp-next');
            const el12 = Utils.$('#profile-next-level');
            
            if (el1) el1.textContent = progress.levelEmoji;
            if (el2) el2.textContent = progress.level;
            if (el3) el3.textContent = progress.levelName;
            if (el4) el4.textContent = progress.levelTitle;
            if (el5) el5.textContent = progress.xp + ' XP';
            if (el6) el6.textContent = progress.progressPercent + '%';
            if (el7) el7.style.width = progress.progressPercent + '%';
            if (el8) el8.textContent = state.totalXP || progress.xp;
            if (el9) el9.textContent = (state.unlockedAchievements ? state.unlockedAchievements.length : 0);
            if (el10) el10.textContent = App.state.stats.streak || 0;
            
            if (progress.isMaxLevel) {
                if (el11) el11.textContent = 'MAX LEVEL!';
            } else {
                if (el11) el11.textContent = progress.xpToNextLevel + ' XP to Level ' + (progress.level + 1);
                if (el12) el12.textContent = 'Level ' + (progress.level + 1);
            }
            
            this.renderLevelsRoadmap(progress.level);
        }
    },
    
    renderLevelsRoadmap(currentLevel) {
        const container = Utils.$('#levels-roadmap');
        if (!container) return;
        
        const levels = Gamification.getAllLevels?.() || {};
        let html = '';
        
        for (let i = 1; i <= 25; i++) {
            const level = levels[i];
            if (!level) continue;
            
            const isCurrent = i === currentLevel;
            const isLocked = i > currentLevel;
            
            html += `
                <div class="roadmap-level ${isCurrent ? 'current' : ''} ${isLocked ? 'locked' : ''}">
                    <span class="roadmap-emoji">${level.emoji}</span>
                    <div class="roadmap-info">
                        <div class="roadmap-name">${level.name}</div>
                        <div class="roadmap-xp">${level.minXP} XP</div>
                    </div>
                </div>
            `;
        }
        
        container.innerHTML = html;
    },
    
    loadExercises() {
        let exercises = App.storage.get('CustomExercises');
        if (!exercises) {
            exercises = this.defaultExercises;
            App.storage.set('CustomExercises', exercises);
        }
        
        ['cardio', 'strength', 'flexibility', 'hiit'].forEach(category => {
            const list = Utils.$(`#custom-${category}-list`);
            if (!list) return;
            
            const items = exercises[category] || this.defaultExercises[category] || [];
            list.innerHTML = items.map((ex, idx) => `
                <li data-id="${ex.id}">
                    <div>
                        <span class="exercise-name">${ex.name}</span>
                        <span class="exercise-sets">${ex.sets}</span>
                    </div>
                    <button class="delete-btn" onclick="Profile.deleteExercise('${category}', ${ex.id})">
                        <i class="fas fa-times"></i>
                    </button>
                </li>
            `).join('');
        });
    },
    
    showAddExerciseModal() {
        UI.modal(`
            <div class="modal-exercise-form">
                <div class="modal-form-group">
                    <label>Exercise Name</label>
                    <input type="text" id="new-exercise-name" placeholder="e.g., Burpees">
                </div>
                <div class="modal-form-group">
                    <label>Category</label>
                    <select id="new-exercise-category">
                        <option value="cardio">Cardio</option>
                        <option value="strength">Strength</option>
                        <option value="flexibility">Flexibility</option>
                        <option value="hiit">HIIT</option>
                    </select>
                </div>
                <div class="modal-form-group">
                    <label>Sets/Reps/Duration</label>
                    <input type="text" id="new-exercise-sets" placeholder="e.g., 4x15 or 20 min">
                </div>
                <button class="btn btn-primary" style="width: 100%;" onclick="Profile.addExercise()">
                    <i class="fas fa-plus"></i> Add Exercise
                </button>
            </div>
        `, 'Add Custom Exercise');
    },
    
    addExercise() {
        const name = Utils.$('#new-exercise-name')?.value.trim();
        const category = Utils.$('#new-exercise-category')?.value;
        const sets = Utils.$('#new-exercise-sets')?.value.trim() || '3x10';
        
        if (!name) {
            UI.toast('Please enter exercise name', 'error');
            return;
        }
        
        let exercises = App.storage.get('CustomExercises') || this.defaultExercises;
        
        if (!exercises[category]) exercises[category] = [];
        
        exercises[category].push({
            id: Date.now(),
            name,
            sets,
            category
        });
        
        App.storage.set('CustomExercises', exercises);
        UI.closeModal();
        this.loadExercises();
        UI.toast('Exercise added!', 'success');
    },
    
    deleteExercise(category, id) {
        let exercises = App.storage.get('CustomExercises') || this.defaultExercises;
        exercises[category] = exercises[category].filter(ex => ex.id !== id);
        App.storage.set('CustomExercises', exercises);
        this.loadExercises();
        UI.toast('Exercise deleted', 'info');
    },
    
    loadCombatSkills() {
        let skills = App.storage.get('CustomCombatSkills');
        if (!skills) {
            skills = this.defaultCombatSkills;
            App.storage.set('CustomCombatSkills', skills);
        }
        
        ['striking', 'grappling', 'defense', 'footwork'].forEach(category => {
            const list = Utils.$(`#combat-${category}-list`);
            if (!list) return;
            
            const items = skills[category] || this.defaultCombatSkills[category] || [];
            list.innerHTML = items.map(skill => `
                <li>
                    <div>
                        <span class="skill-name">${skill.name}</span>
                    </div>
                    <span class="skill-level">Lvl ${skill.level}</span>
                    <button class="delete-btn" onclick="Profile.deleteCombatSkill('${category}', ${skill.id})">
                        <i class="fas fa-times"></i>
                    </button>
                </li>
            `).join('');
        });
    },
    
    showAddCombatSkillModal() {
        UI.modal(`
            <div class="modal-skill-form">
                <div class="modal-form-group">
                    <label>Skill Name</label>
                    <input type="text" id="new-skill-name" placeholder="e.g., Spinning Back Kick">
                </div>
                <div class="modal-form-group">
                    <label>Category</label>
                    <select id="new-skill-category">
                        <option value="striking">Striking</option>
                        <option value="grappling">Grappling</option>
                        <option value="defense">Defense</option>
                        <option value="footwork">Footwork</option>
                    </select>
                </div>
                <div class="modal-form-group">
                    <label>Required Level</label>
                    <input type="number" id="new-skill-level" value="1" min="1" max="10">
                </div>
                <button class="btn btn-primary" style="width: 100%;" onclick="Profile.addCombatSkill()">
                    <i class="fas fa-plus"></i> Add Combat Skill
                </button>
            </div>
        `, 'Add Combat Skill');
    },
    
    addCombatSkill() {
        const name = Utils.$('#new-skill-name')?.value.trim();
        const category = Utils.$('#new-skill-category')?.value;
        const level = parseInt(Utils.$('#new-skill-level')?.value) || 1;
        
        if (!name) {
            UI.toast('Please enter skill name', 'error');
            return;
        }
        
        let skills = App.storage.get('CustomCombatSkills') || this.defaultCombatSkills;
        
        if (!skills[category]) skills[category] = [];
        
        skills[category].push({
            id: Date.now(),
            name,
            level,
            category
        });
        
        App.storage.set('CustomCombatSkills', skills);
        UI.closeModal();
        this.loadCombatSkills();
        UI.toast('Combat skill added!', 'success');
    },
    
    deleteCombatSkill(category, id) {
        let skills = App.storage.get('CustomCombatSkills') || this.defaultCombatSkills;
        skills[category] = skills[category].filter(s => s.id !== id);
        App.storage.set('CustomCombatSkills', skills);
        this.loadCombatSkills();
        UI.toast('Combat skill deleted', 'info');
    },
    
    exportData() {
        const data = {
            version: 1,
            exportDate: new Date().toISOString(),
            profile: App.storage.get('Profile'),
            tasks: App.storage.get('Tasks'),
            habits: App.storage.get('Habits'),
            stats: App.storage.get('Stats'),
            quickTodos: App.storage.get('QuickTodos'),
            gamification: App.storage.get('gamification_v3'),
            customExercises: App.storage.get('CustomExercises'),
            customCombatSkills: App.storage.get('CustomCombatSkills'),
            notes: App.storage.get('Notes'),
            links: App.storage.get('Links'),
            courses: App.storage.get('Courses'),
            skills: App.storage.get('Skills')
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nova-mastery-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        UI.toast('Data exported successfully!', 'success');
    },
    
    importData(input) {
        const file = input.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.profile) App.storage.set('Profile', data.profile);
                if (data.tasks) App.storage.set('Tasks', data.tasks);
                if (data.habits) App.storage.set('Habits', data.habits);
                if (data.stats) App.storage.set('Stats', data.stats);
                if (data.quickTodos) App.storage.set('QuickTodos', data.quickTodos);
                if (data.gamification) App.storage.set('gamification_v3', data.gamification);
                if (data.customExercises) App.storage.set('CustomExercises', data.customExercises);
                if (data.customCombatSkills) App.storage.set('CustomCombatSkills', data.customCombatSkills);
                if (data.notes) App.storage.set('Notes', data.notes);
                if (data.links) App.storage.set('Links', data.links);
                if (data.courses) App.storage.set('Courses', data.courses);
                if (data.skills) App.storage.set('Skills', data.skills);
                
                this.loadProfile();
                this.loadExercises();
                this.loadCombatSkills();
                
                UI.toast('Data imported successfully!', 'success');
                setTimeout(() => location.reload(), 1000);
            } catch (err) {
                UI.toast('Invalid backup file', 'error');
            }
        };
        reader.readAsText(file);
    },
    
    confirmReset(type) {
        const messages = {
            tasks: { title: 'Reset Tasks & Habits', msg: 'This will clear all your tasks and habits. Your XP and level will be kept.', btn: 'Reset Tasks' },
            streaks: { title: 'Reset Streaks', msg: 'This will reset all your streaks and daily progress.', btn: 'Reset Streaks' },
            gamification: { title: 'Reset Gamification', msg: 'This will reset ALL XP, levels, and achievements. This cannot be undone!', btn: 'Reset Everything' },
            all: { title: 'Factory Reset', msg: 'This will DELETE ALL DATA including tasks, habits, notes, XP, and everything. This is IRREVERSIBLE!', btn: 'DELETE EVERYTHING' }
        };
        
        const config = messages[type];
        
        UI.modal(`
            <div style="text-align: center;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ef4444; margin-bottom: 20px;"></i>
                <h3>${config.title}</h3>
                <p style="margin: 20px 0; color: var(--text-secondary);">${config.msg}</p>
                <div style="display: flex; gap: 12px; justify-content: center;">
                    <button class="btn btn-secondary" onclick="UI.closeModal()">Cancel</button>
                    <button class="btn btn-danger" onclick="Profile.resetData('${type}')">${config.btn}</button>
                </div>
            </div>
        `, 'Confirm Reset');
    },
    
    resetData(type) {
        switch (type) {
            case 'tasks':
                App.state.tasks = [];
                App.state.habits = [];
                App.storage.set('Tasks', []);
                App.storage.set('Habits', []);
                Tasks.render?.();
                Habits.render?.();
                break;
                
            case 'streaks':
                App.state.stats.streak = 0;
                App.state.stats.weeklyProgress = [0, 0, 0, 0, 0, 0, 0];
                App.state.habits.forEach(h => {
                    h.completedDates = [];
                    h.streak = 0;
                });
                App.storage.set('Stats', App.state.stats);
                App.storage.set('Habits', App.state.habits);
                Habits.render?.();
                Dashboard.updateStats?.();
                break;
                
            case 'gamification':
                App.storage.set('gamification_v3', null);
                try { Gamification.init?.(); } catch(e) {}
                break;
                
            case 'all':
                localStorage.clear();
                sessionStorage.clear();
                setTimeout(() => location.reload(), 500);
                break;
        }
        
        UI.closeModal();
        UI.toast('Reset complete!', 'success');
        
        if (type !== 'all') {
            this.updateLevelProgress?.();
            Dashboard.updateStats?.();
            Dashboard.updateLevelDisplay?.();
        }
    }
};

// ============================================
// STREAK MANAGER
// ============================================
const StreakManager = {
    check() {
        const today = new Date().toDateString();
        const lastVisit = App.state.stats.lastVisit;
        
        if (lastVisit) {
            const lastDate = new Date(lastVisit);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastDate.toDateString() === yesterday.toDateString()) {
                App.state.stats.streak++;
            } else if (lastDate.toDateString() !== today) {
                App.state.stats.streak = 1;
            }
        } else {
            App.state.stats.streak = 1;
        }
        
        App.state.stats.lastVisit = today;
        App.storage.set('Stats', App.state.stats);
    }
};

// ============================================
// INITIALIZATION
// ============================================
function startApp() {
    console.log('NOVA: Starting...');
    
    // Hide loading screen completely
    var ls = document.getElementById('loading-screen');
    if (ls) {
        ls.style.display = 'none';
        ls.style.visibility = 'hidden';
        ls.style.pointerEvents = 'none';
        ls.style.opacity = '0';
    }
    
    // Check if Utils exists
    if (typeof Utils === 'undefined') {
        console.error('Utils not defined!');
        return;
    }
    
    // Check DOM elements
    console.log('Sidebar:', document.querySelector('.sidebar'));
    console.log('Nav links:', document.querySelectorAll('.sidebar-nav .nav-link').length);
    
    // Core modules
    try { ThemeManager.init(); console.log('Theme OK'); } catch(e) { console.log('Theme error:', e); }
    try { Navigation.init(); console.log('Nav OK'); } catch(e) { console.log('Nav error:', e); }
    try { Dashboard.init(); console.log('Dash OK'); } catch(e) { console.log('Dash error:', e); }
    try { Habits.init(); console.log('Habits OK'); } catch(e) { console.log('Habits error:', e); }
    try { Tasks.init(); console.log('Tasks OK'); } catch(e) { console.log('Tasks error:', e); }
    try { Pomodoro.init(); console.log('Pomodoro OK'); } catch(e) { console.log('Pomodoro error:', e); }
    try { Notes.init(); console.log('Notes OK'); } catch(e) { console.log('Notes error:', e); }
    try { Tools.init(); console.log('Tools OK'); } catch(e) { console.log('Tools error:', e); }
    try { AIChat.init(); console.log('AIChat OK'); } catch(e) { console.log('AIChat error:', e); }
    try { Analytics.init(); console.log('Analytics OK'); } catch(e) { console.log('Analytics error:', e); }
    try { Tabs.init(); console.log('Tabs OK'); } catch(e) { console.log('Tabs error:', e); }
    try { QuickActions.init(); console.log('QuickActions OK'); } catch(e) { console.log('QuickActions error:', e); }
    try { Nutrition.init(); console.log('Nutrition OK'); } catch(e) { console.log('Nutrition error:', e); }
    try { KnowledgeBase.init(); console.log('KnowledgeBase OK'); } catch(e) { console.log('KnowledgeBase error:', e); }
    try { LearningTracker.init(); console.log('Learning OK'); } catch(e) { console.log('Learning error:', e); }
    try { Gamification.init(); console.log('Gamification OK'); } catch(e) { console.log('Gamification error:', e); }
    try { AICoach.init(); console.log('AICoach OK'); } catch(e) { console.log('AICoach error:', e); }
    try { KnowledgeUI.init(); console.log('KnowledgeUI OK'); } catch(e) { console.log('KnowledgeUI error:', e); }
    try { ChallengesUI.init(); console.log('Challenges OK'); } catch(e) { console.log('Challenges error:', e); }
    try { Profile.init(); console.log('Profile OK'); } catch(e) { console.log('Profile error:', e); }
    
    console.log('NOVA: Ready!');
    
    // Background (delayed)
    setTimeout(function() {
        try { ThreeJSBackground.init(); } catch(e) {}
        try { Particles.init(); } catch(e) {}
    }, 1000);
}

// Start immediately when script loads
startApp();

// Make functions globally accessible
window.Dashboard = Dashboard;
window.Habits = Habits;
window.Tasks = Tasks;
window.Notes = Notes;
window.Analytics = Analytics;
window.Nutrition = Nutrition;
window.AdvancedAnalytics = AdvancedAnalytics;
window.Reports = Reports;
window.User = User;
window.KnowledgeBase = KnowledgeBase;
window.LearningTracker = LearningTracker;
window.Gamification = Gamification;
window.AICoach = AICoach;
window.DailyChallenges = DailyChallenges;
window.ChallengesUI = ChallengesUI;
window.KnowledgeUI = KnowledgeUI;
window.Profile = Profile;
