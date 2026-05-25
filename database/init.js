const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'recipes.db');
const db = new Database(dbPath);

db.exec(`
  DROP TABLE IF EXISTS recipes;
  CREATE TABLE recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    mood TEXT NOT NULL,
    description TEXT NOT NULL,
    prep_time TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL
  );
`);

const insert = db.prepare(`
  INSERT INTO recipes (title, mood, description, prep_time, ingredients, instructions)
  VALUES (@title, @mood, @description, @prep_time, @ingredients, @instructions)
`);

const recipes = [
  {
    title: 'Sunshine Citrus Smoothie Bowl',
    mood: 'happy',
    description: 'A bright, tropical bowl that tastes like vacation in a spoon.',
    prep_time: '15 min',
    ingredients: JSON.stringify([
      '1 frozen banana',
      '1 cup mango chunks',
      '1/2 cup orange juice',
      '1/2 cup Greek yogurt',
      'Granola, coconut flakes, and berries for topping',
    ]),
    instructions: JSON.stringify([
      'Blend banana, mango, orange juice, and yogurt until thick and smooth.',
      'Pour into a bowl and swirl the top flat.',
      'Top with granola, coconut, and fresh berries.',
      'Eat immediately while cold and creamy.',
    ]),
  },
  {
    title: 'Rainbow Veggie Wraps',
    mood: 'happy',
    description: 'Crunchy, colorful wraps that feel like a party on a plate.',
    prep_time: '20 min',
    ingredients: JSON.stringify([
      '4 large tortillas',
      '1 cup hummus',
      '1 shredded carrot',
      '1 cup shredded purple cabbage',
      '1 sliced bell pepper',
      '1 avocado, sliced',
      'Handful of spinach',
    ]),
    instructions: JSON.stringify([
      'Spread hummus evenly over each tortilla.',
      'Layer vegetables in stripes across the center.',
      'Roll tightly, tucking in the sides as you go.',
      'Slice diagonally and serve.',
    ]),
  },
  {
    title: 'Lemon Ricotta Pancakes',
    mood: 'happy',
    description: 'Fluffy pancakes with a zesty lift — perfect for a cheerful morning.',
    prep_time: '25 min',
    ingredients: JSON.stringify([
      '1 cup flour',
      '2 tbsp sugar',
      '1 tsp baking powder',
      '1 cup ricotta',
      '2 eggs',
      'Zest of 1 lemon',
      'Maple syrup for serving',
    ]),
    instructions: JSON.stringify([
      'Whisk dry ingredients in one bowl, wet in another.',
      'Fold wet into dry until just combined.',
      'Cook spoonfuls on a buttered skillet over medium heat until golden.',
      'Serve with lemon zest and maple syrup.',
    ]),
  },
  {
    title: 'Classic Mac and Cheese',
    mood: 'sad',
    description: 'Creamy, nostalgic comfort in a bowl — no judgment, just cheese.',
    prep_time: '30 min',
    ingredients: JSON.stringify([
      '8 oz elbow pasta',
      '2 tbsp butter',
      '2 tbsp flour',
      '2 cups milk',
      '2 cups shredded cheddar',
      'Salt and pepper',
    ]),
    instructions: JSON.stringify([
      'Cook pasta until al dente; drain.',
      'Melt butter, whisk in flour, then slowly add milk.',
      'Stir until thickened, then add cheese until melted.',
      'Fold in pasta, season, and serve warm.',
    ]),
  },
  {
    title: 'Chicken Noodle Soup',
    mood: 'sad',
    description: 'A hug in a mug — warm broth and tender noodles to soothe the soul.',
    prep_time: '45 min',
    ingredients: JSON.stringify([
      '6 cups chicken broth',
      '2 cups cooked shredded chicken',
      '2 carrots, diced',
      '2 celery stalks, diced',
      '8 oz egg noodles',
      'Fresh parsley',
    ]),
    instructions: JSON.stringify([
      'Simmer broth with carrots and celery until tender.',
      'Add noodles and cook until done.',
      'Stir in chicken and heat through.',
      'Ladle into bowls and garnish with parsley.',
    ]),
  },
  {
    title: 'Hot Chocolate with Marshmallows',
    mood: 'sad',
    description: 'Rich, velvety cocoa topped with melty marshmallows.',
    prep_time: '10 min',
    ingredients: JSON.stringify([
      '2 cups whole milk',
      '3 oz dark chocolate, chopped',
      '2 tbsp cocoa powder',
      '2 tbsp sugar',
      'Marshmallows',
    ]),
    instructions: JSON.stringify([
      'Warm milk in a saucepan over medium-low heat.',
      'Whisk in chocolate, cocoa, and sugar until smooth.',
      'Pour into mugs and top with marshmallows.',
    ]),
  },
  {
    title: 'Chamomile Honey Tea & Toast',
    mood: 'stressed',
    description: 'Gentle, calming flavors to help you slow down and breathe.',
    prep_time: '10 min',
    ingredients: JSON.stringify([
      '2 chamomile tea bags',
      '1 tbsp honey',
      '2 slices whole-grain bread',
      'Butter or almond butter',
    ]),
    instructions: JSON.stringify([
      'Steep tea bags in hot water for 5 minutes; stir in honey.',
      'Toast bread lightly and spread with butter.',
      'Sip tea slowly while eating toast mindfully.',
    ]),
  },
  {
    title: 'Avocado Toast with Everything Seasoning',
    mood: 'stressed',
    description: 'Simple, nourishing, and satisfying without much effort.',
    prep_time: '10 min',
    ingredients: JSON.stringify([
      '2 slices sourdough',
      '1 ripe avocado',
      'Lemon juice',
      'Everything bagel seasoning',
      'Flaky salt',
    ]),
    instructions: JSON.stringify([
      'Toast bread until crisp.',
      'Mash avocado with lemon juice and salt.',
      'Spread on toast and sprinkle with seasoning.',
    ]),
  },
  {
    title: 'Miso Ginger Soup',
    mood: 'stressed',
    description: 'Light, savory broth that feels grounding and restorative.',
    prep_time: '20 min',
    ingredients: JSON.stringify([
      '4 cups vegetable broth',
      '2 tbsp white miso',
      '1 inch ginger, grated',
      '4 oz silken tofu, cubed',
      '2 green onions, sliced',
    ]),
    instructions: JSON.stringify([
      'Heat broth with ginger; do not boil.',
      'Whisk miso with a ladle of broth, then return to pot.',
      'Add tofu and green onions; serve warm.',
    ]),
  },
  {
    title: 'Garlic Butter Shrimp Pasta',
    mood: 'romantic',
    description: 'Elegant, aromatic, and perfect for a candlelit dinner.',
    prep_time: '25 min',
    ingredients: JSON.stringify([
      '12 oz linguine',
      '1 lb large shrimp, peeled',
      '4 cloves garlic, minced',
      '4 tbsp butter',
      '1/4 cup white wine',
      'Fresh parsley and lemon',
    ]),
    instructions: JSON.stringify([
      'Cook pasta; reserve 1/2 cup pasta water.',
      'Sauté garlic in butter, add shrimp until pink.',
      'Deglaze with wine, toss with pasta and parsley.',
      'Finish with lemon and a splash of pasta water.',
    ]),
  },
  {
    title: 'Chocolate Covered Strawberries',
    mood: 'romantic',
    description: 'Sweet, glossy berries that say "I thought of you."',
    prep_time: '20 min',
    ingredients: JSON.stringify([
      '1 lb fresh strawberries',
      '8 oz dark chocolate',
      '1 tsp coconut oil',
      'Optional: crushed nuts or sea salt',
    ]),
    instructions: JSON.stringify([
      'Wash strawberries and pat completely dry.',
      'Melt chocolate with coconut oil.',
      'Dip strawberries halfway, place on parchment.',
      'Chill until set; sprinkle with salt if desired.',
    ]),
  },
  {
    title: 'Caprese Salad with Balsamic Glaze',
    mood: 'romantic',
    description: 'Fresh mozzarella, ripe tomatoes, and basil — simple and beautiful.',
    prep_time: '15 min',
    ingredients: JSON.stringify([
      '3 large tomatoes, sliced',
      '8 oz fresh mozzarella, sliced',
      'Fresh basil leaves',
      'Olive oil',
      'Balsamic glaze',
    ]),
    instructions: JSON.stringify([
      'Arrange tomato and mozzarella slices overlapping on a plate.',
      'Tuck basil between layers.',
      'Drizzle with olive oil and balsamic glaze.',
    ]),
  },
  {
    title: 'Spicy Peanut Noodle Stir-Fry',
    mood: 'energetic',
    description: 'Bold flavors and quick protein to fuel an active day.',
    prep_time: '20 min',
    ingredients: JSON.stringify([
      '8 oz rice noodles',
      '2 tbsp peanut butter',
      '1 tbsp soy sauce',
      '1 tbsp sriracha',
      '1 bell pepper, sliced',
      '1 cup edamame',
      'Green onions',
    ]),
    instructions: JSON.stringify([
      'Cook noodles; drain.',
      'Whisk peanut butter, soy sauce, sriracha, and a splash of water.',
      'Stir-fry pepper and edamame; toss with noodles and sauce.',
      'Top with green onions.',
    ]),
  },
  {
    title: 'Power Protein Smoothie',
    mood: 'energetic',
    description: 'Banana, oats, and protein for a morning or post-workout boost.',
    prep_time: '5 min',
    ingredients: JSON.stringify([
      '1 banana',
      '1/2 cup oats',
      '1 scoop protein powder',
      '1 cup almond milk',
      '1 tbsp almond butter',
      'Ice',
    ]),
    instructions: JSON.stringify([
      'Add all ingredients to a blender.',
      'Blend until smooth and creamy.',
      'Pour into a glass and drink immediately.',
    ]),
  },
  {
    title: 'Breakfast Burrito',
    mood: 'energetic',
    description: 'Hearty eggs, beans, and salsa wrapped for eating on the go.',
    prep_time: '20 min',
    ingredients: JSON.stringify([
      '2 large tortillas',
      '4 scrambled eggs',
      '1/2 cup black beans',
      '1/2 cup salsa',
      'Shredded cheese',
      'Avocado slices',
    ]),
    instructions: JSON.stringify([
      'Warm tortillas; scramble eggs with beans.',
      'Fill center with eggs, salsa, cheese, and avocado.',
      'Roll burrito-style and grill seam-side down briefly.',
    ]),
  },
  {
    title: 'Creamy Tomato Soup with Grilled Cheese',
    mood: 'cozy',
    description: 'The ultimate rainy-day duo — warm, melty, and familiar.',
    prep_time: '35 min',
    ingredients: JSON.stringify([
      '1 can crushed tomatoes',
      '1 cup heavy cream',
      '2 cups vegetable broth',
      '4 slices bread',
      '4 slices cheddar',
      'Butter',
    ]),
    instructions: JSON.stringify([
      'Simmer tomatoes and broth 15 minutes; blend smooth and stir in cream.',
      'Butter bread, add cheese, grill until golden.',
      'Serve soup with sandwich for dipping.',
    ]),
  },
  {
    title: 'Slow Cooker Beef Stew',
    mood: 'cozy',
    description: 'Rich, hearty stew that fills the kitchen with comfort.',
    prep_time: '4 hours',
    ingredients: JSON.stringify([
      '1.5 lbs beef chuck, cubed',
      '4 potatoes, cubed',
      '3 carrots, chunked',
      '2 cups beef broth',
      '1 tbsp tomato paste',
      'Thyme and bay leaf',
    ]),
    instructions: JSON.stringify([
      'Brown beef in a skillet; transfer to slow cooker.',
      'Add vegetables, broth, tomato paste, and herbs.',
      'Cook on low 4 hours until beef is tender.',
    ]),
  },
  {
    title: 'Apple Cinnamon Oatmeal',
    mood: 'cozy',
    description: 'Warm spiced oats with sautéed apples — like a blanket for breakfast.',
    prep_time: '15 min',
    ingredients: JSON.stringify([
      '1 cup rolled oats',
      '2 cups milk',
      '1 apple, diced',
      '1 tsp cinnamon',
      '1 tbsp brown sugar',
      'Walnuts (optional)',
    ]),
    instructions: JSON.stringify([
      'Cook oats in milk until creamy.',
      'Sauté apple with cinnamon and sugar until soft.',
      'Top oatmeal with apples and walnuts.',
    ]),
  },
  {
    title: 'Thai Green Curry',
    mood: 'adventurous',
    description: 'Aromatic, spicy, and full of exotic flavors to explore.',
    prep_time: '30 min',
    ingredients: JSON.stringify([
      '2 tbsp green curry paste',
      '1 can coconut milk',
      '1 lb chicken or tofu',
      '1 bell pepper',
      '1 cup bamboo shoots',
      'Thai basil and jasmine rice',
    ]),
    instructions: JSON.stringify([
      'Fry curry paste in oil 1 minute; add coconut milk.',
      'Simmer protein and vegetables until cooked.',
      'Stir in basil; serve over jasmine rice.',
    ]),
  },
  {
    title: 'Moroccan Chickpea Tagine',
    mood: 'adventurous',
    description: 'Warm spices, dried fruit, and chickpeas in a fragrant stew.',
    prep_time: '40 min',
    ingredients: JSON.stringify([
      '2 cans chickpeas',
      '1 onion, diced',
      '2 tsp cumin',
      '1 tsp cinnamon',
      '1/2 cup dried apricots',
      '1 can diced tomatoes',
      'Couscous for serving',
    ]),
    instructions: JSON.stringify([
      'Sauté onion with spices until fragrant.',
      'Add tomatoes, chickpeas, apricots; simmer 25 minutes.',
      'Serve over fluffy couscous.',
    ]),
  },
  {
    title: 'Korean Bibimbap Bowl',
    mood: 'adventurous',
    description: 'A colorful mix of rice, veggies, egg, and gochujang heat.',
    prep_time: '35 min',
    ingredients: JSON.stringify([
      '2 cups cooked rice',
      '1 cup spinach',
      '1 cup bean sprouts',
      '1 carrot, julienned',
      '2 eggs, fried',
      'Gochujang sauce',
      'Sesame oil',
    ]),
    instructions: JSON.stringify([
      'Arrange rice in bowls; top with blanched vegetables.',
      'Add fried egg and a dollop of gochujang.',
      'Mix everything together before eating.',
    ]),
  },
];

const insertMany = db.transaction((items) => {
  for (const recipe of items) {
    insert.run(recipe);
  }
});

insertMany(recipes);

console.log(`Database seeded with ${recipes.length} recipes at ${dbPath}`);
db.close();
