const moodGrid = document.getElementById('mood-grid');
const moodSection = document.getElementById('mood-section');
const recipeSection = document.getElementById('recipe-section');
const loading = document.getElementById('loading');
const toast = document.getElementById('toast');

const backBtn = document.getElementById('back-btn');
const newRecipeBtn = document.getElementById('new-recipe-btn');
const recipeMoodBadge = document.getElementById('recipe-mood-badge');
const recipeTitle = document.getElementById('recipe-title');
const recipeDescription = document.getElementById('recipe-description');
const recipePrep = document.getElementById('recipe-prep');
const recipeIngredients = document.getElementById('recipe-ingredients');
const recipeInstructions = document.getElementById('recipe-instructions');
const remainingHint = document.getElementById('remaining-hint');

let moods = [];
let currentMood = null;
let seenRecipeIds = [];

function showLoading(show) {
  loading.classList.toggle('hidden', !show);
}

function showToast(message, duration = 4000) {
  toast.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), duration);
}

function renderMoods() {
  moodGrid.innerHTML = moods
    .map(
      (mood) => `
      <button
        type="button"
        class="mood-btn flex flex-col items-center justify-center gap-2 p-5 sm:p-6 bg-white rounded-2xl border-2 border-transparent shadow-sm hover:border-terracotta/30"
        data-mood="${mood.id}"
        aria-label="Select ${mood.label} mood"
      >
        <span class="text-3xl sm:text-4xl" aria-hidden="true">${mood.emoji}</span>
        <span class="font-medium text-ink">${mood.label}</span>
      </button>
    `
    )
    .join('');

  moodGrid.querySelectorAll('.mood-btn').forEach((btn) => {
    btn.addEventListener('click', () => selectMood(btn.dataset.mood));
  });
}

function getMoodMeta(moodId) {
  return moods.find((m) => m.id === moodId);
}

async function fetchRecipe(mood, excludeIds = []) {
  const params = new URLSearchParams();
  if (excludeIds.length > 0) {
    params.set('exclude', excludeIds.join(','));
  }

  const query = params.toString();
  const url = `/api/recipe/${encodeURIComponent(mood)}${query ? `?${query}` : ''}`;
  const response = await fetch(url);

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || data.error || 'Failed to load recipe');
  }

  return response.json();
}

function renderRecipe(recipe) {
  const meta = getMoodMeta(recipe.mood);

  recipeMoodBadge.textContent = meta ? `${meta.emoji} Feeling ${meta.label}` : recipe.mood;
  recipeTitle.textContent = recipe.title;
  recipeDescription.textContent = recipe.description;
  recipePrep.textContent = `⏱ ${recipe.prepTime}`;

  recipeIngredients.innerHTML = recipe.ingredients
    .map((item) => `<li class="flex gap-2"><span class="text-terracotta">•</span><span>${item}</span></li>`)
    .join('');

  recipeInstructions.innerHTML = recipe.instructions
    .map((step) => `<li class="pl-1">${step}</li>`)
    .join('');

  if (recipe.remaining > 0) {
    remainingHint.textContent = `${recipe.remaining} more recipe${recipe.remaining === 1 ? '' : 's'} available for this mood`;
    newRecipeBtn.disabled = false;
    newRecipeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  } else {
    remainingHint.textContent = 'Last recipe for this mood';
    newRecipeBtn.disabled = false;
    newRecipeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  }

  recipeSection.classList.remove('hidden');
  recipeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function selectMood(moodId) {
  currentMood = moodId;
  seenRecipeIds = [];

  moodGrid.querySelectorAll('.mood-btn').forEach((btn) => {
    btn.classList.toggle('selected', btn.dataset.mood === moodId);
  });

  showLoading(true);
  try {
    const recipe = await fetchRecipe(moodId);
    seenRecipeIds.push(recipe.id);
    renderRecipe(recipe);
  } catch (err) {
    showToast(err.message);
  } finally {
    showLoading(false);
  }
}

async function loadAnotherRecipe() {
  if (!currentMood) return;

  showLoading(true);
  try {
    const recipe = await fetchRecipe(currentMood, seenRecipeIds);
    seenRecipeIds.push(recipe.id);

    recipeSection.querySelector('.recipe-card').style.animation = 'none';
    requestAnimationFrame(() => {
      recipeSection.querySelector('.recipe-card').style.animation = '';
    });

    renderRecipe(recipe);
  } catch (err) {
    showToast(err.message);
    newRecipeBtn.disabled = true;
    newRecipeBtn.classList.add('opacity-50', 'cursor-not-allowed');
    remainingHint.textContent = 'No more recipes for this mood';
  } finally {
    showLoading(false);
  }
}

function resetToMoods() {
  currentMood = null;
  seenRecipeIds = [];
  recipeSection.classList.add('hidden');
  moodGrid.querySelectorAll('.mood-btn').forEach((btn) => btn.classList.remove('selected'));
  moodSection.scrollIntoView({ behavior: 'smooth' });
}

backBtn.addEventListener('click', resetToMoods);
newRecipeBtn.addEventListener('click', loadAnotherRecipe);

async function init() {
  try {
    const response = await fetch('/api/moods');
    moods = await response.json();
    renderMoods();
  } catch {
    moodGrid.innerHTML =
      '<p class="col-span-full text-center text-terracotta">Could not load moods. Is the server running?</p>';
  }
}

init();
