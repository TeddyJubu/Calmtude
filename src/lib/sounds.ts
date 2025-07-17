
export interface Sound {
  id: string;
  title: string;
  src: string;
}

export const sounds: Sound[] = [
  {
    id: "rain",
    title: "Rain",
    src: "/audio/raindrops.mp3",
  },
  {
    id: "clock",
    title: "Ticking Clock",
    src: "/audio/ticking-clock.mp3",
  },
  {
    id: "cat",
    title: "Eating Kitty",
    src: "/audio/cat-eating-dry-food.mp3",
  },
  {
    id: "ocean",
    title: "Ocean Waves",
    src: "/audio/ocean-waves.mp3",
  },
  {
    id: "forest",
    title: "Forest Sounds",
    src: "/audio/forrest.mp3",
  },
];
