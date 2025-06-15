
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
    src: "https://cdn.pixabay.com/audio/2022/03/15/audio_51c636f12c.mp3",
  },
  {
    id: "ocean",
    title: "Ocean Waves",
    src: "https://www.soundjay.com/nature/ocean-wave-1.mp3",
  },
  {
    id: "forest",
    title: "Forest Sounds",
    src: "https://cdn.pixabay.com/audio/2022/10/21/audio_a72c1c619e.mp3",
  },
];
