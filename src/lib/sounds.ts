export interface Sound {
  id: string;
  title: string;
  src: string;
}

export const sounds: Sound[] = [
  {
    id: "rain",
    title: "Rain",
    src: "/audio/sound-effects/raindrops.mp3",
  },
  {
    id: "clock",
    title: "Ticking Clock",
    src: "/audio/rooted-tree.mp3",
  },
  {
    id: "cat",
    title: "Purring Cat",
    src: "/audio/rooted-tree.mp3",
  },
  {
    id: "ocean",
    title: "Ocean Waves",
    src: "/audio/rooted-tree.mp3",
  },
  {
    id: "forest",
    title: "Forest Sounds",
    src: "/audio/rooted-tree.mp3",
  },
];
