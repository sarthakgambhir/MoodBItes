# MoodBites — Mood-Based Recipe Recommender

Pick how you're feeling and get a recipe matched to your mood. Don't like the suggestion? Request another — you'll only see recipes you haven't been shown yet for that mood.

## Features

- 7 moods: Happy, Sad, Stressed, Romantic, Energetic, Cozy, Adventurous
- Random recipe per mood from a SQLite database
- "Show me another recipe" without repeats for the same session
- Clean UI built with HTML, CSS, JavaScript, and Tailwind CSS

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** SQLite (better-sqlite3)
- **Frontend:** HTML, CSS, JavaScript, Tailwind CSS

## Getting Started

```bash
npm install
npm run init-db   # optional — auto-seeds on first start
npm start
