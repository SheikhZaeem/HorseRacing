import { defineStore } from 'pinia';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const useHorseStore = defineStore('horse', {
  state: () => ({
    allHorses: [],     //array of { id, name, color, condition }
    schedule: [],      //{ distance, horses: [horseId, ...] }
    roundTimes: [],    //[[ { id, rawTime }, … ], …] for each round
    results: []        //  { round: number, winnerName: string }
  }),
  actions: {
    generateHorses() {
      this.allHorses = [];
      for (let i = 1; i <= 20; i++) {
        this.allHorses.push({
          id: i,
          name: `Horse ${i}`,
          color: getRandomColor(),
          condition: Math.floor(Math.random() * 100) + 1
        });
      }
    },

    generateSchedule() {
      this.schedule = [];
      const distances = [1200, 1400, 1600, 1800, 2000, 2200];
      const horseIds = this.allHorses.map(h => h.id);

      for (let roundIdx = 0; roundIdx < distances.length; roundIdx++) {
        const shuffled = horseIds.slice().sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);
        this.schedule.push({
          distance: distances[roundIdx],
          horses: selected
        });
      }
    },

    computeAllRoundTimesAndWinners() {
        this.roundTimes = [];
        this.results = [];

        for (let i = 0; i < this.schedule.length; i++) {
            const round = this.schedule[i];
            const timesArr = round.horses.map(id => {
            const horse = this.allHorses.find(h => h.id === id);
            const raw = round.distance / horse.condition + Math.random() * 0.8;  //prevent ties
            return { id, rawTime: raw };
            });


            const sorted = [...timesArr].sort((a, b) => a.rawTime - b.rawTime);
            
            //gettng top 3 horses
            const top3 = sorted.slice(0, 3).map(entry => {
                const horse = this.allHorses.find(h => h.id === entry.id);
                return {
                    id: horse.id,
                    name: horse.name,
                    color: horse.color,
                    condition: horse.condition
                };
                });

            const winnerHorse = this.allHorses.find(h => h.id === sorted[0].id);

            this.roundTimes.push(timesArr);
                this.results.push({
                round: i + 1,
                winnerName: winnerHorse.name,
                top3: top3  
                });
        }
    }
  }
});
