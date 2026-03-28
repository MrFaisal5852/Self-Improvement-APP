/**
 * NOVA Mastery Hub - Daily Challenges System
 * 5 Daily Challenges: 2 Fitness, 2 Knowledge, 1 Practice
 * Version 2.0
 */

const DailyChallenges = {
    challenges: [],
    completedChallenges: [],
    streak: 0,
    maxStreak: 0,
    totalPointsEarned: 0,

    fitnessChallenges: [
        { id: 'fit_1', title: 'Morning Run', description: 'Run 5km or 30 minutes outdoor', type: 'fitness', difficulty: 'medium', xp: 50 },
        { id: 'fit_2', title: 'HIIT Session', description: 'Complete a 20-minute high intensity interval training', type: 'fitness', difficulty: 'hard', xp: 60 },
        { id: 'fit_3', title: '100 Pushups', description: 'Complete 100 pushups throughout the day', type: 'fitness', difficulty: 'hard', xp: 55 },
        { id: 'fit_4', title: '10km Challenge', description: 'Run/walk 10km in a single session', type: 'fitness', difficulty: 'expert', xp: 100 },
        { id: 'fit_5', title: '500 Jump Rope', description: 'Complete 500 jump rope reps', type: 'fitness', difficulty: 'hard', xp: 60 },
        { id: 'fit_6', title: 'Plank Master', description: 'Hold plank position for 5 minutes total', type: 'fitness', difficulty: 'hard', xp: 55 },
        { id: 'fit_7', title: '50 Burpees', description: 'Complete 50 burpees throughout the day', type: 'fitness', difficulty: 'hard', xp: 60 },
        { id: 'fit_8', title: 'Stair Challenge', description: 'Climb 50 floors today', type: 'fitness', difficulty: 'hard', xp: 65 },
        { id: 'fit_9', title: 'Calf Raises', description: 'Complete 300 calf raises', type: 'fitness', difficulty: 'medium', xp: 45 },
        { id: 'fit_10', title: 'Pull-up Day', description: 'Complete 30 pull-ups throughout the day', type: 'fitness', difficulty: 'expert', xp: 80 },
        { id: 'fit_11', title: 'Squat Challenge', description: 'Complete 200 bodyweight squats', type: 'fitness', difficulty: 'hard', xp: 55 },
        { id: 'fit_12', title: 'Wall Sit', description: 'Hold wall sit for 10 minutes total', type: 'fitness', difficulty: 'expert', xp: 70 },
        { id: 'fit_13', title: 'Dips Challenge', description: 'Complete 100 tricep dips', type: 'fitness', difficulty: 'hard', xp: 55 },
        { id: 'fit_14', title: 'Lunge Walk', description: 'Walk 2km doing lunges', type: 'fitness', difficulty: 'hard', xp: 60 },
        { id: 'fit_15', title: 'Mountain Climbers', description: 'Complete 500 mountain climbers', type: 'fitness', difficulty: 'hard', xp: 55 },
        { id: 'fit_16', title: '7-Minute Workout', description: 'Complete 2 rounds of 7-minute workout', type: 'fitness', difficulty: 'medium', xp: 40 },
        { id: 'fit_17', title: 'Box Jumps', description: 'Complete 100 box jumps', type: 'fitness', difficulty: 'hard', xp: 60 },
        { id: 'fit_18', title: 'Bear Crawl', description: 'Crawl 1km bear crawl distance', type: 'fitness', difficulty: 'hard', xp: 65 },
        { id: 'fit_19', title: 'Handstand Practice', description: 'Practice handstand for 10 minutes', type: 'fitness', difficulty: 'expert', xp: 70 },
        { id: 'fit_20', title: 'Backflip Prep', description: 'Practice backflip progression for 30 minutes', type: 'fitness', difficulty: 'expert', xp: 85 },
        { id: 'fit_21', title: '25min Cardio', description: 'Complete 25 minutes of continuous cardio', type: 'fitness', difficulty: 'medium', xp: 45 },
        { id: 'fit_22', title: '50sit-ups', description: 'Complete 50 sit-ups', type: 'fitness', difficulty: 'medium', xp: 40 },
        { id: 'fit_23', title: 'Yoga Flow', description: 'Complete a 30-minute yoga session', type: 'fitness', difficulty: 'medium', xp: 50 },
        { id: 'fit_24', title: 'Swim 20 laps', description: 'Swim 20 laps in pool', type: 'fitness', difficulty: 'hard', xp: 70 },
        { id: 'fit_25', title: 'Cycle 15km', description: 'Cycle 15km today', type: 'fitness', difficulty: 'hard', xp: 65 },
        { id: 'fit_26', title: '100 Lunges', description: 'Complete 100 walking lunges', type: 'fitness', difficulty: 'hard', xp: 55 },
        { id: 'fit_27', title: 'Arm Circles', description: 'Do arm circles for 5 minutes', type: 'fitness', difficulty: 'easy', xp: 25 },
        { id: 'fit_28', title: 'Leg Raises', description: 'Complete 100 leg raises', type: 'fitness', difficulty: 'hard', xp: 50 },
        { id: 'fit_29', title: 'Rope Climb', description: 'Climb rope for 10 minutes', type: 'fitness', difficulty: 'expert', xp: 75 },
        { id: 'fit_30', title: 'Indian Pushups', description: 'Complete 30 diamond pushups', type: 'fitness', difficulty: 'hard', xp: 55 },
        { id: 'fit_31', title: 'Turkish Get-up', description: 'Practice Turkish get-up for 10 minutes', type: 'fitness', difficulty: 'expert', xp: 70 },
        { id: 'fit_32', title: 'Pistol Squats', description: 'Practice pistol squat progressions', type: 'fitness', difficulty: 'expert', xp: 80 },
        { id: 'fit_33', title: 'Rings Training', description: 'Train on gymnastic rings for 20 minutes', type: 'fitness', difficulty: 'expert', xp: 85 },
        { id: 'fit_34', title: 'Kettlebell Flow', description: 'Complete kettlebell complex for 15 minutes', type: 'fitness', difficulty: 'hard', xp: 65 },
        { id: 'fit_35', title: 'Atlas Stones', description: 'Lift heavy stones for 10 minutes', type: 'fitness', difficulty: 'expert', xp: 80 },
        { id: 'fit_36', title: 'Tire Flip', description: 'Flip a tire for 10 minutes', type: 'fitness', difficulty: 'hard', xp: 70 },
        { id: 'fit_37', title: 'Sled Push', description: 'Push sled for 400m', type: 'fitness', difficulty: 'hard', xp: 60 },
        { id: 'fit_38', title: 'Farmer Walk', description: 'Farmer walk with heavy weights for 5 minutes', type: 'fitness', difficulty: 'hard', xp: 55 },
        { id: 'fit_39', title: 'Sprint Intervals', description: '10x 30-second sprints', type: 'fitness', difficulty: 'expert', xp: 75 },
        { id: 'fit_40', title: 'Rucking', description: 'Walk 5km with weighted backpack', type: 'fitness', difficulty: 'hard', xp: 65 },
        { id: 'fit_41', title: 'Plyo Pushups', description: 'Complete 50 plyometric pushups', type: 'fitness', difficulty: 'hard', xp: 55 },
        { id: 'fit_42', title: 'Isometric Hold', description: 'Hold L-sit position for 3 minutes', type: 'fitness', difficulty: 'expert', xp: 70 },
        { id: 'fit_43', title: 'Clap Pushups', description: 'Complete 20 clap pushups', type: 'fitness', difficulty: 'expert', xp: 75 },
        { id: 'fit_44', title: 'Muscle-up Prep', description: 'Practice muscle-up transition for 15 min', type: 'fitness', difficulty: 'expert', xp: 80 },
        { id: 'fit_45', title: 'Levitation Pushups', description: 'Complete 15 archer pushups each side', type: 'fitness', difficulty: 'expert', xp: 70 },
        { id: 'fit_46', title: 'One Arm Pushup', description: 'Practice one arm pushup progression', type: 'fitness', difficulty: 'expert', xp: 75 },
        { id: 'fit_47', title: 'Human Flag Prep', description: 'Train human flag mechanics for 15 min', type: 'fitness', difficulty: 'expert', xp: 90 },
        { id: 'fit_48', title: 'Front Lever', description: 'Practice front lever progressions', type: 'fitness', difficulty: 'expert', xp: 85 },
        { id: 'fit_49', title: 'Iron Cross', description: 'Train iron cross on rings', type: 'fitness', difficulty: 'expert', xp: 95 },
        { id: 'fit_50', title: 'Planck Challenge', description: 'Hold planck for 30 minutes total', type: 'fitness', difficulty: 'expert', xp: 100 },
        { id: 'fit_51', title: 'Cold Shower', description: 'Take 5-minute cold shower', type: 'fitness', difficulty: 'easy', xp: 20 },
        { id: 'fit_52', title: 'No Sugar Day', description: 'Go 24 hours without sugar', type: 'fitness', difficulty: 'medium', xp: 35 },
        { id: 'fit_53', title: 'Meditate 20min', description: 'Meditate for 20 minutes', type: 'fitness', difficulty: 'medium', xp: 40 },
        { id: 'fit_54', title: 'Deep Breathing', description: 'Practice deep breathing for 15 minutes', type: 'fitness', difficulty: 'easy', xp: 25 },
        { id: 'fit_55', title: 'Sleep 8 Hours', description: 'Get full 8 hours of sleep', type: 'fitness', difficulty: 'medium', xp: 40 },
        { id: 'fit_56', title: 'No Phone 1hr', description: 'Stay off phone for 1 hour', type: 'fitness', difficulty: 'easy', xp: 25 },
        { id: 'fit_57', title: 'Walk 10k Steps', description: 'Hit 10,000 steps today', type: 'fitness', difficulty: 'medium', xp: 45 },
        { id: 'fit_58', title: 'Drink 4L Water', description: 'Drink 4 liters of water', type: 'fitness', difficulty: 'medium', xp: 35 },
        { id: 'fit_59', title: 'Fast 16 Hours', description: '16-hour intermittent fast', type: 'fitness', difficulty: 'medium', xp: 50 },
        { id: 'fit_60', title: 'Track Sleep', description: 'Track your sleep for 1 night', type: 'fitness', difficulty: 'easy', xp: 20 },
        { id: 'fit_61', title: 'Morning Sun', description: 'Get 15 min sunlight before 9am', type: 'fitness', difficulty: 'easy', xp: 25 },
        { id: 'fit_62', title: 'No Caffeine', description: 'Go 24 hours without caffeine', type: 'fitness', difficulty: 'medium', xp: 35 },
        { id: 'fit_63', title: 'Stretch 30min', description: 'Full body stretch for 30 minutes', type: 'fitness', difficulty: 'easy', xp: 30 },
        { id: 'fit_64', title: 'Foam Roll', description: 'Foam roll for 15 minutes', type: 'fitness', difficulty: 'easy', xp: 20 },
        { id: 'fit_65', title: 'Sauna Session', description: 'Spend 20 minutes in sauna', type: 'fitness', difficulty: 'medium', xp: 35 },
        { id: 'fit_66', title: 'Ice Bath', description: 'Take 3-minute cold plunge', type: 'fitness', difficulty: 'hard', xp: 50 },
        { id: 'fit_67', title: 'Zone 2 Cardio', description: '45 min in heart rate zone 2', type: 'fitness', difficulty: 'medium', xp: 45 },
        { id: 'fit_68', title: 'Max Pullups', description: 'Do max pullups in one set', type: 'fitness', difficulty: 'hard', xp: 50 },
        { id: 'fit_69', title: 'Max Pushups', description: 'Do max pushups in one set', type: 'fitness', difficulty: 'medium', xp: 40 },
        { id: 'fit_70', title: 'Farmers Walk', description: 'Farmers walk 100m with heavy weights', type: 'fitness', difficulty: 'hard', xp: 55 }
    ],

    knowledgeChallenges: [
        { id: 'know_1', title: 'Language Mechanics', description: 'Learn how language syntax works and explain to AI', type: 'knowledge', difficulty: 'hard', topic: 'Linguistics', xp: 75 },
        { id: 'know_2', title: 'Quantum Basics', description: 'Research quantum computing fundamentals and explain', type: 'knowledge', difficulty: 'expert', topic: 'Physics', xp: 90 },
        { id: 'know_3', title: 'Neural Networks', description: 'Learn about neural network architectures', type: 'knowledge', difficulty: 'hard', topic: 'AI/ML', xp: 80 },
        { id: 'know_4', title: 'Philosophy Deep Dive', description: 'Research one philosophical concept and explain it', type: 'knowledge', difficulty: 'medium', topic: 'Philosophy', xp: 60 },
        { id: 'know_5', title: 'Market Analysis', description: 'Research a market trend and analyze it', type: 'knowledge', difficulty: 'hard', topic: 'Business', xp: 70 },
        { id: 'know_6', title: 'Biochemistry Basics', description: 'Learn about cellular metabolism', type: 'knowledge', difficulty: 'hard', topic: 'Biology', xp: 80 },
        { id: 'know_7', title: 'Economics 101', description: 'Understand supply and demand deeply', type: 'knowledge', difficulty: 'medium', topic: 'Economics', xp: 60 },
        { id: 'know_8', title: 'History Pillar', description: 'Research a significant historical event', type: 'knowledge', difficulty: 'medium', topic: 'History', xp: 55 },
        { id: 'know_9', title: 'Psychology Study', description: 'Learn about cognitive biases', type: 'knowledge', difficulty: 'medium', topic: 'Psychology', xp: 60 },
        { id: 'know_10', title: 'Space Exploration', description: 'Research current space missions', type: 'knowledge', difficulty: 'medium', topic: 'Astronomy', xp: 55 },
        { id: 'know_11', title: 'Crypto Tech', description: 'Understand blockchain technology deeply', type: 'knowledge', difficulty: 'hard', topic: 'Technology', xp: 75 },
        { id: 'know_12', title: 'Climate Science', description: 'Learn about climate change mechanisms', type: 'knowledge', difficulty: 'hard', topic: 'Environment', xp: 70 },
        { id: 'know_13', title: 'Music Theory', description: 'Learn about music composition basics', type: 'knowledge', difficulty: 'medium', topic: 'Music', xp: 55 },
        { id: 'know_14', title: 'Art History', description: 'Research an art movement deeply', type: 'knowledge', difficulty: 'medium', topic: 'Art', xp: 55 },
        { id: 'know_15', title: 'Sociology Research', description: 'Understand social structures', type: 'knowledge', difficulty: 'medium', topic: 'Sociology', xp: 60 },
        { id: 'know_16', title: 'Cognitive Science', description: 'Learn about how mind works', type: 'knowledge', difficulty: 'hard', topic: 'Science', xp: 75 },
        { id: 'know_17', title: 'Math Foundations', description: 'Master a new mathematical concept', type: 'knowledge', difficulty: 'hard', topic: 'Mathematics', xp: 70 },
        { id: 'know_18', title: 'Anatomy Study', description: 'Learn about human body systems', type: 'knowledge', difficulty: 'hard', topic: 'Medicine', xp: 75 },
        { id: 'know_19', title: 'Rocket Science', description: 'Understand orbital mechanics', type: 'knowledge', difficulty: 'expert', topic: 'Engineering', xp: 95 },
        { id: 'know_20', title: 'Genetics 101', description: 'Learn about DNA and heredity', type: 'knowledge', difficulty: 'hard', topic: 'Biology', xp: 70 },
        { id: 'know_21', title: 'Game Theory', description: 'Learn Nash equilibrium and strategies', type: 'knowledge', difficulty: 'hard', topic: 'Mathematics', xp: 70 },
        { id: 'know_22', title: 'Relativity', description: 'Understand special relativity basics', type: 'knowledge', difficulty: 'hard', topic: 'Physics', xp: 80 },
        { id: 'know_23', title: 'Buddhism', description: 'Learn about Buddhist philosophy', type: 'knowledge', difficulty: 'medium', topic: 'Philosophy', xp: 55 },
        { id: 'know_24', title: 'Stoicism', description: 'Understand Stoic philosophy', type: 'knowledge', difficulty: 'medium', topic: 'Philosophy', xp: 55 },
        { id: 'know_25', title: 'Nietzsche', description: 'Research Nietzsche philosophy', type: 'knowledge', difficulty: 'hard', topic: 'Philosophy', xp: 65 },
        { id: 'know_26', title: 'Marketing Funnel', description: 'Learn AIDA marketing model', type: 'knowledge', difficulty: 'medium', topic: 'Business', xp: 50 },
        { id: 'know_27', title: 'Startup Secrets', description: 'Research startup funding stages', type: 'knowledge', difficulty: 'hard', topic: 'Business', xp: 65 },
        { id: 'know_28', title: 'SEO Basics', description: 'Learn search engine optimization', type: 'knowledge', difficulty: 'medium', topic: 'Marketing', xp: 55 },
        { id: 'know_29', title: 'Copywriting', description: 'Learn persuasive writing techniques', type: 'knowledge', difficulty: 'medium', topic: 'Marketing', xp: 50 },
        { id: 'know_30', title: 'Stock Market', description: 'Understand stock market basics', type: 'knowledge', difficulty: 'medium', topic: 'Finance', xp: 55 },
        { id: 'know_31', title: 'Cryptography', description: 'Learn encryption fundamentals', type: 'knowledge', difficulty: 'hard', topic: 'Computer Science', xp: 75 },
        { id: 'know_32', title: 'Operating Systems', description: 'Understand OS kernel concepts', type: 'knowledge', difficulty: 'hard', topic: 'Computer Science', xp: 70 },
        { id: 'know_33', title: 'Computer Networks', description: 'Learn TCP/IP protocols', type: 'knowledge', difficulty: 'hard', topic: 'Computer Science', xp: 70 },
        { id: 'know_34', title: 'Database Design', description: 'Learn normalization forms', type: 'knowledge', difficulty: 'medium', topic: 'Database', xp: 55 },
        { id: 'know_35', title: 'API Architecture', description: 'Understand REST vs GraphQL', type: 'knowledge', difficulty: 'medium', topic: 'Programming', xp: 55 },
        { id: 'know_36', title: 'Microservices', description: 'Learn microservices patterns', type: 'knowledge', difficulty: 'hard', topic: 'Architecture', xp: 70 },
        { id: 'know_37', title: 'Docker Basics', description: 'Understand containerization', type: 'knowledge', difficulty: 'medium', topic: 'DevOps', xp: 55 },
        { id: 'know_38', title: 'Kubernetes', description: 'Learn container orchestration', type: 'knowledge', difficulty: 'hard', topic: 'DevOps', xp: 70 },
        { id: 'know_39', title: 'CI/CD Pipeline', description: 'Understand continuous integration', type: 'knowledge', difficulty: 'medium', topic: 'DevOps', xp: 55 },
        { id: 'know_40', title: 'AWS Services', description: 'Learn core AWS services', type: 'knowledge', difficulty: 'hard', topic: 'Cloud', xp: 70 },
        { id: 'know_41', title: 'Neural Nets', description: 'Understand backpropagation', type: 'knowledge', difficulty: 'expert', topic: 'AI/ML', xp: 85 },
        { id: 'know_42', title: 'LLMs', description: 'Learn large language model basics', type: 'knowledge', difficulty: 'hard', topic: 'AI/ML', xp: 80 },
        { id: 'know_43', title: 'Computer Vision', description: 'Learn CNN architectures', type: 'knowledge', difficulty: 'hard', topic: 'AI/ML', xp: 80 },
        { id: 'know_44', title: 'NLP', description: 'Understand natural language processing', type: 'knowledge', difficulty: 'hard', topic: 'AI/ML', xp: 75 },
        { id: 'know_45', title: 'Reinforcement Learning', description: 'Learn Q-learning basics', type: 'knowledge', difficulty: 'expert', topic: 'AI/ML', xp: 85 },
        { id: 'know_46', title: 'Evolution Theory', description: 'Understand natural selection', type: 'knowledge', difficulty: 'medium', topic: 'Biology', xp: 55 },
        { id: 'know_47', title: 'Cell Biology', description: 'Learn about cell organelles', type: 'knowledge', difficulty: 'medium', topic: 'Biology', xp: 55 },
        { id: 'know_48', title: 'Microbiology', description: 'Understand bacteria and viruses', type: 'knowledge', difficulty: 'hard', topic: 'Biology', xp: 70 },
        { id: 'know_49', title: 'Neuroscience', description: 'Learn about brain structures', type: 'knowledge', difficulty: 'hard', topic: 'Biology', xp: 75 },
        { id: 'know_50', title: 'Immunology', description: 'Understand immune system', type: 'knowledge', difficulty: 'hard', topic: 'Medicine', xp: 75 },
        { id: 'know_51', title: 'Pharmacology', description: 'Learn drug mechanisms', type: 'knowledge', difficulty: 'expert', topic: 'Medicine', xp: 80 },
        { id: 'know_52', title: 'Statistics', description: 'Understand probability distributions', type: 'knowledge', difficulty: 'hard', topic: 'Mathematics', xp: 70 },
        { id: 'know_53', title: 'Linear Algebra', description: 'Master matrix operations', type: 'knowledge', difficulty: 'hard', topic: 'Mathematics', xp: 70 },
        { id: 'know_54', title: 'Calculus', description: 'Understand derivatives and integrals', type: 'knowledge', difficulty: 'hard', topic: 'Mathematics', xp: 70 },
        { id: 'know_55', title: 'Number Theory', description: 'Learn prime number concepts', type: 'knowledge', difficulty: 'hard', topic: 'Mathematics', xp: 65 },
        { id: 'know_56', title: 'Graph Theory', description: 'Understand graph algorithms', type: 'knowledge', difficulty: 'hard', topic: 'Mathematics', xp: 70 },
        { id: 'know_57', title: 'Cosmology', description: 'Learn about universe origins', type: 'knowledge', difficulty: 'hard', topic: 'Astronomy', xp: 75 },
        { id: 'know_58', title: 'Black Holes', description: 'Understand black hole physics', type: 'knowledge', difficulty: 'expert', topic: 'Astronomy', xp: 85 },
        { id: 'know_59', title: 'Particle Physics', description: 'Learn about subatomic particles', type: 'knowledge', difficulty: 'expert', topic: 'Physics', xp: 90 },
        { id: 'know_60', title: 'Thermodynamics', description: 'Understand entropy and energy', type: 'knowledge', difficulty: 'hard', topic: 'Physics', xp: 75 },
        { id: 'know_61', title: 'Electromagnetism', description: 'Learn Maxwell equations', type: 'knowledge', difficulty: 'hard', topic: 'Physics', xp: 75 },
        { id: 'know_62', title: 'Organic Chemistry', description: 'Learn carbon chemistry basics', type: 'knowledge', difficulty: 'hard', topic: 'Chemistry', xp: 70 },
        { id: 'know_63', title: 'Periodic Table', description: 'Understand element properties', type: 'knowledge', difficulty: 'medium', topic: 'Chemistry', xp: 50 },
        { id: 'know_64', title: 'Bioinformatics', description: 'Learn computational biology', type: 'knowledge', difficulty: 'expert', topic: 'Biology', xp: 85 },
        { id: 'know_65', title: 'Robotics', description: 'Understand robot kinematics', type: 'knowledge', difficulty: 'hard', topic: 'Engineering', xp: 75 },
        { id: 'know_66', title: '3D Printing', description: 'Learn additive manufacturing', type: 'knowledge', difficulty: 'medium', topic: 'Engineering', xp: 55 },
        { id: 'know_67', title: 'IoT', description: 'Understand Internet of Things', type: 'knowledge', difficulty: 'medium', topic: 'Technology', xp: 55 },
        { id: 'know_68', title: 'Cybersecurity', description: 'Learn about attack vectors', type: 'knowledge', difficulty: 'hard', topic: 'Security', xp: 70 },
        { id: 'know_69', title: 'Penetration Testing', description: 'Understand ethical hacking', type: 'knowledge', difficulty: 'expert', topic: 'Security', xp: 85 },
        { id: 'know_70', title: 'Social Engineering', description: 'Learn human hacking techniques', type: 'knowledge', difficulty: 'medium', topic: 'Security', xp: 55 }
    ],

    practiceChallenges: [
        { id: 'prac_1', title: 'Code Mastery', description: 'Complete 5 LeetCode medium problems', type: 'practice', difficulty: 'expert', topic: 'Programming', xp: 100 },
        { id: 'prac_2', title: 'Speed Math', description: 'Solve 100 math problems in under 30 minutes', type: 'practice', difficulty: 'hard', topic: 'Mathematics', xp: 70 },
        { id: 'prac_3', title: 'Touch Typing', description: 'Practice typing for 30 minutes without looking', type: 'practice', difficulty: 'medium', topic: 'Skills', xp: 50 },
        { id: 'prac_4', title: 'Memory Palace', description: 'Learn and memorize 20 items using memory technique', type: 'practice', difficulty: 'hard', topic: 'Memory', xp: 65 },
        { id: 'prac_5', title: 'Algorithm Design', description: 'Implement 3 sorting algorithms from scratch', type: 'practice', difficulty: 'expert', topic: 'Programming', xp: 90 },
        { id: 'prac_6', title: 'Debate Practice', description: 'Practice argumentation for 30 minutes', type: 'practice', difficulty: 'medium', topic: 'Communication', xp: 55 },
        { id: 'prac_7', title: 'Presentation', description: 'Record and review a 5-minute presentation', type: 'practice', difficulty: 'medium', topic: 'Communication', xp: 55 },
        { id: 'prac_8', title: 'Code Review', description: 'Review 3 open source PRs on GitHub', type: 'practice', difficulty: 'hard', topic: 'Programming', xp: 70 },
        { id: 'prac_9', title: 'System Design', description: 'Design a system architecture for an app', type: 'practice', difficulty: 'expert', topic: 'Programming', xp: 95 },
        { id: 'prac_10', title: 'Debug Master', description: 'Find and fix 5 bugs in any codebase', type: 'practice', difficulty: 'hard', topic: 'Programming', xp: 75 },
        { id: 'prac_11', title: 'API Design', description: 'Design a RESTful API from scratch', type: 'practice', difficulty: 'hard', topic: 'Programming', xp: 80 },
        { id: 'prac_12', title: 'Data Structures', description: 'Implement linked list, tree, graph from scratch', type: 'practice', difficulty: 'expert', topic: 'Programming', xp: 100 },
        { id: 'prac_13', title: 'SQL Mastery', description: 'Solve 10 complex SQL queries', type: 'practice', difficulty: 'hard', topic: 'Database', xp: 75 },
        { id: 'prac_14', title: 'Shell Scripting', description: 'Write 3 useful shell scripts', type: 'practice', difficulty: 'medium', topic: 'Programming', xp: 60 },
        { id: 'prac_15', title: 'Git Mastery', description: 'Learn 5 advanced git commands and use them', type: 'practice', difficulty: 'medium', topic: 'Programming', xp: 55 },
        { id: 'prac_16', title: 'Regex Challenge', description: 'Solve 10 regex puzzles', type: 'practice', difficulty: 'medium', topic: 'Programming', xp: 55 },
        { id: 'prac_17', title: 'Design Patterns', description: 'Implement 3 design patterns', type: 'practice', difficulty: 'hard', topic: 'Programming', xp: 80 },
        { id: 'prac_18', title: 'Testing Skills', description: 'Write 20 unit tests', type: 'practice', difficulty: 'medium', topic: 'Programming', xp: 60 },
        { id: 'prac_19', title: 'Code Golf', description: 'Solve a problem in minimum lines of code', type: 'practice', difficulty: 'hard', topic: 'Programming', xp: 70 },
        { id: 'prac_20', title: 'Refactor Challenge', description: 'Refactor 100 lines of legacy code', type: 'practice', difficulty: 'medium', topic: 'Programming', xp: 60 },
        { id: 'prac_21', title: 'Python Script', description: 'Write a useful Python script from scratch', type: 'practice', difficulty: 'medium', topic: 'Programming', xp: 55 },
        { id: 'prac_22', title: 'React Component', description: 'Build a reusable React component', type: 'practice', difficulty: 'hard', topic: 'Programming', xp: 70 },
        { id: 'prac_23', title: 'API Integration', description: 'Integrate with 3 different APIs', type: 'practice', difficulty: 'hard', topic: 'Programming', xp: 75 },
        { id: 'prac_24', title: 'Dockerize App', description: 'Dockerize an application', type: 'practice', difficulty: 'hard', topic: 'DevOps', xp: 70 },
        { id: 'prac_25', title: 'CI/CD Pipeline', description: 'Set up a complete CI/CD pipeline', type: 'practice', difficulty: 'expert', topic: 'DevOps', xp: 85 },
        { id: 'prac_26', title: 'Deploy to Cloud', description: 'Deploy an app to AWS/Vercel', type: 'practice', difficulty: 'medium', topic: 'Cloud', xp: 60 },
        { id: 'prac_27', title: 'Write Blog Post', description: 'Write a technical blog post', type: 'practice', difficulty: 'medium', topic: 'Writing', xp: 50 },
        { id: 'prac_28', title: 'Read Paper', description: 'Read and summarize a research paper', type: 'practice', difficulty: 'hard', topic: 'Research', xp: 70 },
        { id: 'prac_29', title: 'Teach Concept', description: 'Explain a concept to someone else', type: 'practice', difficulty: 'medium', topic: 'Teaching', xp: 45 },
        { id: 'prac_30', title: 'Code Interview', description: 'Practice 3 mock coding interviews', type: 'practice', difficulty: 'hard', topic: 'Interview', xp: 80 },
        { id: 'prac_31', title: 'Vim Mastery', description: 'Use only Vim for 2 hours', type: 'practice', difficulty: 'hard', topic: 'Tools', xp: 65 },
        { id: 'prac_32', title: 'Emacs Mastery', description: 'Use only Emacs for 2 hours', type: 'practice', difficulty: 'hard', topic: 'Tools', xp: 65 },
        { id: 'prac_33', title: 'Terminal Challenge', description: 'Complete tasks using only terminal', type: 'practice', difficulty: 'medium', topic: 'Tools', xp: 50 },
        { id: 'prac_34', title: 'Markdown Writing', description: 'Write documentation in Markdown', type: 'practice', difficulty: 'easy', topic: 'Writing', xp: 35 },
        { id: 'prac_35', title: 'LaTeX Document', description: 'Create a document in LaTeX', type: 'practice', difficulty: 'medium', topic: 'Writing', xp: 50 },
        { id: 'prac_36', title: 'Graph Drawing', description: 'Draw architecture diagrams', type: 'practice', difficulty: 'easy', topic: 'Design', xp: 35 },
        { id: 'prac_37', title: 'Figma Design', description: 'Design UI in Figma for 1 hour', type: 'practice', difficulty: 'medium', topic: 'Design', xp: 50 },
        { id: 'prac_38', title: 'CSS Art', description: 'Create art using only CSS', type: 'practice', difficulty: 'hard', topic: 'Programming', xp: 65 },
        { id: 'prac_39', title: 'Animation', description: 'Create CSS animation from scratch', type: 'practice', difficulty: 'medium', topic: 'Programming', xp: 55 },
        { id: 'prac_40', title: 'Game Dev', description: 'Build a simple browser game', type: 'practice', difficulty: 'expert', topic: 'Programming', xp: 90 },
        { id: 'prac_41', title: 'Mobile App', description: 'Build a simple mobile app', type: 'practice', difficulty: 'expert', topic: 'Programming', xp: 95 },
        { id: 'prac_42', title: 'REST API', description: 'Build a REST API from scratch', type: 'practice', difficulty: 'hard', topic: 'Programming', xp: 80 },
        { id: 'prac_43', title: 'GraphQL API', description: 'Build a GraphQL API', type: 'practice', difficulty: 'hard', topic: 'Programming', xp: 80 },
        { id: 'prac_44', title: 'WebSocket', description: 'Implement real-time chat', type: 'practice', difficulty: 'hard', topic: 'Programming', xp: 75 },
        { id: 'prac_45', title: 'Authentication', description: 'Implement JWT auth system', type: 'practice', difficulty: 'hard', topic: 'Programming', xp: 75 },
        { id: 'prac_46', title: 'Payment Integration', description: 'Integrate Stripe payment', type: 'practice', difficulty: 'expert', topic: 'Programming', xp: 85 },
        { id: 'prac_47', title: 'Testing E2E', description: 'Write E2E tests for an app', type: 'practice', difficulty: 'hard', topic: 'Testing', xp: 70 },
        { id: 'prac_48', title: 'Load Testing', description: 'Perform load testing on app', type: 'practice', difficulty: 'hard', topic: 'DevOps', xp: 70 },
        { id: 'prac_49', title: 'Security Audit', description: 'Audit code for security issues', type: 'practice', difficulty: 'expert', topic: 'Security', xp: 90 },
        { id: 'prac_50', title: 'Performance Audit', description: 'Audit app performance', type: 'practice', difficulty: 'hard', topic: 'DevOps', xp: 75 },
        { id: 'prac_51', title: 'Read 50 Pages', description: 'Read 50 pages of a technical book', type: 'practice', difficulty: 'medium', topic: 'Reading', xp: 40 },
        { id: 'prac_52', title: 'Watch Tutorial', description: 'Complete 2-hour tutorial', type: 'practice', difficulty: 'easy', topic: 'Learning', xp: 30 },
        { id: 'prac_53', title: 'Take Notes', description: 'Write detailed notes on a topic', type: 'practice', difficulty: 'medium', topic: 'Learning', xp: 40 },
        { id: 'prac_54', title: 'Teach Online', description: 'Create a 10-minute tutorial video', type: 'practice', difficulty: 'hard', topic: 'Teaching', xp: 70 },
        { id: 'prac_55', title: 'Pair Programming', description: 'Pair program for 1 hour', type: 'practice', difficulty: 'medium', topic: 'Collaboration', xp: 45 },
        { id: 'prac_56', title: 'Open Source', description: 'Contribute to open source', type: 'practice', difficulty: 'hard', topic: 'Collaboration', xp: 75 },
        { id: 'prac_57', title: 'Mentor', description: 'Mentor someone for 1 hour', type: 'practice', difficulty: 'medium', topic: 'Teaching', xp: 50 },
        { id: 'prac_58', title: 'Community Help', description: 'Answer 5 Stack Overflow questions', type: 'practice', difficulty: 'medium', topic: 'Community', xp: 45 },
        { id: 'prac_59', title: 'Bug Report', description: 'Write a detailed bug report', type: 'practice', difficulty: 'easy', topic: 'Process', xp: 30 },
        { id: 'prac_60', title: 'Technical Spec', description: 'Write a technical specification', type: 'practice', difficulty: 'hard', topic: 'Writing', xp: 70 },
        { id: 'prac_61', title: 'Speed Reading', description: 'Read a 20-page article in 10 min', type: 'practice', difficulty: 'medium', topic: 'Skills', xp: 45 },
        { id: 'prac_62', title: 'Blind Typing', description: 'Type 100 words without errors', type: 'practice', difficulty: 'medium', topic: 'Skills', xp: 40 },
        { id: 'prac_63', title: 'Mental Math', description: 'Calculate 50 problems mentally', type: 'practice', difficulty: 'hard', topic: 'Mathematics', xp: 55 },
        { id: 'prac_64', title: 'Sketching', description: 'Sketch for 30 minutes', type: 'practice', difficulty: 'easy', topic: 'Art', xp: 30 },
        { id: 'prac_65', title: 'Public Speaking', description: 'Speak for 5 minutes without notes', type: 'practice', difficulty: 'hard', topic: 'Communication', xp: 65 },
        { id: 'prac_66', title: 'Cold Call', description: 'Make 5 cold calls', type: 'practice', difficulty: 'expert', topic: 'Sales', xp: 80 },
        { id: 'prac_67', title: 'Negotiation', description: 'Practice negotiation scenarios', type: 'practice', difficulty: 'hard', topic: 'Business', xp: 70 },
        { id: 'prac_68', title: 'Storytelling', description: 'Tell a 5-minute story', type: 'practice', difficulty: 'medium', topic: 'Communication', xp: 50 },
        { id: 'prac_69', title: 'Active Listening', description: 'Practice listening for 30 minutes', type: 'practice', difficulty: 'easy', topic: 'Skills', xp: 25 },
        { id: 'prac_70', title: 'Journaling', description: 'Write in journal for 15 minutes', type: 'practice', difficulty: 'easy', topic: 'Reflection', xp: 25 },
        { id: 'prac_71', title: 'Meditation', description: 'Meditate for 30 minutes', type: 'practice', difficulty: 'medium', topic: 'Wellness', xp: 40 },
        { id: 'prac_72', title: 'Visualization', description: 'Practice visualization for 15 min', type: 'practice', difficulty: 'easy', topic: 'Mindset', xp: 25 },
        { id: 'prac_73', title: 'Goal Setting', description: 'Write down 10 goals for next 90 days', type: 'practice', difficulty: 'medium', topic: 'Planning', xp: 45 },
        { id: 'prac_74', title: 'Review Goals', description: 'Review and update your goals', type: 'practice', difficulty: 'easy', topic: 'Planning', xp: 30 },
        { id: 'prac_75', title: 'Time Audit', description: 'Audit how you spent last 3 days', type: 'practice', difficulty: 'medium', topic: 'Productivity', xp: 40 },
        { id: 'prac_76', title: 'Weekly Review', description: 'Do a complete weekly review', type: 'practice', difficulty: 'medium', topic: 'Productivity', xp: 50 },
        { id: 'prac_77', title: 'Inbox Zero', description: 'Achieve inbox zero', type: 'practice', difficulty: 'hard', topic: 'Productivity', xp: 55 },
        { id: 'prac_78', title: 'No Social Media', description: 'Stay off social media for 24 hours', type: 'practice', difficulty: 'medium', topic: 'Focus', xp: 40 },
        { id: 'prac_79', title: 'Deep Work', description: '3 hours of uninterrupted deep work', type: 'practice', difficulty: 'hard', topic: 'Focus', xp: 70 },
        { id: 'prac_80', title: 'Pomodoro', description: 'Complete 8 pomodoro sessions', type: 'practice', difficulty: 'medium', topic: 'Focus', xp: 50 }
    ],

    init() {
        this.loadProgress();
        this.checkAndGenerateDailyChallenges();
        console.log('[Challenges] Daily challenges loaded');
    },

    loadProgress() {
        const saved = Storage.get('challengeProgress', {});
        this.completedChallenges = saved.completedChallenges || [];
        this.streak = saved.streak || 0;
        this.maxStreak = saved.maxStreak || 0;
        this.totalPointsEarned = saved.totalPointsEarned || 0;
    },

    saveProgress() {
        Storage.set('challengeProgress', {
            completedChallenges: this.completedChallenges,
            streak: this.streak,
            maxStreak: this.maxStreak,
            totalPointsEarned: this.totalPointsEarned
        });
    },

    getTodayKey() {
        return 'challenges_' + new Date().toISOString().split('T')[0];
    },

    checkAndGenerateDailyChallenges() {
        const todayKey = this.getTodayKey();
        const savedChallenges = Storage.get(todayKey);

        if (savedChallenges) {
            this.challenges = savedChallenges;
        } else {
            this.generateDailyChallenges();
        }
    },

    generateDailyChallenges() {
        const shuffled = {
            fitness: this.shuffleArray([...this.fitnessChallenges]),
            knowledge: this.shuffleArray([...this.knowledgeChallenges]),
            practice: this.shuffleArray([...this.practiceChallenges])
        };

        this.challenges = [
            { ...shuffled.fitness[0], category: 'fitness', status: 'pending', completedAt: null },
            { ...shuffled.fitness[1], category: 'fitness', status: 'pending', completedAt: null },
            { ...shuffled.knowledge[0], category: 'knowledge', status: 'pending', completedAt: null },
            { ...shuffled.knowledge[1], category: 'knowledge', status: 'pending', completedAt: null },
            { ...shuffled.practice[0], category: 'practice', status: 'pending', completedAt: null }
        ];

        const todayKey = this.getTodayKey();
        Storage.set(todayKey, this.challenges);
    },

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    getChallenges() {
        return this.challenges;
    },

    completeChallenge(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (!challenge || challenge.status === 'completed') return null;

        challenge.status = 'completed';
        challenge.completedAt = Date.now();

        const xpEarned = challenge.xp || 50;
        this.totalPointsEarned += xpEarned;

        const todayKey = this.getTodayKey();
        Storage.set(todayKey, this.challenges);

        this.updateStreak();

        Gamification.addXP(xpEarned, 'challenge');
        if (typeof Dashboard !== 'undefined') Dashboard.updateLevelDisplay();

        this.completedChallenges.push({
            id: challengeId,
            completedAt: Date.now(),
            xpEarned
        });
        this.saveProgress();

        return {
            success: true,
            xpEarned,
            totalCompleted: this.getCompletedCount(),
            totalChallenges: 5,
            streak: this.streak
        };
    },

    updateStreak() {
        const completed = this.getCompletedCount();
        if (completed === 5) {
            this.streak++;
            if (this.streak > this.maxStreak) {
                this.maxStreak = this.streak;
            }
        }
        this.saveProgress();
    },

    getCompletedCount() {
        return this.challenges.filter(c => c.status === 'completed').length;
    },

    getProgress() {
        const completed = this.getCompletedCount();
        return {
            challenges: this.challenges,
            completed: completed,
            total: 5,
            percentage: Math.round((completed / 5) * 100),
            streak: this.streak,
            maxStreak: this.maxStreak,
            totalPointsEarned: this.totalPointsEarned,
            allCompleted: completed === 5
        };
    },

    getDifficultyColor(difficulty) {
        const colors = {
            easy: '#22c55e',
            medium: '#eab308',
            hard: '#f97316',
            expert: '#ef4444'
        };
        return colors[difficulty] || '#a855f7';
    },

    getCategoryIcon(category) {
        const icons = {
            fitness: 'fa-running',
            knowledge: 'fa-brain',
            practice: 'fa-code'
        };
        return icons[category] || 'fa-trophy';
    }
};

DailyChallenges.init();

// Make globally accessible
window.DailyChallenges = DailyChallenges;
