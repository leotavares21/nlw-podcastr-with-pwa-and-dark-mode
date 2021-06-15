import { createContext, useState, ReactNode, useContext } from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  isPlayerOpen: boolean;
  isDarkMode: boolean;
  width: number;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  setPlayingState: (state: boolean) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  playNext: () => void;
  playPrevious: () => void;
  clearPlayerState: () => void;
  showPlayer: () => void;
  setWidth: (width: number) => void;
  changeMode: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
};
export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode; // definindo tipagem para children, ou seja ele pode receber qualquer coisa que react recebe
};

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [width, setWidth] = useState(null);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  // função para passar pro proximo episodio

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsPlayerOpen(!isPlayerOpen);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      );
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  function showPlayer() {
    setIsPlayerOpen(!isPlayerOpen);
  }

  function changeMode() {
    const $root = document.querySelector("html");
    $root.classList.toggle("dark-mode");
    setIsDarkMode(!isDarkMode);
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        isLooping,
        isShuffling,
        isPlayerOpen,
        isDarkMode,
        width,
        play,
        playList,
        playNext,
        playPrevious,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setPlayingState,
        showPlayer,
        setWidth,
        changeMode,
        hasPrevious,
        hasNext,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  return useContext(PlayerContext);
};
