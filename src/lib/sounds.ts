
export interface Sound {
  id: string;
  title: string;
  src: string;
}

export const sounds: Sound[] = [
  {
    id: "rain",
    title: "Rain",
    src: "https://cdn.pixabay.com/audio/2022/10/21/audio_18c5e32b69.mp3",
  },
  {
    id: "clock",
    title: "Ticking Clock",
    src: "https://cdn.pixabay.com/audio/2022/05/27/audio_15df91a6d4.mp3",
  },
  {
    id: "cat",
    title: "Purring Cat",
    src: "https://cdn.pixabay.com/audio/2022/02/01/audio_eb30e700a9.mp3",
  },
  {
    id: "ocean",
    title: "Ocean Waves",
    src: "https://cdn.pixabay.com/audio/2023/09/10/audio_51a70ccc76.mp3",
  },
  {
    id: "forest",
    title: "Forest Sounds",
    src: "https://cdn.pixabay.com/audio/2022/08/04/audio_34bba1723a.mp3",
  },
];
