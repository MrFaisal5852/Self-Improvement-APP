/**
 * NOVA Mastery Hub - Nutrition Module
 * Comprehensive Food Database (200+ Items)
 * Version 2.0
 */

const NutritionDB = {
    foods: [],
    
    init() {
        this.loadFoods();
        console.log('[NutritionDB] Loaded', this.foods.length, 'foods');
    },

    loadFoods() {
        this.foods = [
            // PROTEINS - MEATS (30 items)
            { id: 1, name: "Chicken Breast", category: "proteins", calories: 165, protein: 31, carbs: 0, fats: 3.6, fiber: 0, sugar: 0, sodium: 74, cholesterol: 85, serving: 100, gi: 0 },
            { id: 2, name: "Chicken Thigh", category: "proteins", calories: 209, protein: 26, carbs: 0, fats: 10.9, fiber: 0, sugar: 0, sodium: 84, cholesterol: 93, serving: 100, gi: 0 },
            { id: 3, name: "Chicken Wing", category: "proteins", calories: 203, protein: 30.5, carbs: 0, fats: 8.1, fiber: 0, sugar: 0, sodium: 77, cholesterol: 88, serving: 100, gi: 0 },
            { id: 4, name: "Salmon", category: "proteins", calories: 208, protein: 20, carbs: 0, fats: 13, fiber: 0, sugar: 0, sodium: 59, cholesterol: 55, serving: 100, gi: 0 },
            { id: 5, name: "Tuna (Fresh)", category: "proteins", calories: 132, protein: 28, carbs: 0, fats: 1, fiber: 0, sugar: 0, sodium: 50, cholesterol: 60, serving: 100, gi: 0 },
            { id: 6, name: "Tuna (Canned)", category: "proteins", calories: 116, protein: 26, carbs: 0, fats: 0.8, fiber: 0, sugar: 0, sodium: 300, cholesterol: 50, serving: 100, gi: 0 },
            { id: 7, name: "Cod", category: "proteins", calories: 82, protein: 18, carbs: 0, fats: 0.7, fiber: 0, sugar: 0, sodium: 54, cholesterol: 43, serving: 100, gi: 0 },
            { id: 8, name: "Tilapia", category: "proteins", calories: 96, protein: 20, carbs: 0, fats: 1.7, fiber: 0, sugar: 0, sodium: 52, cholesterol: 50, serving: 100, gi: 0 },
            { id: 9, name: "Shrimp", category: "proteins", calories: 99, protein: 24, carbs: 0, fats: 0.3, fiber: 0, sugar: 0, sodium: 111, cholesterol: 189, serving: 100, gi: 0 },
            { id: 10, name: "Beef (Lean)", category: "proteins", calories: 250, protein: 26, carbs: 0, fats: 15, fiber: 0, sugar: 0, sodium: 72, cholesterol: 80, serving: 100, gi: 0 },
            { id: 11, name: "Beef (Ground 90%)", category: "proteins", calories: 176, protein: 20, carbs: 0, fats: 10, fiber: 0, sugar: 0, sodium: 66, cholesterol: 70, serving: 100, gi: 0 },
            { id: 12, name: "Beef (Ribeye)", category: "proteins", calories: 291, protein: 24, carbs: 0, fats: 21, fiber: 0, sugar: 0, sodium: 58, cholesterol: 79, serving: 100, gi: 0 },
            { id: 13, name: "Pork Tenderloin", category: "proteins", calories: 143, protein: 26, carbs: 0, fats: 3.5, fiber: 0, sugar: 0, sodium: 48, cholesterol: 78, serving: 100, gi: 0 },
            { id: 14, name: "Pork Chop", category: "proteins", calories: 231, protein: 25, carbs: 0, fats: 14, fiber: 0, sugar: 0, sodium: 62, cholesterol: 78, serving: 100, gi: 0 },
            { id: 15, name: "Bacon", category: "proteins", calories: 541, protein: 37, carbs: 1.4, fats: 42, fiber: 0, sugar: 0, sodium: 1717, cholesterol: 110, serving: 100, gi: 0 },
            { id: 16, name: "Turkey Breast", category: "proteins", calories: 135, protein: 30, carbs: 0, fats: 1, fiber: 0, sugar: 0, sodium: 70, cholesterol: 65, serving: 100, gi: 0 },
            { id: 17, name: "Turkey (Ground)", category: "proteins", calories: 149, protein: 27, carbs: 0, fats: 4, fiber: 0, sugar: 0, sodium: 88, cholesterol: 85, serving: 100, gi: 0 },
            { id: 18, name: "Duck", category: "proteins", calories: 337, protein: 19, carbs: 0, fats: 28, fiber: 0, sugar: 0, sodium: 59, cholesterol: 84, serving: 100, gi: 0 },
            { id: 19, name: "Lamb", category: "proteins", calories: 294, protein: 25, carbs: 0, fats: 21, fiber: 0, sugar: 0, sodium: 65, cholesterol: 78, serving: 100, gi: 0 },
            { id: 20, name: "Venison", category: "proteins", calories: 157, protein: 30, carbs: 0, fats: 3.2, fiber: 0, sugar: 0, sodium: 54, cholesterol: 65, serving: 100, gi: 0 },
            { id: 21, name: "Rabbit", category: "proteins", calories: 173, protein: 33, carbs: 0, fats: 3.5, fiber: 0, sugar: 0, sodium: 45, cholesterol: 75, serving: 100, gi: 0 },
            { id: 22, name: "Liver (Beef)", category: "proteins", calories: 135, protein: 20, carbs: 4, fats: 3.6, fiber: 0, sugar: 0, sodium: 69, cholesterol: 300, serving: 100, gi: 0 },
            { id: 23, name: "Chicken Liver", category: "proteins", calories: 119, protein: 17, carbs: 0.7, fats: 4.8, fiber: 0, sugar: 0, sodium: 71, cholesterol: 340, serving: 100, gi: 0 },
            { id: 24, name: "Ham", category: "proteins", calories: 145, protein: 21, carbs: 1.5, fats: 6, fiber: 0, sugar: 0, sodium: 1203, cholesterol: 55, serving: 100, gi: 0 },
            { id: 25, name: "Sausage", category: "proteins", calories: 301, protein: 12, carbs: 2, fats: 27, fiber: 0, sugar: 0, sodium: 749, cholesterol: 80, serving: 100, gi: 0 },
            { id: 26, name: "Beef Steak", category: "proteins", calories: 271, protein: 26, carbs: 0, fats: 18, fiber: 0, sugar: 0, sodium: 55, cholesterol: 77, serving: 100, gi: 0 },
            { id: 27, name: "Mutton", category: "proteins", calories: 294, protein: 25, carbs: 0, fats: 21, fiber: 0, sugar: 0, sodium: 65, cholesterol: 78, serving: 100, gi: 0 },
            { id: 28, name: "Corned Beef", category: "proteins", calories: 251, protein: 18, carbs: 0, fats: 19, fiber: 0, sugar: 0, sodium: 1233, cholesterol: 75, serving: 100, gi: 0 },
            { id: 29, name: "Pastrami", category: "proteins", calories: 147, protein: 22, carbs: 2, fats: 5, fiber: 0, sugar: 0, sodium: 1150, cholesterol: 70, serving: 100, gi: 0 },
            { id: 30, name: "Goose", category: "proteins", calories: 305, protein: 25, carbs: 0, fats: 22, fiber: 0, sugar: 0, sodium: 77, cholesterol: 80, serving: 100, gi: 0 },

            // EGGS & EGG PRODUCTS (10 items)
            { id: 31, name: "Egg (Whole)", category: "eggs", calories: 155, protein: 13, carbs: 1.1, fats: 11, fiber: 0, sugar: 1.1, sodium: 124, cholesterol: 373, serving: 100, gi: 0 },
            { id: 32, name: "Egg White", category: "eggs", calories: 52, protein: 11, carbs: 0.7, fats: 0.2, fiber: 0, sugar: 0.7, sodium: 166, cholesterol: 0, serving: 100, gi: 0 },
            { id: 33, name: "Egg Yolk", category: "eggs", calories: 322, protein: 16, carbs: 3.6, fats: 27, fiber: 0, sugar: 0.6, sodium: 48, cholesterol: 1085, serving: 100, gi: 0 },
            { id: 34, name: "Quail Egg", category: "eggs", calories: 158, protein: 13, carbs: 0.4, fats: 11, fiber: 0, sugar: 0.4, sodium: 141, cholesterol: 385, serving: 100, gi: 0 },
            { id: 35, name: "Duck Egg", category: "eggs", calories: 185, protein: 13, carbs: 1.5, fats: 14, fiber: 0, sugar: 0, sodium: 146, cholesterol: 619, serving: 100, gi: 0 },
            { id: 36, name: "Hard Boiled Egg", category: "eggs", calories: 155, protein: 13, carbs: 1.1, fats: 11, fiber: 0, sugar: 1.1, sodium: 124, cholesterol: 373, serving: 100, gi: 0 },
            { id: 37, name: "Scrambled Eggs", category: "eggs", calories: 166, protein: 11, carbs: 2, fats: 12, fiber: 0, sugar: 1.5, sodium: 294, cholesterol: 305, serving: 100, gi: 0 },
            { id: 38, name: "Fried Egg", category: "eggs", calories: 196, protein: 14, carbs: 1, fats: 15, fiber: 0, sugar: 0.4, sodium: 207, cholesterol: 401, serving: 100, gi: 0 },
            { id: 39, name: "Poached Egg", category: "eggs", calories: 143, protein: 13, carbs: 0.8, fats: 10, fiber: 0, sugar: 0.4, sodium: 115, cholesterol: 345, serving: 100, gi: 0 },
            { id: 40, name: "Egg Substitute", category: "eggs", calories: 56, protein: 10, carbs: 1, fats: 1.5, fiber: 0, sugar: 1, sodium: 150, cholesterol: 0, serving: 100, gi: 0 },

            // DAIRY (20 items)
            { id: 41, name: "Milk (Whole)", category: "dairy", calories: 61, protein: 3.2, carbs: 4.8, fats: 3.3, fiber: 0, sugar: 5, sodium: 43, cholesterol: 10, serving: 100, gi: 39 },
            { id: 42, name: "Milk (2%)", category: "dairy", calories: 50, protein: 3.3, carbs: 4.8, fats: 2, fiber: 0, sugar: 5.1, sodium: 47, cholesterol: 8, serving: 100, gi: 39 },
            { id: 43, name: "Milk (Skim)", category: "dairy", calories: 34, protein: 3.4, carbs: 5, fats: 0.1, fiber: 0, sugar: 5.1, sodium: 42, cholesterol: 5, serving: 100, gi: 32 },
            { id: 44, name: "Greek Yogurt (Plain)", category: "dairy", calories: 97, protein: 9, carbs: 3.6, fats: 5, fiber: 0, sugar: 3.2, sodium: 36, cholesterol: 13, serving: 100, gi: 11 },
            { id: 45, name: "Greek Yogurt (Non-fat)", category: "dairy", calories: 59, protein: 10, carbs: 3.6, fats: 0.7, fiber: 0, sugar: 3.2, sodium: 36, cholesterol: 10, serving: 100, gi: 11 },
            { id: 46, name: "Yogurt (Plain)", category: "dairy", calories: 61, protein: 3.5, carbs: 4.7, fats: 3.3, fiber: 0, sugar: 4.7, sodium: 46, cholesterol: 13, serving: 100, gi: 14 },
            { id: 47, name: "Cottage Cheese", category: "dairy", calories: 98, protein: 11, carbs: 3.4, fats: 4.3, fiber: 0, sugar: 2.7, sodium: 364, cholesterol: 15, serving: 100, gi: 10 },
            { id: 48, name: "Ricotta Cheese", category: "dairy", calories: 174, protein: 11, carbs: 3, fats: 13, fiber: 0, sugar: 0.3, sodium: 84, cholesterol: 52, serving: 100, gi: 10 },
            { id: 49, name: "Cheddar Cheese", category: "dairy", calories: 403, protein: 25, carbs: 1.3, fats: 33, fiber: 0, sugar: 0.5, sodium: 621, cholesterol: 105, serving: 100, gi: 0 },
            { id: 50, name: "Mozzarella", category: "dairy", calories: 280, protein: 28, carbs: 3.1, fats: 17, fiber: 0, sugar: 1.2, sodium: 627, cholesterol: 79, serving: 100, gi: 0 },
            { id: 51, name: "Parmesan", category: "dairy", calories: 431, protein: 38, carbs: 4.1, fats: 29, fiber: 0, sugar: 0.9, sodium: 1529, cholesterol: 88, serving: 100, gi: 0 },
            { id: 52, name: "Feta Cheese", category: "dairy", calories: 264, protein: 14, carbs: 4.1, fats: 21, fiber: 0, sugar: 4.1, sodium: 917, cholesterol: 70, serving: 100, gi: 0 },
            { id: 53, name: "Swiss Cheese", category: "dairy", calories: 380, protein: 27, carbs: 5.4, fats: 28, fiber: 0, sugar: 1.7, sodium: 192, cholesterol: 92, serving: 100, gi: 0 },
            { id: 54, name: "Cream Cheese", category: "dairy", calories: 342, protein: 6, carbs: 4.1, fats: 34, fiber: 0, sugar: 3.8, sodium: 321, cholesterol: 110, serving: 100, gi: 0 },
            { id: 55, name: "Butter", category: "dairy", calories: 717, protein: 0.9, carbs: 0.1, fats: 81, fiber: 0, sugar: 0.1, sodium: 11, cholesterol: 215, serving: 100, gi: 0 },
            { id: 56, name: "Heavy Cream", category: "dairy", calories: 340, protein: 2.1, carbs: 2.8, fats: 36, fiber: 0, sugar: 2.9, sodium: 38, cholesterol: 137, serving: 100, gi: 0 },
            { id: 57, name: "Sour Cream", category: "dairy", calories: 198, protein: 2.4, carbs: 4.6, fats: 19, fiber: 0, sugar: 3.4, sodium: 80, cholesterol: 52, serving: 100, gi: 0 },
            { id: 58, name: "Whey Protein", category: "dairy", calories: 370, protein: 80, carbs: 6, fats: 3, fiber: 0, sugar: 3, sodium: 160, cholesterol: 15, serving: 100, gi: 0 },
            { id: 59, name: "Casein Protein", category: "dairy", calories: 373, protein: 80, carbs: 5, fats: 1.5, fiber: 0, sugar: 3, sodium: 150, cholesterol: 20, serving: 100, gi: 0 },
            { id: 60, name: "Kefir", category: "dairy", calories: 63, protein: 3.3, carbs: 4.5, fats: 3.5, fiber: 0, sugar: 4.5, sodium: 40, cholesterol: 14, serving: 100, gi: 15 },

            // GRAINS & CEREALS (25 items)
            { id: 61, name: "White Rice (Cooked)", category: "grains", calories: 130, protein: 2.7, carbs: 28, fats: 0.3, fiber: 0.4, sugar: 0, sodium: 1, cholesterol: 0, serving: 100, gi: 73 },
            { id: 62, name: "Brown Rice (Cooked)", category: "grains", calories: 111, protein: 2.6, carbs: 23, fats: 0.9, fiber: 1.8, sugar: 0.4, sodium: 5, cholesterol: 0, serving: 100, gi: 68 },
            { id: 63, name: "Jasmine Rice", category: "grains", calories: 129, protein: 2.7, carbs: 28, fats: 0.3, fiber: 0.4, sugar: 0, sodium: 1, cholesterol: 0, serving: 100, gi: 89 },
            { id: 64, name: "Basmati Rice", category: "grains", calories: 121, protein: 3.5, carbs: 25, fats: 0.4, fiber: 0.4, sugar: 0, sodium: 1, cholesterol: 0, serving: 100, gi: 58 },
            { id: 65, name: "Wild Rice", category: "grains", calories: 101, protein: 4, carbs: 21, fats: 0.3, fiber: 1.8, sugar: 0.7, sodium: 3, cholesterol: 0, serving: 100, gi: 57 },
            { id: 66, name: "Quinoa (Cooked)", category: "grains", calories: 120, protein: 4.4, carbs: 21, fats: 1.9, fiber: 2.8, sugar: 0.9, sodium: 7, cholesterol: 0, serving: 100, gi: 53 },
            { id: 67, name: "Oats", category: "grains", calories: 389, protein: 17, carbs: 66, fats: 7, fiber: 11, sugar: 0, sodium: 2, cholesterol: 0, serving: 100, gi: 55 },
            { id: 68, name: "Rolled Oats", category: "grains", calories: 379, protein: 13, carbs: 68, fats: 6.5, fiber: 10, sugar: 1, sodium: 6, cholesterol: 0, serving: 100, gi: 55 },
            { id: 69, name: "Steel Cut Oats", category: "grains", calories: 379, protein: 13, carbs: 68, fats: 6.5, fiber: 10, sugar: 1, sodium: 6, cholesterol: 0, serving: 100, gi: 52 },
            { id: 70, name: "Pasta (Cooked)", category: "grains", calories: 131, protein: 5, carbs: 25, fats: 1.1, fiber: 1.8, sugar: 0.6, sodium: 1, cholesterol: 0, serving: 100, gi: 48 },
            { id: 71, name: "Whole Wheat Pasta", category: "grains", calories: 124, protein: 5.3, carbs: 25, fats: 0.5, fiber: 4.5, sugar: 0.8, sodium: 3, cholesterol: 0, serving: 100, gi: 42 },
            { id: 72, name: "Bread (White)", category: "grains", calories: 265, protein: 9, carbs: 49, fats: 3.2, fiber: 2.7, sugar: 5, sodium: 491, cholesterol: 0, serving: 100, gi: 75 },
            { id: 73, name: "Bread (Whole Wheat)", category: "grains", calories: 247, protein: 13, carbs: 41, fats: 3.4, fiber: 7, sugar: 6, sodium: 400, cholesterol: 0, serving: 100, gi: 51 },
            { id: 74, name: "Sourdough Bread", category: "grains", calories: 274, protein: 9, carbs: 54, fats: 1.8, fiber: 2.1, sugar: 4, sodium: 602, cholesterol: 0, serving: 100, gi: 54 },
            { id: 75, name: "Rye Bread", category: "grains", calories: 259, protein: 8.5, carbs: 48, fats: 3.3, fiber: 5.8, sugar: 3.9, sodium: 603, cholesterol: 0, serving: 100, gi: 58 },
            { id: 76, name: "Bagel", category: "grains", calories: 257, protein: 10, carbs: 50, fats: 1.6, fiber: 2.3, sugar: 6, sodium: 443, cholesterol: 0, serving: 100, gi: 72 },
            { id: 77, name: "Croissant", category: "grains", calories: 406, protein: 8, carbs: 45, fats: 21, fiber: 2.4, sugar: 6, sodium: 353, cholesterol: 81, serving: 100, gi: 67 },
            { id: 78, name: "Tortilla (Flour)", category: "grains", calories: 312, protein: 8, carbs: 52, fats: 8, fiber: 3, sugar: 3, sodium: 589, cholesterol: 0, serving: 100, gi: 52 },
            { id: 79, name: "Tortilla (Corn)", category: "grains", calories: 218, protein: 5.7, carbs: 45, fats: 2.8, fiber: 5.2, sugar: 1.3, sodium: 20, cholesterol: 0, serving: 100, gi: 52 },
            { id: 80, name: "Couscous", category: "grains", calories: 112, protein: 3.8, carbs: 23, fats: 0.2, fiber: 1.4, sugar: 0.1, sodium: 5, cholesterol: 0, serving: 100, gi: 65 },
            { id: 81, name: "Barley", category: "grains", calories: 123, protein: 2.3, carbs: 28, fats: 0.4, fiber: 3.8, sugar: 0.3, sodium: 3, cholesterol: 0, serving: 100, gi: 28 },
            { id: 82, name: "Bulgur", category: "grains", calories: 83, protein: 3.1, carbs: 19, fats: 0.2, fiber: 4.5, sugar: 0.1, sodium: 5, cholesterol: 0, serving: 100, gi: 48 },
            { id: 83, name: "Farro", category: "grains", calories: 170, protein: 7, carbs: 34, fats: 1.5, fiber: 4.5, sugar: 0, sodium: 6, cholesterol: 0, serving: 100, gi: 45 },
            { id: 84, name: "Buckwheat", category: "grains", calories: 92, protein: 3.4, carbs: 20, fats: 0.6, fiber: 2.7, sugar: 0.9, sodium: 4, cholesterol: 0, serving: 100, gi: 45 },
            { id: 85, name: "Millet", category: "grains", calories: 119, protein: 3.5, carbs: 23, fats: 1, fiber: 1.3, sugar: 0.1, sodium: 3, cholesterol: 0, serving: 100, gi: 71 },

            // LEGUMES & BEANS (20 items)
            { id: 86, name: "Black Beans", category: "legumes", calories: 132, protein: 8.9, carbs: 24, fats: 0.5, fiber: 8.7, sugar: 0.3, sodium: 1, cholesterol: 0, serving: 100, gi: 30 },
            { id: 87, name: "Kidney Beans", category: "legumes", calories: 127, protein: 8.7, carbs: 23, fats: 0.5, fiber: 6.4, sugar: 0.3, sodium: 2, cholesterol: 0, serving: 100, gi: 24 },
            { id: 88, name: "Chickpeas", category: "legumes", calories: 164, protein: 8.9, carbs: 27, fats: 2.6, fiber: 7.6, sugar: 4.8, sodium: 7, cholesterol: 0, serving: 100, gi: 28 },
            { id: 89, name: "Lentils (Cooked)", category: "legumes", calories: 116, protein: 9, carbs: 20, fats: 0.4, fiber: 7.9, sugar: 1.8, sodium: 2, cholesterol: 0, serving: 100, gi: 32 },
            { id: 90, name: "Red Lentils", category: "legumes", calories: 116, protein: 9, carbs: 20, fats: 0.4, fiber: 7.9, sugar: 1.8, sodium: 2, cholesterol: 0, serving: 100, gi: 26 },
            { id: 91, name: "Navy Beans", category: "legumes", calories: 140, protein: 8.2, carbs: 26, fats: 0.6, fiber: 10.5, sugar: 0.3, sodium: 0, cholesterol: 0, serving: 100, gi: 38 },
            { id: 92, name: "Pinto Beans", category: "legumes", calories: 143, protein: 9, carbs: 26, fats: 0.7, fiber: 9, sugar: 0.3, sodium: 1, cholesterol: 0, serving: 100, gi: 39 },
            { id: 93, name: "Soybeans", category: "legumes", calories: 173, protein: 17, carbs: 10, fats: 9, fiber: 6, sugar: 3, sodium: 1, cholesterol: 0, serving: 100, gi: 15 },
            { id: 94, name: "Edamame", category: "legumes", calories: 121, protein: 11, carbs: 9, fats: 5, fiber: 5, sugar: 2.2, sodium: 6, cholesterol: 0, serving: 100, gi: 15 },
            { id: 95, name: "Tofu (Firm)", category: "legumes", calories: 144, protein: 17, carbs: 3, fats: 9, fiber: 2.3, sugar: 0.7, sodium: 14, cholesterol: 0, serving: 100, gi: 15 },
            { id: 96, name: "Tofu (Silken)", category: "legumes", calories: 55, protein: 5, carbs: 2.4, fats: 2.7, fiber: 0.2, sugar: 1.2, sodium: 8, cholesterol: 0, serving: 100, gi: 15 },
            { id: 97, name: "Tempeh", category: "legumes", calories: 192, protein: 20, carbs: 8, fats: 11, fiber: 0, sugar: 0, sodium: 14, cholesterol: 0, serving: 100, gi: 10 },
            { id: 98, name: "Black Eyed Peas", category: "legumes", calories: 116, protein: 7.7, carbs: 21, fats: 0.5, fiber: 6.5, sugar: 2.9, sodium: 4, cholesterol: 0, serving: 100, gi: 38 },
            { id: 99, name: "Split Peas", category: "legumes", calories: 118, protein: 8.3, carbs: 21, fats: 0.4, fiber: 8.3, sugar: 2.9, sodium: 2, cholesterol: 0, serving: 100, gi: 32 },
            { id: 100, name: "Lima Beans", category: "legumes", calories: 115, protein: 7.8, carbs: 21, fats: 0.4, fiber: 7, sugar: 1.5, sodium: 2, cholesterol: 0, serving: 100, gi: 32 },
            { id: 101, name: "Mung Beans", category: "legumes", calories: 105, protein: 7, carbs: 19, fats: 0.4, fiber: 7.6, sugar: 2, sodium: 2, cholesterol: 0, serving: 100, gi: 39 },
            { id: 102, name: "Adzuki Beans", category: "legumes", calories: 128, protein: 7.5, carbs: 25, fats: 0.1, fiber: 7.3, sugar: 0, sodium: 9, cholesterol: 0, serving: 100, gi: 35 },
            { id: 103, name: "Cannellini Beans", category: "legumes", calories: 139, protein: 9.7, carbs: 24, fats: 0.6, fiber: 6.3, sugar: 0.3, sodium: 6, cholesterol: 0, serving: 100, gi: 38 },
            { id: 104, name: "Refried Beans", category: "legumes", calories: 94, protein: 5.3, carbs: 14, fats: 2.5, fiber: 5, sugar: 1.3, sodium: 401, cholesterol: 0, serving: 100, gi: 35 },
            { id: 105, name: "Hummus", category: "legumes", calories: 166, protein: 7.9, carbs: 14, fats: 9.6, fiber: 6, sugar: 0.3, sodium: 379, cholesterol: 0, serving: 100, gi: 6 },

            // FRUITS (30 items)
            { id: 106, name: "Apple", category: "fruits", calories: 52, protein: 0.3, carbs: 14, fats: 0.2, fiber: 2.4, sugar: 10, sodium: 1, cholesterol: 0, serving: 100, gi: 36 },
            { id: 107, name: "Banana", category: "fruits", calories: 89, protein: 1.1, carbs: 23, fats: 0.3, fiber: 2.6, sugar: 12, sodium: 1, cholesterol: 0, serving: 100, gi: 51 },
            { id: 108, name: "Orange", category: "fruits", calories: 47, protein: 0.9, carbs: 12, fats: 0.1, fiber: 2.4, sugar: 9, sodium: 0, cholesterol: 0, serving: 100, gi: 43 },
            { id: 109, name: "Strawberries", category: "fruits", calories: 32, protein: 0.7, carbs: 7.7, fats: 0.3, fiber: 2, sugar: 4.9, sodium: 1, cholesterol: 0, serving: 100, gi: 40 },
            { id: 110, name: "Blueberries", category: "fruits", calories: 57, protein: 0.7, carbs: 14, fats: 0.3, fiber: 2.4, sugar: 10, sodium: 1, cholesterol: 0, serving: 100, gi: 53 },
            { id: 111, name: "Raspberries", category: "fruits", calories: 52, protein: 1.2, carbs: 12, fats: 0.7, fiber: 6.5, sugar: 4.4, sodium: 1, cholesterol: 0, serving: 100, gi: 32 },
            { id: 112, name: "Blackberries", category: "fruits", calories: 43, protein: 1.4, carbs: 10, fats: 0.5, fiber: 5.3, sugar: 4.9, sodium: 1, cholesterol: 0, serving: 100, gi: 25 },
            { id: 113, name: "Grapes", category: "fruits", calories: 69, protein: 0.7, carbs: 18, fats: 0.2, fiber: 0.9, sugar: 16, sodium: 2, cholesterol: 0, serving: 100, gi: 59 },
            { id: 114, name: "Watermelon", category: "fruits", calories: 30, protein: 0.6, carbs: 7.6, fats: 0.2, fiber: 0.4, sugar: 6, sodium: 1, cholesterol: 0, serving: 100, gi: 76 },
            { id: 115, name: "Cantaloupe", category: "fruits", calories: 34, protein: 0.8, carbs: 8, fats: 0.2, fiber: 0.9, sugar: 8, sodium: 16, cholesterol: 0, serving: 100, gi: 65 },
            { id: 116, name: "Honeydew", category: "fruits", calories: 36, protein: 0.5, carbs: 9, fats: 0.1, fiber: 0.8, sugar: 8, sodium: 18, cholesterol: 0, serving: 100, gi: 65 },
            { id: 117, name: "Pineapple", category: "fruits", calories: 50, protein: 0.5, carbs: 13, fats: 0.1, fiber: 1.4, sugar: 10, sodium: 1, cholesterol: 0, serving: 100, gi: 59 },
            { id: 118, name: "Mango", category: "fruits", calories: 60, protein: 0.8, carbs: 15, fats: 0.4, fiber: 1.6, sugar: 14, sodium: 1, cholesterol: 0, serving: 100, gi: 51 },
            { id: 119, name: "Papaya", category: "fruits", calories: 43, protein: 0.5, carbs: 11, fats: 0.3, fiber: 1.7, sugar: 8, sodium: 8, cholesterol: 0, serving: 100, gi: 60 },
            { id: 120, name: "Kiwi", category: "fruits", calories: 61, protein: 1.1, carbs: 15, fats: 0.5, fiber: 3, sugar: 9, sodium: 3, cholesterol: 0, serving: 100, gi: 52 },
            { id: 121, name: "Avocado", category: "fruits", calories: 160, protein: 2, carbs: 9, fats: 15, fiber: 7, sugar: 0.7, sodium: 7, cholesterol: 0, serving: 100, gi: 15 },
            { id: 122, name: "Peach", category: "fruits", calories: 39, protein: 0.9, carbs: 10, fats: 0.3, fiber: 1.5, sugar: 8, sodium: 0, cholesterol: 0, serving: 100, gi: 42 },
            { id: 123, name: "Nectarine", category: "fruits", calories: 44, protein: 1.1, carbs: 11, fats: 0.3, fiber: 1.7, sugar: 8, sodium: 0, cholesterol: 0, serving: 100, gi: 43 },
            { id: 124, name: "Plum", category: "fruits", calories: 46, protein: 0.7, carbs: 11, fats: 0.3, fiber: 1.4, sugar: 10, sodium: 0, cholesterol: 0, serving: 100, gi: 39 },
            { id: 125, name: "Cherries", category: "fruits", calories: 63, protein: 1.1, carbs: 16, fats: 0.2, fiber: 2.1, sugar: 13, sodium: 0, cholesterol: 0, serving: 100, gi: 22 },
            { id: 126, name: "Lemon", category: "fruits", calories: 29, protein: 1.1, carbs: 9, fats: 0.3, fiber: 2.8, sugar: 2.5, sodium: 2, cholesterol: 0, serving: 100, gi: 20 },
            { id: 127, name: "Lime", category: "fruits", calories: 30, protein: 0.7, carbs: 11, fats: 0.2, fiber: 2.8, sugar: 1.7, sodium: 2, cholesterol: 0, serving: 100, gi: 20 },
            { id: 128, name: "Grapefruit", category: "fruits", calories: 42, protein: 0.8, carbs: 11, fats: 0.1, fiber: 1.6, sugar: 7, sodium: 0, cholesterol: 0, serving: 100, gi: 25 },
            { id: 129, name: "Pomegranate", category: "fruits", calories: 83, protein: 1.7, carbs: 19, fats: 1.2, fiber: 4, sugar: 14, sodium: 3, cholesterol: 0, serving: 100, gi: 35 },
            { id: 130, name: "Pear", category: "fruits", calories: 57, protein: 0.4, carbs: 15, fats: 0.1, fiber: 3.1, sugar: 10, sodium: 1, cholesterol: 0, serving: 100, gi: 38 },
            { id: 131, name: "Apricot", category: "fruits", calories: 48, protein: 1.4, carbs: 11, fats: 0.4, fiber: 2, sugar: 9, sodium: 1, cholesterol: 0, serving: 100, gi: 30 },
            { id: 132, name: "Passion Fruit", category: "fruits", calories: 97, protein: 2.2, carbs: 23, fats: 0.7, fiber: 10.4, sugar: 11, sodium: 28, cholesterol: 0, serving: 100, gi: 28 },
            { id: 133, name: "Guava", category: "fruits", calories: 68, protein: 2.6, carbs: 14, fats: 1, fiber: 5.4, sugar: 8, sodium: 2, cholesterol: 0, serving: 100, gi: 12 },
            { id: 134, name: "Dragon Fruit", category: "fruits", calories: 50, protein: 1.1, carbs: 11, carbs2: 0.4, fats: 0.4, fiber: 3, sugar: 8, sodium: 3, cholesterol: 0, serving: 100, gi: 48 },
            { id: 135, name: "Coconut (Fresh)", category: "fruits", calories: 354, protein: 3.3, carbs: 15, fats: 33, fiber: 9, sugar: 5, sodium: 20, cholesterol: 0, serving: 100, gi: 15 },

            // VEGETABLES (40 items)
            { id: 136, name: "Broccoli", category: "vegetables", calories: 34, protein: 2.8, carbs: 7, fats: 0.4, fiber: 2.6, sugar: 1.7, sodium: 33, cholesterol: 0, serving: 100, gi: 15 },
            { id: 137, name: "Spinach", category: "vegetables", calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4, fiber: 2.2, sugar: 0.4, sodium: 79, cholesterol: 0, serving: 100, gi: 15 },
            { id: 138, name: "Kale", category: "vegetables", calories: 49, protein: 4.3, carbs: 9, fats: 0.9, fiber: 3.6, sugar: 2.3, sodium: 38, cholesterol: 0, serving: 100, gi: 15 },
            { id: 139, name: "Carrots", category: "vegetables", calories: 41, protein: 0.9, carbs: 10, fats: 0.2, fiber: 2.8, sugar: 4.7, sodium: 69, cholesterol: 0, serving: 100, gi: 39 },
            { id: 140, name: "Bell Pepper (Red)", category: "vegetables", calories: 31, protein: 1, carbs: 6, fats: 0.3, fiber: 2.1, sugar: 4.2, sodium: 4, cholesterol: 0, serving: 100, gi: 15 },
            { id: 141, name: "Bell Pepper (Green)", category: "vegetables", calories: 20, protein: 0.9, carbs: 4.6, fats: 0.2, fiber: 1.7, sugar: 2.4, sodium: 3, cholesterol: 0, serving: 100, gi: 15 },
            { id: 142, name: "Tomatoes", category: "vegetables", calories: 18, protein: 0.9, carbs: 3.9, fats: 0.2, fiber: 1.2, sugar: 2.6, sodium: 5, cholesterol: 0, serving: 100, gi: 15 },
            { id: 143, name: "Cucumber", category: "vegetables", calories: 15, protein: 0.7, carbs: 3.6, fats: 0.1, fiber: 0.5, sugar: 1.7, sodium: 2, cholesterol: 0, serving: 100, gi: 15 },
            { id: 144, name: "Onion", category: "vegetables", calories: 40, protein: 1.1, carbs: 9.3, fats: 0.1, fiber: 1.7, sugar: 4.2, sodium: 4, cholesterol: 0, serving: 100, gi: 10 },
            { id: 145, name: "Garlic", category: "vegetables", calories: 149, protein: 6.4, carbs: 33, fats: 0.5, fiber: 2.1, sugar: 1, sodium: 17, cholesterol: 0, serving: 100, gi: 15 },
            { id: 146, name: "Ginger", category: "vegetables", calories: 80, protein: 1.8, carbs: 18, fats: 0.8, fiber: 2, sugar: 1.7, sodium: 13, cholesterol: 0, serving: 100, gi: 15 },
            { id: 147, name: "Zucchini", category: "vegetables", calories: 17, protein: 1.2, carbs: 3.1, fats: 0.3, fiber: 1, sugar: 2.5, sodium: 8, cholesterol: 0, serving: 100, gi: 15 },
            { id: 148, name: "Cauliflower", category: "vegetables", calories: 25, protein: 1.9, carbs: 5, fats: 0.3, fiber: 2, sugar: 1.9, sodium: 30, cholesterol: 0, serving: 100, gi: 15 },
            { id: 149, name: "Brussels Sprouts", category: "vegetables", calories: 43, protein: 3.4, carbs: 9, fats: 0.3, fiber: 3.8, sugar: 2.2, sodium: 25, cholesterol: 0, serving: 100, gi: 15 },
            { id: 150, name: "Cabbage", category: "vegetables", calories: 25, protein: 1.3, carbs: 6, fats: 0.1, fiber: 2.5, sugar: 3.2, sodium: 18, cholesterol: 0, serving: 100, gi: 15 },
            { id: 151, name: "Lettuce (Romaine)", category: "vegetables", calories: 17, protein: 1.2, carbs: 3.3, fats: 0.3, fiber: 2.1, sugar: 1.2, sodium: 8, cholesterol: 0, serving: 100, gi: 15 },
            { id: 152, name: "Lettuce (Iceberg)", category: "vegetables", calories: 14, protein: 0.9, carbs: 3, fats: 0.1, fiber: 1.2, sugar: 2, sodium: 10, cholesterol: 0, serving: 100, gi: 15 },
            { id: 153, name: "Asparagus", category: "vegetables", calories: 20, protein: 2.2, carbs: 3.9, fats: 0.1, fiber: 2.1, sugar: 1.9, sodium: 2, cholesterol: 0, serving: 100, gi: 15 },
            { id: 154, name: "Green Beans", category: "vegetables", calories: 31, protein: 1.8, carbs: 7, fats: 0.1, fiber: 2.7, sugar: 3.3, sodium: 6, cholesterol: 0, serving: 100, gi: 15 },
            { id: 155, name: "Peas", category: "vegetables", calories: 81, protein: 5.4, carbs: 14, fats: 0.4, fiber: 5.7, sugar: 5.7, sodium: 5, cholesterol: 0, serving: 100, gi: 48 },
            { id: 156, name: "Corn", category: "vegetables", calories: 86, protein: 3.3, carbs: 19, fats: 1.4, fiber: 2.7, sugar: 6.3, sodium: 15, cholesterol: 0, serving: 100, gi: 52 },
            { id: 157, name: "Potato", category: "vegetables", calories: 77, protein: 2, carbs: 17, fats: 0.1, fiber: 2.2, sugar: 0.8, sodium: 6, cholesterol: 0, serving: 100, gi: 78 },
            { id: 158, name: "Sweet Potato", category: "vegetables", calories: 86, protein: 1.6, carbs: 20, fats: 0.1, fiber: 3, sugar: 4.2, sodium: 55, cholesterol: 0, serving: 100, gi: 63 },
            { id: 159, name: "Beet", category: "vegetables", calories: 43, protein: 1.6, carbs: 10, fats: 0.2, fiber: 2.8, sugar: 6.8, sodium: 78, cholesterol: 0, serving: 100, gi: 30 },
            { id: 160, name: "Radish", category: "vegetables", calories: 16, protein: 0.7, carbs: 3.4, fats: 0.1, fiber: 1.6, sugar: 1.9, sodium: 39, cholesterol: 0, serving: 100, gi: 15 },
            { id: 161, name: "Celery", category: "vegetables", calories: 16, protein: 0.7, carbs: 3, fats: 0.2, fiber: 1.6, sugar: 1.3, sodium: 80, cholesterol: 0, serving: 100, gi: 15 },
            { id: 162, name: "Mushrooms", category: "vegetables", calories: 22, protein: 3.1, carbs: 3.3, fats: 0.3, fiber: 1, sugar: 2, sodium: 5, cholesterol: 0, serving: 100, gi: 15 },
            { id: 163, name: "Eggplant", category: "vegetables", calories: 25, protein: 1, carbs: 6, fats: 0.2, fiber: 3, sugar: 3.5, sodium: 2, cholesterol: 0, serving: 100, gi: 15 },
            { id: 164, name: "Artichoke", category: "vegetables", calories: 47, protein: 3.3, carbs: 11, fats: 0.2, fiber: 5.4, sugar: 1, sodium: 94, cholesterol: 0, serving: 100, gi: 15 },
            { id: 165, name: "Leek", category: "vegetables", calories: 61, protein: 1.5, carbs: 14, fats: 0.3, fiber: 1.8, sugar: 3.9, sodium: 20, cholesterol: 0, serving: 100, gi: 15 },
            { id: 166, name: "Bok Choy", category: "vegetables", calories: 13, protein: 1.5, carbs: 2.2, fats: 0.2, fiber: 1, sugar: 1.2, sodium: 65, cholesterol: 0, serving: 100, gi: 15 },
            { id: 167, name: "Swiss Chard", category: "vegetables", calories: 19, protein: 1.8, carbs: 3.7, fats: 0.2, fiber: 1.6, sugar: 1.1, sodium: 213, cholesterol: 0, serving: 100, gi: 15 },
            { id: 168, name: "Arugula", category: "vegetables", calories: 25, protein: 2.6, carbs: 3.7, fats: 0.7, fiber: 1.6, sugar: 2, sodium: 27, cholesterol: 0, serving: 100, gi: 15 },
            { id: 169, name: "Collard Greens", category: "vegetables", calories: 32, protein: 3, carbs: 6, fats: 0.6, fiber: 4, sugar: 0.5, sodium: 20, cholesterol: 0, serving: 100, gi: 15 },
            { id: 170, name: "Turnip", category: "vegetables", calories: 28, protein: 0.9, carbs: 6, fats: 0.1, fiber: 1.8, sugar: 3.8, sodium: 67, cholesterol: 0, serving: 100, gi: 15 },
            { id: 171, name: "Parsnip", category: "vegetables", calories: 75, protein: 1.2, carbs: 18, fats: 0.3, fiber: 4.9, sugar: 4.8, sodium: 10, cholesterol: 0, serving: 100, gi: 52 },
            { id: 172, name: "Butternut Squash", category: "vegetables", calories: 45, protein: 1, carbs: 12, fats: 0.1, fiber: 2, sugar: 2.2, sodium: 4, cholesterol: 0, serving: 100, gi: 51 },
            { id: 173, name: "Acorn Squash", category: "vegetables", calories: 40, protein: 0.8, carbs: 10, fats: 0.1, fiber: 1.5, sugar: 0, sodium: 3, cholesterol: 0, serving: 100, gi: 50 },
            { id: 174, name: "Spaghetti Squash", category: "vegetables", calories: 31, protein: 0.6, carbs: 7, fats: 0.6, fiber: 1.5, sugar: 2.8, sodium: 17, cholesterol: 0, serving: 100, gi: 15 },
            { id: 175, name: "Pumpkin", category: "vegetables", calories: 26, protein: 1, carbs: 6.5, fats: 0.1, fiber: 0.5, sugar: 3.3, sodium: 1, cholesterol: 0, serving: 100, gi: 15 },

            // NUTS & SEEDS (20 items)
            { id: 176, name: "Almonds", category: "nuts", calories: 579, protein: 21, carbs: 22, fats: 50, fiber: 12.5, sugar: 4.4, sodium: 1, cholesterol: 0, serving: 100, gi: 15 },
            { id: 177, name: "Walnuts", category: "nuts", calories: 654, protein: 15, carbs: 14, fats: 65, fiber: 6.7, sugar: 2.6, sodium: 2, cholesterol: 0, serving: 100, gi: 15 },
            { id: 178, name: "Cashews", category: "nuts", calories: 553, protein: 18, carbs: 30, fats: 44, fiber: 3.3, sugar: 6, sodium: 12, cholesterol: 0, serving: 100, gi: 25 },
            { id: 179, name: "Pistachios", category: "nuts", calories: 560, protein: 20, carbs: 28, fats: 45, fiber: 10, sugar: 7.7, sodium: 1, cholesterol: 0, serving: 100, gi: 15 },
            { id: 180, name: "Pecans", category: "nuts", calories: 691, protein: 9, carbs: 14, fats: 72, fiber: 9.6, sugar: 4, sodium: 0, cholesterol: 0, serving: 100, gi: 15 },
            { id: 181, name: "Macadamia Nuts", category: "nuts", calories: 718, protein: 8, carbs: 14, fats: 76, fiber: 8.6, sugar: 4.6, sodium: 5, cholesterol: 0, serving: 100, gi: 10 },
            { id: 182, name: "Brazil Nuts", category: "nuts", calories: 659, protein: 14, carbs: 12, fats: 67, fiber: 7.5, sugar: 2.3, sodium: 3, cholesterol: 0, serving: 100, gi: 15 },
            { id: 183, name: "Hazelnuts", category: "nuts", calories: 628, protein: 15, carbs: 17, fats: 61, fiber: 9.7, sugar: 4.3, sodium: 0, cholesterol: 0, serving: 100, gi: 15 },
            { id: 184, name: "Pine Nuts", category: "nuts", calories: 673, protein: 14, carbs: 13, fats: 68, fiber: 3.7, sugar: 3.6, sodium: 2, cholesterol: 0, serving: 100, gi: 15 },
            { id: 185, name: "Peanuts", category: "nuts", calories: 567, protein: 26, carbs: 16, fats: 49, fiber: 8.5, sugar: 4, sodium: 18, cholesterol: 0, serving: 100, gi: 14 },
            { id: 186, name: "Peanut Butter", category: "nuts", calories: 588, protein: 25, carbs: 20, fats: 50, fiber: 6, sugar: 9, sodium: 17, cholesterol: 0, serving: 100, gi: 14 },
            { id: 187, name: "Almond Butter", category: "nuts", calories: 614, protein: 21, carbs: 19, fats: 56, fiber: 10.5, sugar: 4.4, sodium: 7, cholesterol: 0, serving: 100, gi: 15 },
            { id: 188, name: "Chia Seeds", category: "seeds", calories: 486, protein: 17, carbs: 42, fats: 31, fiber: 34, sugar: 0, sodium: 16, cholesterol: 0, serving: 100, gi: 1 },
            { id: 189, name: "Flax Seeds", category: "seeds", calories: 534, protein: 18, carbs: 29, fats: 42, fiber: 27, sugar: 1.6, sodium: 30, cholesterol: 0, serving: 100, gi: 1 },
            { id: 190, name: "Sunflower Seeds", category: "seeds", calories: 584, protein: 21, carbs: 20, fats: 51, fiber: 8.6, sugar: 2.6, sodium: 9, cholesterol: 0, serving: 100, gi: 20 },
            { id: 191, name: "Pumpkin Seeds", category: "seeds", calories: 559, protein: 30, carbs: 11, fats: 49, fiber: 6, sugar: 1.4, sodium: 7, cholesterol: 0, serving: 100, gi: 15 },
            { id: 192, name: "Sesame Seeds", category: "seeds", calories: 573, protein: 18, carbs: 23, fats: 50, fiber: 12, sugar: 0.3, sodium: 11, cholesterol: 0, serving: 100, gi: 15 },
            { id: 193, name: "Hemp Seeds", category: "seeds", calories: 553, protein: 32, carbs: 9, fats: 49, fiber: 4, sugar: 1.5, sodium: 5, cholesterol: 0, serving: 100, gi: 15 },
            { id: 194, name: "Poppy Seeds", category: "seeds", calories: 525, protein: 18, carbs: 28, fats: 42, fiber: 19.5, sugar: 2.8, sodium: 26, cholesterol: 0, serving: 100, gi: 15 },
            { id: 195, name: "Tahini", category: "seeds", calories: 595, protein: 17, carbs: 21, fats: 54, fiber: 9.3, sugar: 0.5, sodium: 115, cholesterol: 0, serving: 100, gi: 15 },

            // FATS & OILS (10 items)
            { id: 196, name: "Olive Oil", category: "fats", calories: 884, protein: 0, carbs: 0, fats: 100, fiber: 0, sugar: 0, sodium: 2, cholesterol: 0, serving: 100, gi: 0 },
            { id: 197, name: "Coconut Oil", category: "fats", calories: 862, protein: 0, carbs: 0, fats: 100, fiber: 0, sugar: 0, sodium: 0, cholesterol: 0, serving: 100, gi: 0 },
            { id: 198, name: "Avocado Oil", category: "fats", calories: 884, protein: 0, carbs: 0, fats: 100, fiber: 0, sugar: 0, sodium: 1, cholesterol: 0, serving: 100, gi: 0 },
            { id: 199, name: "Ghee", category: "fats", calories: 900, protein: 0, carbs: 0, fats: 100, fiber: 0, sugar: 0, sodium: 0, cholesterol: 250, serving: 100, gi: 0 },
            { id: 200, name: "MCT Oil", category: "fats", calories: 862, protein: 0, carbs: 0, fats: 100, fiber: 0, sugar: 0, sodium: 0, cholesterol: 0, serving: 100, gi: 0 },
            { id: 201, name: "Flaxseed Oil", category: "fats", calories: 884, protein: 0, carbs: 0, fats: 100, fiber: 0, sugar: 0, sodium: 0, cholesterol: 0, serving: 100, gi: 0 },
            { id: 202, name: "Sesame Oil", category: "fats", calories: 884, protein: 0, carbs: 0, fats: 100, fiber: 0, sugar: 0, sodium: 0, cholesterol: 0, serving: 100, gi: 0 },
            { id: 203, name: "Walnut Oil", category: "fats", calories: 884, protein: 0, carbs: 0, fats: 100, fiber: 0, sugar: 0, sodium: 0, cholesterol: 0, serving: 100, gi: 0 },
            { id: 204, name: "Canola Oil", category: "fats", calories: 884, protein: 0, carbs: 0, fats: 100, fiber: 0, sugar: 0, sodium: 0, cholesterol: 0, serving: 100, gi: 0 },
            { id: 205, name: "Mayonnaise", category: "fats", calories: 680, protein: 1, carbs: 0.6, fats: 75, fiber: 0, sugar: 0.6, sodium: 635, cholesterol: 42, serving: 100, gi: 0 },

            // SWEETENERS & OTHERS (15 items)
            { id: 206, name: "Honey", category: "sweeteners", calories: 304, protein: 0.3, carbs: 82, fats: 0, fiber: 0.2, sugar: 82, sodium: 4, cholesterol: 0, serving: 100, gi: 61 },
            { id: 207, name: "Maple Syrup", category: "sweeteners", calories: 260, protein: 0, carbs: 67, fats: 0.1, fiber: 0, sugar: 60, sodium: 12, cholesterol: 0, serving: 100, gi: 54 },
            { id: 208, name: "Agave Nectar", category: "sweeteners", calories: 310, protein: 0, carbs: 76, fats: 0, fiber: 0.2, sugar: 68, sodium: 4, cholesterol: 0, serving: 100, gi: 55 },
            { id: 209, name: "Brown Sugar", category: "sweeteners", calories: 380, protein: 0, carbs: 98, fats: 0, fiber: 0, sugar: 97, sodium: 28, cholesterol: 0, serving: 100, gi: 65 },
            { id: 210, name: "White Sugar", category: "sweeteners", calories: 387, protein: 0, carbs: 100, fats: 0, fiber: 0, sugar: 100, sodium: 0, cholesterol: 0, serving: 100, gi: 65 },
            { id: 211, name: "Stevia", category: "sweeteners", calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sugar: 0, sodium: 0, cholesterol: 0, serving: 100, gi: 0 },
            { id: 212, name: "Coconut Sugar", category: "sweeteners", calories: 375, protein: 1.1, carbs: 94, fats: 0.4, fiber: 0.3, sugar: 75, sodium: 90, cholesterol: 0, serving: 100, gi: 35 },
            { id: 213, name: "Molasses", category: "sweeteners", calories: 290, protein: 0, carbs: 75, fats: 0.1, fiber: 0, sugar: 55, sodium: 37, cholesterol: 0, serving: 100, gi: 55 },
            { id: 214, name: "Dates", category: "fruits", calories: 277, protein: 1.8, carbs: 75, fats: 0.2, fiber: 6.7, sugar: 66, sodium: 1, cholesterol: 0, serving: 100, gi: 42 },
            { id: 215, name: "Raisins", category: "fruits", calories: 299, protein: 3.1, carbs: 79, fats: 0.5, fiber: 3.7, sugar: 59, sodium: 11, cholesterol: 0, serving: 100, gi: 49 },
            { id: 216, name: "Dried Apricots", category: "fruits", calories: 241, protein: 3.4, carbs: 63, fats: 0.5, fiber: 7.3, sugar: 53, sodium: 10, cholesterol: 0, serving: 100, gi: 32 },
            { id: 217, name: "Prunes", category: "fruits", calories: 240, protein: 2.2, carbs: 64, fats: 0.4, fiber: 7.1, sugar: 38, sodium: 2, cholesterol: 0, serving: 100, gi: 29 },
            { id: 218, name: "Fig (Dried)", category: "fruits", calories: 249, protein: 3.3, carbs: 64, fats: 0.9, fiber: 10, sugar: 48, sodium: 10, cholesterol: 0, serving: 100, gi: 30 },
            { id: 219, name: "Goji Berries", category: "fruits", calories: 349, protein: 14, carbs: 77, fats: 0.4, fiber: 13, sugar: 46, sodium: 80, cholesterol: 0, serving: 100, gi: 25 },
            { id: 220, name: "Cranberries (Dried)", category: "fruits", calories: 308, protein: 0.1, carbs: 82, fats: 1.4, fiber: 5.7, sugar: 65, sodium: 3, cholesterol: 0, serving: 100, gi: 45 }
        ];
    },

    search(query) {
        if (!query || query.length < 1) return [];
        const lower = query.toLowerCase();
        return this.foods.filter(food => 
            food.name.toLowerCase().includes(lower)
        ).slice(0, 20);
    },

    getByCategory(category) {
        if (category === 'all') return this.foods;
        return this.foods.filter(food => food.category === category);
    },

    getById(id) {
        return this.foods.find(food => food.id === id);
    },

    getCategories() {
        const categories = new Set();
        this.foods.forEach(food => categories.add(food.category));
        return Array.from(categories);
    },

    calculateNutrition(food, grams) {
        const ratio = grams / food.serving;
        return {
            calories: Math.round(food.calories * ratio),
            protein: Math.round(food.protein * ratio * 10) / 10,
            carbs: Math.round(food.carbs * ratio * 10) / 10,
            fats: Math.round(food.fats * ratio * 10) / 10,
            fiber: Math.round(food.fiber * ratio * 10) / 10,
            sugar: Math.round(food.sugar * ratio * 10) / 10,
            sodium: Math.round(food.sodium * ratio),
            cholesterol: Math.round(food.cholesterol * ratio),
            gi: food.gi || 0
        };
    },

    getFoodById(id) {
        return this.getById(id);
    }
};

NutritionDB.init();
