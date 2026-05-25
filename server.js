const express = require('express');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;

const dbPath = path.join(__dirname, 'database', 'recipes.db');

if (!fs.existsSync(dbPath)) {
  console.log('Database not found — seeding recipes...');
  execSync('node database/init.js', { cwd: __dirname, stdio: 'inherit' });
}

const db = new Database(dbPath, { readonly: true });

const MOODS = [
  { id: 'happy', label: 'Happy', emoji: '😊' },
  { id: 'sad', label: 'Sad', emoji: '😢' },
  { id: 'stressed', label: 'Stressed', emoji: '😰' },
  { id: 'romantic', label: 'Romantic', emoji: '💕' },
  { id: 'energetic', label: 'Energetic', emoji: '⚡' },
  { id: 'cozy', label: 'Cozy', emoji: '🛋️' },
  { id: 'adventurous', label: 'Adventurous', emoji: '🌍' },
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/moods', (_req, res) => {
  res.json(MOODS);
});

app.get('/api/recipe/:mood', (req, res) => {
  const { mood } = req.params;
  const validMood = MOODS.some((m) => m.id === mood);

  if (!validMood) {
    return res.status(400).json({ error: 'Invalid mood' });
  }

  const excludeParam = req.query.exclude;
  const excludeIds = excludeParam
    ? excludeParam.split(',').map(Number).filter((n) => !Number.isNaN(n))
    : [];

  let query = 'SELECT * FROM recipes WHERE mood = ?';
  const params = [mood];

  if (excludeIds.length > 0) {
    const placeholders = excludeIds.map(() => '?').join(',');
    query += ` AND id NOT IN (${placeholders})`;
    params.push(...excludeIds);
  }

  const recipes = db.prepare(query).all(...params);

  if (recipes.length === 0) {
    return res.status(404).json({
      error: 'No more recipes',
      message: 'You have seen all recipes for this mood! Try another mood.',
    });
  }

  const recipe = recipes[Math.floor(Math.random() * recipes.length)];

  res.json({
    id: recipe.id,
    title: recipe.title,
    mood: recipe.mood,
    description: recipe.description,
    prepTime: recipe.prep_time,
    ingredients: JSON.parse(recipe.ingredients),
    instructions: JSON.parse(recipe.instructions),
    remaining: recipes.length - 1,
  });
});

app.listen(PORT, () => {
  console.log(`Mood Recipe app running at http://localhost:${PORT}`);
});
