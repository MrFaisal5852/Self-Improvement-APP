/**
 * NOVA Mastery Hub - Knowledge Module
 * Knowledge Links & Learning Resources Manager
 * Version 2.0
 */

const KnowledgeBase = {
    links: [],
    categories: ['Programming', 'Fitness', 'Languages', 'Business', 'Design', 'Science', 'Other'],
    tags: [],

    init() {
        this.loadLinks();
        console.log('[Knowledge] Loaded', this.links.length, 'links');
    },

    loadLinks() {
        this.links = Storage.get('knowledgeLinks', []);
    },

    saveLinks() {
        Storage.set('knowledgeLinks', this.links);
    },

    addLink(linkData) {
        const newLink = {
            id: 'link_' + Date.now(),
            title: linkData.title || 'Untitled Link',
            url: linkData.url || '',
            description: linkData.description || '',
            category: linkData.category || 'Other',
            tags: linkData.tags || [],
            favicon: this.getFavicon(linkData.url),
            visits: 0,
            rating: 0,
            notes: '',
            createdAt: Date.now(),
            lastVisited: null
        };

        this.links.unshift(newLink);
        this.saveLinks();
        
        if (linkData.tags) {
            linkData.tags.forEach(tag => {
                if (!this.tags.includes(tag)) this.tags.push(tag);
            });
        }

        return newLink;
    },

    updateLink(id, updates) {
        const index = this.links.findIndex(l => l.id === id);
        if (index !== -1) {
            this.links[index] = { ...this.links[index], ...updates };
            this.saveLinks();
            return this.links[index];
        }
        return null;
    },

    deleteLink(id) {
        this.links = this.links.filter(l => l.id !== id);
        this.saveLinks();
    },

    getLink(id) {
        return this.links.find(l => l.id === id);
    },

    getLinksByCategory(category) {
        if (category === 'all') return this.links;
        return this.links.filter(l => l.category === category);
    },

    getLinksByTag(tag) {
        return this.links.filter(l => l.tags.includes(tag));
    },

    searchLinks(query) {
        if (!query) return this.links;
        const lower = query.toLowerCase();
        return this.links.filter(l => 
            l.title.toLowerCase().includes(lower) ||
            l.description.toLowerCase().includes(lower) ||
            l.tags.some(t => t.toLowerCase().includes(lower))
        );
    },

    incrementVisit(id) {
        const link = this.getLink(id);
        if (link) {
            link.visits++;
            link.lastVisited = Date.now();
            this.saveLinks();
        }
    },

    rateLink(id, rating) {
        const link = this.getLink(id);
        if (link) {
            link.rating = rating;
            this.saveLinks();
        }
    },

    getAllTags() {
        const tagSet = new Set();
        this.links.forEach(link => {
            link.tags.forEach(tag => tagSet.add(tag));
        });
        return Array.from(tagSet);
    },

    getStats() {
        return {
            total: this.links.length,
            categories: this.links.reduce((acc, l) => {
                acc[l.category] = (acc[l.category] || 0) + 1;
                return acc;
            }, {}),
            mostVisited: [...this.links].sort((a, b) => b.visits - a.visits).slice(0, 5),
            recent: this.links.slice(0, 5)
        };
    },

    getFavicon(url) {
        try {
            const domain = new URL(url).hostname;
            return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
        } catch {
            return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23a855f7"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>';
        }
    },

    exportLinks() {
        return JSON.stringify(this.links, null, 2);
    },

    importLinks(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            if (Array.isArray(imported)) {
                this.links = [...imported, ...this.links];
                this.saveLinks();
                return { success: true, count: imported.length };
            }
            return { success: false, message: 'Invalid format' };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }
};

// Learning Progress Tracker
const LearningTracker = {
    courses: [],
    books: [],
    currentSkills: [],

    init() {
        this.courses = Storage.get('learningCourses', []);
        this.books = Storage.get('learningBooks', []);
        this.currentSkills = Storage.get('currentSkills', []);
    },

    addCourse(course) {
        const newCourse = {
            id: 'course_' + Date.now(),
            title: course.title,
            url: course.url,
            platform: course.platform,
            category: course.category,
            progress: 0,
            totalLessons: course.totalLessons || 0,
            completedLessons: 0,
            status: 'in_progress',
            startedAt: Date.now(),
            lastStudied: Date.now(),
            notes: ''
        };
        this.courses.push(newCourse);
        Storage.set('learningCourses', this.courses);
        return newCourse;
    },

    updateCourseProgress(id, progress) {
        const course = this.courses.find(c => c.id === id);
        if (course) {
            course.progress = Math.min(100, Math.max(0, progress));
            course.lastStudied = Date.now();
            if (course.progress >= 100) {
                course.status = 'completed';
                course.completedAt = Date.now();
            }
            Storage.set('learningCourses', this.courses);
        }
    },

    getCourses(status = null) {
        if (status) return this.courses.filter(c => c.status === status);
        return this.courses;
    },

    addBook(book) {
        const newBook = {
            id: 'book_' + Date.now(),
            title: book.title,
            author: book.author,
            totalPages: book.totalPages || 0,
            currentPage: 0,
            progress: 0,
            status: 'reading',
            startedAt: Date.now()
        };
        this.books.push(newBook);
        Storage.set('learningBooks', this.books);
        return newBook;
    },

    updateBookProgress(id, page) {
        const book = this.books.find(b => b.id === id);
        if (book) {
            book.currentPage = Math.min(book.totalPages, Math.max(0, page));
            book.progress = Math.round((book.currentPage / book.totalPages) * 100);
            Storage.set('learningBooks', this.books);
        }
    },

    getBooks(status = null) {
        if (status) return this.books.filter(b => b.status === status);
        return this.books;
    },

    addSkill(skill) {
        const newSkill = {
            id: 'skill_' + Date.now(),
            name: skill.name,
            category: skill.category,
            level: 1,
            xp: 0,
            xpToNextLevel: 100,
            milestones: [],
            createdAt: Date.now()
        };
        this.currentSkills.push(newSkill);
        Storage.set('currentSkills', this.currentSkills);
        return newSkill;
    },

    addSkillXP(skillId, xp) {
        const skill = this.currentSkills.find(s => s.id === skillId);
        if (skill) {
            skill.xp += xp;
            if (skill.xp >= skill.xpToNextLevel) {
                skill.level++;
                skill.xp -= skill.xpToNextLevel;
                skill.xpToNextLevel = Math.round(skill.xpToNextLevel * 1.2);
            }
            Storage.set('currentSkills', this.currentSkills);
        }
    },

    getSkills() {
        return this.currentSkills;
    },

    getLearningStats() {
        const inProgress = this.courses.filter(c => c.status === 'in_progress').length;
        const completed = this.courses.filter(c => c.status === 'completed').length;
        const booksReading = this.books.filter(b => b.status === 'reading').length;
        
        return {
            courses: { total: this.courses.length, inProgress, completed },
            books: { total: this.books.length, reading: booksReading },
            skills: this.currentSkills.length
        };
    }
};

KnowledgeBase.init();
LearningTracker.init();

// Legacy alias for compatibility
var Knowledge = KnowledgeBase;

// Make globally accessible
window.LearningTracker = LearningTracker;
window.KnowledgeBase = KnowledgeBase;
window.Knowledge = Knowledge;
