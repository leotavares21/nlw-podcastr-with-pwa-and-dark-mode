import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";
import { RiMoonClearLine, RiSunLine } from "react-icons/ri";

import styles from "./styles.module.scss";
import { usePlayer } from "../../contexts/PlayerContext";

export function Header() {
  const { changeMode, isDarkMode } = usePlayer();

  const currentDate = format(new Date(), "EEEEEE, d MMMM", {
    locale: ptBR,
  });

  return (
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="Podcastr" />
      <p>O melhor para você ouvir, sempre</p>
      <span>{currentDate}</span>
      <button
        type="button"
        onClick={changeMode}
        className={isDarkMode ? styles.moonColor :  styles.sunColor}
      >
        {isDarkMode ? <RiMoonClearLine /> : <RiSunLine />}
      </button>
    </header>
  );
}
