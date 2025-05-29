# Horse Racing Game 🏇 (Vue 3 + Pinia)

This is a horse racing simulation built using **Vue 3**, **Pinia**, and **CSS animations**. It generates 20 horses with random attributes, schedules 6 race rounds, and animates each race based on the horses' calculated performance.

## Features of Game

- Generates **20 horses** with unique names, colors, and "condition" (speed factor)
- Automatically schedules **6 race rounds** with random participants and fixed distances
- Calculates individual horse performance using a realistic time formula
- Animates each race: horses move at speeds proportional to their computed race time
- Displays **one round at a time**, resetting animations between rounds
- Final **results panel** shows winners of all rounds


## 📁 Folder Structure

HorseRacing/
├── README.md             ← (You are here)
├── package.json          ← Project metadata & dependencies
├── public/
│   └── index.html        ← Vue’s main HTML template
└── src/
    ├── main.js           ← App entry point (creates Vue app + Pinia store)
    ├── App.vue           ← Root component (buttons, schedule, race container)
    ├── store.js          ← Pinia store (horse generation, schedule, times)
    └── components/
        ├── Horse.vue     ← Single‐horse component (animates a colored block)
        ├── RaceRound.vue ← Displays 10 horses running a single round
        └── Results.vue   ← Lists winners of each round
        
---

## How the game works

1. **Generate Horses & Schedule**
   - 20 horses are created with random `condition` values (1–100) and unique colors
   - 6 rounds are scheduled, each selecting 10 random horses with predefined distances
   - Race times are computed using:
     ```
     rawTime = distance / condition + randomJitter
     ```
   - Fastest horse in each round is determined and stored

2. **Run Race**
   - Each round is displayed one at a time using `<RaceRound />`
   - Horses animate using `transform: translateX(...)` with calculated `transition-duration` based on their rawTime
   - Each round resets before the next begins
   - Winners are shown in the final results section

---

## Setup & Run Locally

### Prerequisites

- Node.js (v14+)
- npm

### Install and Run

```bash
# Clone the repo
git clone https://github.com/your-username/HorseRacing.git
cd HorseRacing

# Install dependencies
npm install

# Start local server
npm run serve

The app will be running at http://localhost:8080

## Tech Stack
Vue 3 – Composition API, Single File Components

Pinia – State management

HTML5 + CSS3 for layout and animation

JavaScript (ES6+) for game logic

## Build
npm run build

