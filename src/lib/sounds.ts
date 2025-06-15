
export interface Sound {
  id: string;
  title: string;
  src: string;
}

export const sounds: Sound[] = [
  {
    id: "rain",
    title: "Rain",
    src: "https://raw.githubusercontent.com/k-go-h/mp3-sounds/main/sound/rain-sound.mp3",
  },
  {
    id: "clock",
    title: "Ticking Clock",
    src: "https://raw.githubusercontent.com/k-go-h/mp3-sounds/main/sound/clock-ticking-sound.mp3",
  },
  {
    id: "cat",
    title: "Purring Cat",
    src: "https://raw.githubusercontent.com/HitSmash/howler-demo/master/audio/cat.mp3",
  },
  {
    id: "ocean",
    title: "Ocean Waves",
    src: "https://raw.githubusercontent.com/k-go-h/mp3-sounds/main/sound/ocean-waves-sound.mp3",
  },
  {
    id: "forest",
    title: "Forest Sounds",
    src: "https://raw.githubusercontent.com/k-go-h/mp3-sounds/main/sound/forest-sound.mp3",
  },
];
