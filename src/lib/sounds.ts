
export interface Sound {
  id: string;
  title: string;
  src: string;
}

export const sounds: Sound[] = [
  {
    id: "rain",
    title: "Rain",
    src: "https://cdn.pixabay.com/audio/2022/08/14/audio_b29337a552.mp3",
  },
  {
    id: "clock",
    title: "Ticking Clock",
    src: "https://cdn.pixabay.com/audio/2022/05/27/audio_189153e39c.mp3",
  },
  {
    id: "cat",
    title: "Purring Cat",
    src: "https://cdn.pixabay.com/audio/2022/03/15/audio_51c636f12c.mp3",
  },
  {
    id: "ocean",
    title: "Ocean Waves",
    src: "https://cdn.pixabay.com/audio/2023/09/11/audio_417050e501.mp3",
  },
  {
    id: "forest",
    title: "Forest Sounds",
    src: "https://cdn.pixabay.com/audio/2022/10/21/audio_a72c1c619e.mp3",
  },
];
