# Plate — Calorie Tracking PWA

Plate is a responsive, artistic, and warm calorie tracking Progressive Web App (PWA) designed to make healthy eating feel joyful instead of clinical. Inspired by editorial poster design, print layouts, and bold geometric illustrations.

## Project Structure

All files are located on your Desktop under `html/plate/`:

- `index.html`: The HTML5 app shell importing modules and binding modal UI.
- `index.css`: Design System styles, colors, layouts, animations, and the global paper-grain texture.
- `app.js`: State manager, client-side routing, and event controllers.
- `database.js`: Indian vegetarian food catalog containing hundreds of items, macros, and sources.
- `illustrations.js`: SVG visual library rendering food shapes and decorations.
- `components.js`: Layout drawer containing CaloriePlate, ProteinBar, Recommendations, Weekly Calorie Chart, and Calendar Heatmap.
- `supabase.js`: Offline-first database connection and sync client.
- `sw.js`: Service worker caching static assets for offline capability.
- `manifest.json`: Web app manifest details for installation.
- `icon.svg`: Vector PWA icon drawing the dinner plate.
- `server.js`: Zero-dependency static server running on `agy-node`.

## Setup & Running Locally

Since standard system Node is not installed, the server uses the built-in `agy-node` binary bundled with Antigravity.

1. Open your terminal.
2. Start the local server:
   ```bash
   "/Users/kaynadesai/Library/Application Support/Antigravity/bin/agy-node" "/Users/kaynadesai/Desktop/html/plate/server.js"
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8080/
   ```

## Key Features

- **Dynamic Calorie Plate**: The main dinner plate behaves as today's artwork. It fills up gradually based on calories, and visually displays custom illustrations of logged foods.
- **Vegetarian Meal Recommendations**: Suggestions based on remaining calories that read like a warm, supportive catalog.
- **Streak & Calorie Insights**: Custom editorial SVG charts and heatmaps tracking streaks and monthly calorie targets.
- **Offline First**: All user profile variables, streak indexes, and logged meals save immediately to the local browser cache.
- **Supabase Integration**: When you supply your Supabase project parameters in the settings tab, the app automatically transitions to remote data persistence and handles background queuing.
