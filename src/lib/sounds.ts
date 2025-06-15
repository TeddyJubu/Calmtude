
export interface Sound {
  id: string;
  title: string;
  src: string;
}

export const sounds: Sound[] = [
  {
    id: "rain",
    title: "Rain",
    src: "https://cdn.pixabay.com/audio/2022/10/18/audio_29323c2a8b.mp3",
  },
  {
    id: "clock",
    title: "Ticking Clock",
    src: "https://cdn.pixabay.com/audio/2023/09/06/audio_9855de79f3.mp3",
  },
  {
    id: "cat",
    title: "Purring Cat",
    src: "https://cdn.pixabay.com/audio/2022/03/15/audio_51c636f12c.mp3",
  },
  {
    id: "ocean",
    title: "Ocean Waves",
    src: "https://cdn.pixabay.com/audio/2024/02/09/audio_2dc1a1c312.mp3",
  },
  {
    id: "forest",
    title: "Forest Sounds",
    src: "https://cdn.pixabay.com/audio/2022/11/17/audio_88c724d142.mp3",
  },
];
