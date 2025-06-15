
export interface Sound {
  id: string;
  title: string;
  src: string;
}

export const sounds: Sound[] = [
  {
    id: "rain",
    title: "Rain",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  },
  {
    id: "clock",
    title: "Ticking Clock",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
  {
    id: "cat",
    title: "Purring Cat",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: "ocean",
    title: "Ocean Waves",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "forest",
    title: "Forest Sounds",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];
