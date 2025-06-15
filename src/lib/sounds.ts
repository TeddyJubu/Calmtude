
export interface Sound {
  id: string;
  title: string;
  src: string;
}

export const sounds: Sound[] = [
  {
    id: "rain",
    title: "Rain",
    src: "https://archive.org/download/Crickets_and_Rain/Crickets_and_Rain.mp3",
  },
  {
    id: "clock",
    title: "Ticking Clock",
    src: "https://archive.org/download/ticking-clock-sound/ticking-clock-sound.mp3",
  },
  {
    id: "cat",
    title: "Purring Cat",
    src: "https://archive.org/download/purr-of-a-cat/Purr-of-a-Cat.mp3",
  },
  {
    id: "ocean",
    title: "Ocean Waves",
    src: "https://archive.org/download/ocean-waves-crashing/ocean-waves-crashing.mp3",
  },
  {
    id: "forest",
    title: "Forest Sounds",
    src: "https://archive.org/download/ForestSound/Forest%20Sound.mp3",
  },
];
