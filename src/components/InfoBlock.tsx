import React from "react";
import styles from "@/styles/ModalCustom.module.css";

export type InfoBlockProps = {
  visible: boolean;
  player1: string;
  player2: string;
  score?: string;
  details?: string;
  townImg1?: string;
  heroImg1?: string;
  townImg2?: string;
  heroImg2?: string;
  winner?: 0 | 1 | 2;
  challenges?: string;
  align?: "left" | "right";
  left?: number;
  top?: number;
  date?: string;
  videoLink?: string;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: React.CSSProperties;
};

const InfoBlock: React.FC<InfoBlockProps> = ({
  visible,
  player1,
  player2,
  score,
  details,
  townImg1,
  heroImg1,
  townImg2,
  heroImg2,
  winner,
  challenges,
  align = "right",
  left = 0,
  top = 0,
  date,
  videoLink,
  className = "",
  onMouseEnter,
  onMouseLeave,
  style,
}) => {
  if (!visible) return null;
  const challengeList = (challenges || "").split("\n").filter(Boolean);
  return (
    <div
      className={`${styles.infoBlock} ${
        align === "right" ? styles.infoBlockRight : styles.infoBlockLeft
      } ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
    >
      <div className={styles.infoBlockRow}>
        {townImg1 && (
          <img
            src={townImg1}
            alt="Город 1"
            className={styles.infoBlockTownImg}
          />
        )}
        {heroImg1 && (
          <img
            src={heroImg1}
            alt="Герой 1"
            className={styles.infoBlockHeroImg}
          />
        )}
        <span
          className={
            winner === 1 ? styles.infoBlockWinner : styles.infoBlockLoser
          }
        >
          {player1}
          {winner === 1 && (
            <span title="Победитель" className={styles.infoBlockTrophy}>
              🏆
            </span>
          )}
        </span>
        {score && <span className={styles.infoBlockScore}>{score}</span>}
        <span
          className={
            winner === 2 ? styles.infoBlockWinner : styles.infoBlockLoser
          }
        >
          {player2}
          {winner === 2 && (
            <span title="Победитель" className={styles.infoBlockTrophy}>
              🏆
            </span>
          )}
        </span>
        {heroImg2 && (
          <img
            src={heroImg2}
            alt="Герой 2"
            className={styles.infoBlockHeroImg}
          />
        )}
        {townImg2 && (
          <img
            src={townImg2}
            alt="Город 2"
            className={styles.infoBlockTownImg}
          />
        )}
      </div>
      {videoLink && (
        <div className={styles.infoBlockVideoLink}>
          Летопись битвы:{" "}
          <a
            href={videoLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.infoBlockVideoAnchor}
          >
            ▶️
          </a>
        </div>
      )}
      {details && (
        <ul className={styles.infoBlockDetails}>
          {details.split("\n").map((line, i) => (
            <li key={i} className={styles.infoBlockDetailsItem}>
              {line}
            </li>
          ))}
        </ul>
      )}
      {challengeList.length > 0 && (
        <ul className={styles.infoBlockChallenges}>
          {challengeList.map((line, i) => (
            <li key={i} className={styles.infoBlockChallengeItem}>
              <span className={styles.infoBlockChallengeIcon}>🎯</span> {line}
            </li>
          ))}
        </ul>
      )}
      {date && <div className={styles.infoBlockDate}>Дата: {date}</div>}
    </div>
  );
};

export default InfoBlock;
