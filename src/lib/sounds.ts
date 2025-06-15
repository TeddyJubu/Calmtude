
export interface Sound {
  id: string;
  title: string;
  src: string;
}

export const sounds: Sound[] = [
  {
    id: "rain",
    title: "Rain",
    src: "https://ia800202.us.archive.org/21/items/Rain1/Rain1.mp3",
  },
  {
    id: "clock",
    title: "Ticking Clock",
    src: "https://ia800209.us.archive.org/12/items/TickingClock/TickingClock.mp3",
  },
  {
    id: "cat",
    title: "Purring Cat",
    src: "https://ia902604.us.archive.org/19/items/purring-cat-sound/purring-cat-sound.mp3",
  },
  {
    id: "ocean",
    title: "Ocean Waves",
    src: "https://ia800204.us.archive.org/1/items/OceanWaves/OceanWaves.mp3",
  },
  {
    id: "forest",
    title: "Forest Sounds",
    src: "https://ia800203.us.archive.org/30/items/ForestAmbience/ForestAmbience.mp3",
  },
];
