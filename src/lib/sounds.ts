
export interface Sound {
  id: string;
  title: string;
  src: string;
}

export const sounds: Sound[] = [
  {
    id: "rain",
    title: "Rain",
    src: "https://www.soundjay.com/nature/rain-01.mp3",
  },
  {
    id: "clock",
    title: "Ticking Clock",
    src: "https://www.soundjay.com/clock/clock-ticking-1.mp3",
  },
  {
    id: "cat",
    title: "Purring Cat",
    src: "https://www.soundjay.com/animals/cat-purr-01.mp3",
  },
  {
    id: "ocean",
    title: "Ocean Waves",
    src: "https://www.soundjay.com/nature/ocean-wave-1.mp3",
  },
  {
    id: "forest",
    title: "Forest Sounds",
    src: "https://www.soundjay.com/nature/forest-01.mp3",
  },
];
