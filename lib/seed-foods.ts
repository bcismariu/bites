// Starter food database. Values are per 100 g (or 100 ml for liquids),
// sourced from USDA FoodData Central averages — good enough for daily
// tracking, and every value can be overridden with custom foods.

export interface SeedFood {
  name: string;
  category: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  portionGrams: number;
  portionLabel: string;
}

export const SEED_FOODS: SeedFood[] = [
  // Proteins
  { name: 'Chicken breast, grilled', category: 'protein', kcal: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, sugar: 0, portionGrams: 150, portionLabel: '1 fillet' },
  { name: 'Chicken thigh, roasted', category: 'protein', kcal: 209, protein: 26, carbs: 0, fat: 11, fiber: 0, sugar: 0, portionGrams: 120, portionLabel: '1 thigh' },
  { name: 'Beef, lean, cooked', category: 'protein', kcal: 250, protein: 26, carbs: 0, fat: 15, fiber: 0, sugar: 0, portionGrams: 150, portionLabel: '1 serving' },
  { name: 'Pork loin, cooked', category: 'protein', kcal: 242, protein: 27, carbs: 0, fat: 14, fiber: 0, sugar: 0, portionGrams: 150, portionLabel: '1 serving' },
  { name: 'Salmon, baked', category: 'protein', kcal: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, sugar: 0, portionGrams: 150, portionLabel: '1 fillet' },
  { name: 'Tuna, canned in water', category: 'protein', kcal: 116, protein: 26, carbs: 0, fat: 1, fiber: 0, sugar: 0, portionGrams: 100, portionLabel: '1 small can' },
  { name: 'White fish (cod), baked', category: 'protein', kcal: 105, protein: 23, carbs: 0, fat: 0.9, fiber: 0, sugar: 0, portionGrams: 150, portionLabel: '1 fillet' },
  { name: 'Egg, whole', category: 'protein', kcal: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, sugar: 1.1, portionGrams: 60, portionLabel: '1 egg' },
  { name: 'Tofu, firm', category: 'protein', kcal: 144, protein: 17, carbs: 3, fat: 8, fiber: 2, sugar: 0.6, portionGrams: 100, portionLabel: '1 serving' },
  { name: 'Lentils, cooked', category: 'protein', kcal: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 8, sugar: 1.8, portionGrams: 180, portionLabel: '1 cup' },
  { name: 'Chickpeas, cooked', category: 'protein', kcal: 164, protein: 8.9, carbs: 27, fat: 2.6, fiber: 7.6, sugar: 4.8, portionGrams: 160, portionLabel: '1 cup' },
  { name: 'Black beans, cooked', category: 'protein', kcal: 132, protein: 8.9, carbs: 24, fat: 0.5, fiber: 8.7, sugar: 0.3, portionGrams: 170, portionLabel: '1 cup' },

  // Dairy
  { name: 'Greek yogurt, plain', category: 'dairy', kcal: 59, protein: 10, carbs: 3.6, fat: 0.4, fiber: 0, sugar: 3.2, portionGrams: 170, portionLabel: '1 pot' },
  { name: 'Yogurt, whole milk', category: 'dairy', kcal: 61, protein: 3.5, carbs: 4.7, fat: 3.3, fiber: 0, sugar: 4.7, portionGrams: 150, portionLabel: '1 pot' },
  { name: 'Cottage cheese', category: 'dairy', kcal: 98, protein: 11, carbs: 3.4, fat: 4.3, fiber: 0, sugar: 2.7, portionGrams: 150, portionLabel: '1 serving' },
  { name: 'Milk, semi-skimmed', category: 'dairy', kcal: 50, protein: 3.4, carbs: 4.8, fat: 1.8, fiber: 0, sugar: 4.8, portionGrams: 250, portionLabel: '1 glass' },
  { name: 'Cheese, cheddar', category: 'dairy', kcal: 403, protein: 25, carbs: 1.3, fat: 33, fiber: 0, sugar: 0.5, portionGrams: 30, portionLabel: '1 slice' },
  { name: 'Cheese, feta', category: 'dairy', kcal: 264, protein: 14, carbs: 4.1, fat: 21, fiber: 0, sugar: 4.1, portionGrams: 40, portionLabel: '1 serving' },
  { name: 'Cheese, mozzarella', category: 'dairy', kcal: 280, protein: 28, carbs: 3.1, fat: 17, fiber: 0, sugar: 1.2, portionGrams: 50, portionLabel: '1 serving' },
  { name: 'Butter', category: 'dairy', kcal: 717, protein: 0.9, carbs: 0.1, fat: 81, fiber: 0, sugar: 0.1, portionGrams: 10, portionLabel: '1 pat' },

  // Grains & starches
  { name: 'Oats, rolled, dry', category: 'grains', kcal: 389, protein: 17, carbs: 66, fat: 6.9, fiber: 11, sugar: 1, portionGrams: 50, portionLabel: '1 bowl (dry)' },
  { name: 'Rice, white, cooked', category: 'grains', kcal: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, sugar: 0.1, portionGrams: 180, portionLabel: '1 cup' },
  { name: 'Rice, brown, cooked', category: 'grains', kcal: 112, protein: 2.6, carbs: 24, fat: 0.9, fiber: 1.8, sugar: 0.4, portionGrams: 180, portionLabel: '1 cup' },
  { name: 'Pasta, cooked', category: 'grains', kcal: 158, protein: 5.8, carbs: 31, fat: 0.9, fiber: 1.8, sugar: 0.6, portionGrams: 200, portionLabel: '1 plate' },
  { name: 'Quinoa, cooked', category: 'grains', kcal: 120, protein: 4.4, carbs: 21, fat: 1.9, fiber: 2.8, sugar: 0.9, portionGrams: 185, portionLabel: '1 cup' },
  { name: 'Bread, whole wheat', category: 'grains', kcal: 247, protein: 13, carbs: 41, fat: 3.4, fiber: 7, sugar: 6, portionGrams: 35, portionLabel: '1 slice' },
  { name: 'Bread, white', category: 'grains', kcal: 265, protein: 9, carbs: 49, fat: 3.2, fiber: 2.7, sugar: 5, portionGrams: 30, portionLabel: '1 slice' },
  { name: 'Potato, boiled', category: 'grains', kcal: 87, protein: 1.9, carbs: 20, fat: 0.1, fiber: 1.8, sugar: 0.9, portionGrams: 180, portionLabel: '1 medium' },
  { name: 'Sweet potato, baked', category: 'grains', kcal: 90, protein: 2, carbs: 21, fat: 0.2, fiber: 3.3, sugar: 6.5, portionGrams: 150, portionLabel: '1 medium' },
  { name: 'Tortilla, wheat', category: 'grains', kcal: 312, protein: 8.3, carbs: 51, fat: 7.7, fiber: 3.5, sugar: 3.8, portionGrams: 45, portionLabel: '1 tortilla' },

  // Fruit
  { name: 'Apple', category: 'fruit', kcal: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, sugar: 10, portionGrams: 180, portionLabel: '1 medium' },
  { name: 'Banana', category: 'fruit', kcal: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, sugar: 12, portionGrams: 120, portionLabel: '1 medium' },
  { name: 'Orange', category: 'fruit', kcal: 47, protein: 0.9, carbs: 12, fat: 0.1, fiber: 2.4, sugar: 9, portionGrams: 130, portionLabel: '1 medium' },
  { name: 'Blueberries', category: 'fruit', kcal: 57, protein: 0.7, carbs: 14, fat: 0.3, fiber: 2.4, sugar: 10, portionGrams: 100, portionLabel: '1 handful' },
  { name: 'Strawberries', category: 'fruit', kcal: 32, protein: 0.7, carbs: 7.7, fat: 0.3, fiber: 2, sugar: 4.9, portionGrams: 150, portionLabel: '1 bowl' },
  { name: 'Grapes', category: 'fruit', kcal: 69, protein: 0.7, carbs: 18, fat: 0.2, fiber: 0.9, sugar: 16, portionGrams: 100, portionLabel: '1 handful' },
  { name: 'Watermelon', category: 'fruit', kcal: 30, protein: 0.6, carbs: 7.6, fat: 0.2, fiber: 0.4, sugar: 6.2, portionGrams: 280, portionLabel: '1 slice' },
  { name: 'Avocado', category: 'fruit', kcal: 160, protein: 2, carbs: 8.5, fat: 15, fiber: 6.7, sugar: 0.7, portionGrams: 100, portionLabel: '1/2 avocado' },
  { name: 'Dates, dried', category: 'fruit', kcal: 282, protein: 2.5, carbs: 75, fat: 0.4, fiber: 8, sugar: 63, portionGrams: 24, portionLabel: '3 dates' },

  // Vegetables
  { name: 'Broccoli, steamed', category: 'vegetables', kcal: 35, protein: 2.4, carbs: 7.2, fat: 0.4, fiber: 3.3, sugar: 1.4, portionGrams: 150, portionLabel: '1 cup' },
  { name: 'Spinach, raw', category: 'vegetables', kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, sugar: 0.4, portionGrams: 60, portionLabel: '2 handfuls' },
  { name: 'Carrot', category: 'vegetables', kcal: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8, sugar: 4.7, portionGrams: 80, portionLabel: '1 medium' },
  { name: 'Tomato', category: 'vegetables', kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, sugar: 2.6, portionGrams: 120, portionLabel: '1 medium' },
  { name: 'Cucumber', category: 'vegetables', kcal: 15, protein: 0.7, carbs: 3.6, fat: 0.1, fiber: 0.5, sugar: 1.7, portionGrams: 150, portionLabel: '1/2 cucumber' },
  { name: 'Bell pepper', category: 'vegetables', kcal: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1, sugar: 4.2, portionGrams: 120, portionLabel: '1 pepper' },
  { name: 'Mixed salad greens', category: 'vegetables', kcal: 20, protein: 1.8, carbs: 3.3, fat: 0.2, fiber: 2.1, sugar: 0.8, portionGrams: 80, portionLabel: '1 bowl' },
  { name: 'Zucchini, cooked', category: 'vegetables', kcal: 17, protein: 1.2, carbs: 3.1, fat: 0.3, fiber: 1, sugar: 2.5, portionGrams: 150, portionLabel: '1 cup' },
  { name: 'Green peas, cooked', category: 'vegetables', kcal: 84, protein: 5.4, carbs: 16, fat: 0.2, fiber: 5.5, sugar: 5.9, portionGrams: 150, portionLabel: '1 cup' },

  // Nuts & seeds
  { name: 'Almonds', category: 'nuts & seeds', kcal: 579, protein: 21, carbs: 22, fat: 50, fiber: 13, sugar: 4.4, portionGrams: 28, portionLabel: '1 handful' },
  { name: 'Walnuts', category: 'nuts & seeds', kcal: 654, protein: 15, carbs: 14, fat: 65, fiber: 6.7, sugar: 2.6, portionGrams: 28, portionLabel: '1 handful' },
  { name: 'Peanut butter', category: 'nuts & seeds', kcal: 588, protein: 25, carbs: 20, fat: 50, fiber: 6, sugar: 9, portionGrams: 16, portionLabel: '1 tbsp' },
  { name: 'Chia seeds', category: 'nuts & seeds', kcal: 486, protein: 17, carbs: 42, fat: 31, fiber: 34, sugar: 0, portionGrams: 12, portionLabel: '1 tbsp' },
  { name: 'Hummus', category: 'nuts & seeds', kcal: 166, protein: 7.9, carbs: 14, fat: 9.6, fiber: 6, sugar: 0.3, portionGrams: 50, portionLabel: '2 tbsp' },

  // Snacks & treats
  { name: 'Dark chocolate 70%', category: 'snacks', kcal: 598, protein: 7.8, carbs: 46, fat: 43, fiber: 11, sugar: 24, portionGrams: 20, portionLabel: '2 squares' },
  { name: 'Protein bar', category: 'snacks', kcal: 380, protein: 30, carbs: 40, fat: 12, fiber: 5, sugar: 20, portionGrams: 60, portionLabel: '1 bar' },
  { name: 'Rice cakes', category: 'snacks', kcal: 387, protein: 8.2, carbs: 81, fat: 2.8, fiber: 4.2, sugar: 0.9, portionGrams: 9, portionLabel: '1 cake' },
  { name: 'Popcorn, air-popped', category: 'snacks', kcal: 387, protein: 13, carbs: 78, fat: 4.5, fiber: 15, sugar: 0.9, portionGrams: 25, portionLabel: '1 bowl' },
  { name: 'Potato chips', category: 'snacks', kcal: 536, protein: 7, carbs: 53, fat: 34, fiber: 4.8, sugar: 0.2, portionGrams: 30, portionLabel: '1 small bag' },
  { name: 'Croissant', category: 'snacks', kcal: 406, protein: 8.2, carbs: 46, fat: 21, fiber: 2.6, sugar: 11, portionGrams: 60, portionLabel: '1 croissant' },
  { name: 'Cookie, chocolate chip', category: 'snacks', kcal: 488, protein: 5.1, carbs: 64, fat: 24, fiber: 2.4, sugar: 36, portionGrams: 30, portionLabel: '1 cookie' },
  { name: 'Granola', category: 'snacks', kcal: 471, protein: 10, carbs: 64, fat: 20, fiber: 7, sugar: 25, portionGrams: 45, portionLabel: '1 serving' },

  // Drinks
  { name: 'Coffee, black', category: 'drinks', kcal: 2, protein: 0.3, carbs: 0, fat: 0, fiber: 0, sugar: 0, portionGrams: 240, portionLabel: '1 cup' },
  { name: 'Cappuccino', category: 'drinks', kcal: 30, protein: 1.6, carbs: 2.4, fat: 1.6, fiber: 0, sugar: 2.4, portionGrams: 180, portionLabel: '1 cup' },
  { name: 'Orange juice', category: 'drinks', kcal: 45, protein: 0.7, carbs: 10, fat: 0.2, fiber: 0.2, sugar: 8.4, portionGrams: 250, portionLabel: '1 glass' },
  { name: 'Cola', category: 'drinks', kcal: 42, protein: 0, carbs: 10.6, fat: 0, fiber: 0, sugar: 10.6, portionGrams: 330, portionLabel: '1 can' },
  { name: 'Beer, lager', category: 'drinks', kcal: 43, protein: 0.5, carbs: 3.6, fat: 0, fiber: 0, sugar: 0, portionGrams: 500, portionLabel: '1 pint' },
  { name: 'Wine, red', category: 'drinks', kcal: 85, protein: 0.1, carbs: 2.6, fat: 0, fiber: 0, sugar: 0.6, portionGrams: 150, portionLabel: '1 glass' },
  { name: 'Protein shake (whey + water)', category: 'drinks', kcal: 120, protein: 24, carbs: 3, fat: 1.5, fiber: 0, sugar: 2, portionGrams: 350, portionLabel: '1 shake' },

  // Prepared meals & extras
  { name: 'Pizza, margherita', category: 'meals', kcal: 266, protein: 11, carbs: 33, fat: 10, fiber: 2.3, sugar: 3.6, portionGrams: 300, portionLabel: '3 slices' },
  { name: 'Burger with bun', category: 'meals', kcal: 295, protein: 17, carbs: 24, fat: 14, fiber: 1.1, sugar: 5, portionGrams: 220, portionLabel: '1 burger' },
  { name: 'Chicken soup', category: 'meals', kcal: 36, protein: 3.1, carbs: 3.5, fat: 1.2, fiber: 0.5, sugar: 0.9, portionGrams: 400, portionLabel: '1 bowl' },
  { name: 'Sushi, mixed (8 pcs)', category: 'meals', kcal: 150, protein: 6, carbs: 27, fat: 1.5, fiber: 0.9, sugar: 4, portionGrams: 250, portionLabel: '8 pieces' },
  { name: 'Omelette, 2 eggs with cheese', category: 'meals', kcal: 195, protein: 13.5, carbs: 1.5, fat: 15, fiber: 0, sugar: 1.2, portionGrams: 160, portionLabel: '1 omelette' },
  { name: 'Olive oil', category: 'extras', kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, sugar: 0, portionGrams: 14, portionLabel: '1 tbsp' },
  { name: 'Honey', category: 'extras', kcal: 304, protein: 0.3, carbs: 82, fat: 0, fiber: 0.2, sugar: 82, portionGrams: 21, portionLabel: '1 tbsp' },
];
