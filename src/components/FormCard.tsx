import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "@/styles/ModalCustom.module.css";
import formCardStyles from "./FormCard.module.css";

export type FormCardProps = {
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
  editable?: boolean;
  date?: string;
  videoLink?: string;
  onChange?: (data: {
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
    date?: string;
    videoLink?: string;
  }) => void;
};

// Классическое распределение городов и героев (с учётом Fabric/Factory)
const townImages = [
  { label: "Stronghold", value: "/img/Stronghold.gif", key: "stronghold" },
  { label: "Castle", value: "/img/Castle.gif", key: "castle" },
  { label: "Dungeon", value: "/img/Dungeon.gif", key: "dungeon" },
  { label: "Fortress", value: "/img/Fortress.gif", key: "fortress" },
  { label: "Rampart", value: "/img/Rampart.gif", key: "rampart" },
  { label: "Tower", value: "/img/tower.png", key: "tower" },
  { label: "Inferno", value: "/img/Inferno.gif", key: "inferno" },
  { label: "Necropolis", value: "/img/Necropolis.gif", key: "necropolis" },
  { label: "Conflux", value: "/img/Conflux.gif", key: "conflux" },
  { label: "Cove", value: "/img/Cove.gif", key: "cove" },
  { label: "Fabric", value: "/img/Fabric.gif", key: "fabric" },
];

// Массив героев с городом (city: ключ из townImages)
const heroImages = [
  // Stronghold
  { label: "Crag Hack", value: "/img/CragHack.gif", city: "stronghold" },
  { label: "Jabarkas", value: "/img/Jabarkas.gif", city: "stronghold" },
  { label: "Gurnisson", value: "/img/Gurnisson.png", city: "stronghold" },
  { label: "Gretar", value: "/img/Grethen.png", city: "stronghold" },
  { label: "Dessa", value: "/img/Dessa.png", city: "stronghold" },
  { label: "Gird", value: "/img/Gird.png", city: "stronghold" },
  { label: "Vey", value: "/img/Vei.png", city: "stronghold" },
  { label: "Shiva", value: "/img/Shiva.png", city: "stronghold" },
  { label: "Yog", value: "/img/Iog.png", city: "stronghold" },
  { label: "Boragus", value: "/img/Boragus.png", city: "stronghold" },
  { label: "Tiraksor", value: "/img/Tiraksor.png", city: "stronghold" },
  { label: "Gundula", value: "/img/Gundula.png", city: "stronghold" },
  { label: "Zubin", value: "/img/Zubin.png", city: "stronghold" },
  { label: "Oris", value: "/img/Oris.png", city: "stronghold" },
  { label: "Sorug", value: "/img/Sorug.png", city: "stronghold" },
  { label: "Terek", value: "/img/Terek.png", city: "stronghold" },

  // Castle
  { label: "Christian", value: "/img/Kristian.png", city: "castle" },
  { label: "Edric", value: "/img/Adrik.png", city: "castle" },
  { label: "Adela", value: "/img/Adella.png", city: "castle" },
  { label: "Sonya", value: "/img/Sonya.png", city: "castle" },
  { label: "Sir Mullich", value: "/img/SirMullich.png", city: "castle" },
  { label: "Valeska", value: "/img/Valeska.png", city: "castle" },
  { label: "Orrin", value: "/img/Orrin.png", city: "castle" },
  { label: "Silvia", value: "/img/Silvia.png", city: "castle" },
  { label: "Sorsha", value: "/img/Sorsha.png", city: "castle" },
  { label: "Tiris", value: "/img/Tiris.png", city: "castle" },
  { label: "Adelaida", value: "/img/Adelaida.png", city: "castle" },
  { label: "Ingam", value: "/img/Ingam.png", city: "castle" },
  { label: "Katbert", value: "/img/Katbert.png", city: "castle" },
  { label: "Kaitlin", value: "/img/Kaitlin.png", city: "castle" },
  { label: "Loinis", value: "/img/Loinis.png", city: "castle" },
  { label: "Rion", value: "/img/Rion.png", city: "castle" },
  // Tower
  { label: "Solmyr", value: "/img/Solmir.gif", city: "tower" },
  { label: "Astral", value: "/img/Astral.png", city: "tower" },
  { label: "Torosar", value: "/img/Torosar.png", city: "tower" },
  { label: "Jozefina", value: "/img/Жозефина.png", city: "tower" },
  { label: "Tan", value: "/img/Tan.png", city: "tower" },
  { label: "Dermit", value: "/img/Dermit.png", city: "tower" },
  { label: "Rissa", value: "/img/Rissa.png", city: "tower" },
  { label: "Fafner", value: "/img/Fanfir.png", city: "tower" },
  { label: "Iona", value: "/img/Иона.png", city: "tower" },
  { label: "Pikedram", value: "/img/Пикедрам.png", city: "tower" },
  { label: "Nila", value: "/img/Нила.png", city: "tower" },
  { label: "Saira", value: "/img/Saira.png", city: "tower" },
  { label: "Serena", value: "/img/Serena.png", city: "tower" },
  { label: "Teodorus", value: "/img/Teodorus.png", city: "tower" },
  { label: "Halon", value: "/img/Halon.png", city: "tower" },
  { label: "Aine", value: "/img/Aine.png", city: "tower" },

  // Dungeon
  { label: "Shakti", value: "/img/Shakti.png", city: "dungeon" },
  { label: "Lorelei", value: "/img/Lorelei.png", city: "dungeon" },
  { label: "Dace", value: "/img/Daice.png", city: "dungeon" },
  { label: "Ajit", value: "/img/Adjit.png", city: "dungeon" },
  { label: "Gunnar", value: "/img/Gunar.png", city: "dungeon" },
  { label: "Yager", value: "/img/Yager.png", city: "dungeon" },
  { label: "Arluck", value: "/img/Arluck.png", city: "dungeon" },
  { label: "Damakon", value: "/img/Damakon.png", city: "dungeon" },
  { label: "Lorelei", value: "/img/Lorelei.png", city: "dungeon" },
  { label: "Sinka", value: "/img/Sinka.png", city: "dungeon" },
  { label: "SashaVoodoosh", value: "/img/Alamar.png", city: "dungeon" },
  { label: "Geon", value: "/img/Geon.png", city: "dungeon" },
  { label: "DarkStorm", value: "/img/Darkstorm.png", city: "dungeon" },
  { label: "Djedit", value: "/img/Djedit.png", city: "dungeon" },
  { label: "Dimer", value: "/img/Dimer.png", city: "dungeon" },
  { label: "Sefinrot", value: "/img/Sefinrot.png", city: "dungeon" },
  // Rampart
  { label: "Ivor", value: "/img/Ivor.png", city: "rampart" },
  { label: "Kairi", value: "/img/Kairi.png", city: "rampart" },
  { label: "Klansy", value: "/img/Kansli.png", city: "rampart" },
  { label: "Mefala", value: "/img/Mefala.png", city: "rampart" },
  { label: "Riland", value: "/img/Riland.png", city: "rampart" },
  { label: "Torgrim", value: "/img/Torgrim.png", city: "rampart" },
  { label: "Ufertin", value: "/img/Ufertin.png", city: "rampart" },
  { label: "Yanova", value: "/img/Yanova.png", city: "rampart" },
  { label: "Alagar", value: "/img/Alagar.png", city: "rampart" },
  { label: "Aeris", value: "/img/Aeris.png", city: "rampart" },
  { label: "Djam", value: "/img/Djam.png", city: "rampart" },
  { label: "Koronius", value: "/img/Koronius.png", city: "rampart" },
  { label: "Malkom", value: "/img/Malkom.png", city: "rampart" },
  { label: "Melodia", value: "/img/Melodia.png", city: "rampart" },
  { label: "Uland", value: "/img/Uland.png", city: "rampart" },
  { label: "Alishar", value: "/img/Alishar.png", city: "rampart" },

  // Inferno
  { label: "Olema", value: "/img/Olema.png", city: "inferno" },
  { label: "Xyron", value: "/img/Xyron.png", city: "inferno" },
  { label: "Ignat", value: "/img/Ignat.png", city: "inferno" },
  { label: "Kalkh", value: "/img/Kalkh.png", city: "inferno" },
  { label: "Marius", value: "/img/Marius.png", city: "inferno" },
  { label: "Nimus", value: "/img/Nimus.png", city: "inferno" },
  { label: "Oktavia", value: "/img/Oktavia.png", city: "inferno" },
  { label: "Paira", value: "/img/Paira.png", city: "inferno" },
  { label: "Rashka", value: "/img/Rashka.png", city: "inferno" },
  { label: "Fiona", value: "/img/Fiona.png", city: "inferno" },
  { label: "Aiden", value: "/img/Aiden.png", city: "inferno" },
  { label: "Aksis", value: "/img/Aksis.png", city: "inferno" },
  { label: "Zidar", value: "/img/Zidar.png", city: "inferno" },
  { label: "Kalid", value: "/img/Kalid.png", city: "inferno" },
  { label: "Ksarfaks", value: "/img/Ksarfaks.png", city: "inferno" },
  { label: "Ash", value: "/img/Pepel.png", city: "inferno" },
  // Necropolis
  { label: "Thant", value: "/img/Thant.png", city: "necropolis" },
  { label: "Vidomina", value: "/img/Vidomina.png", city: "necropolis" },
  { label: "Vokial", value: "/img/Vokial.png", city: "necropolis" },
  { label: "Galtran", value: "/img/Galtran.png", city: "necropolis" },
  { label: "Isra", value: "/img/Isra.png", city: "necropolis" },
  { label: "Klavius", value: "/img/Klavius.png", city: "necropolis" },
  { label: "Moander", value: "/img/Moander.png", city: "necropolis" },
  { label: "Straker", value: "/img/Stalker.png", city: "necropolis" },
  { label: "Tamika", value: "/img/Tamika.png", city: "necropolis" },
  { label: "Charna", value: "/img/Charna.png", city: "necropolis" },
  { label: "Ksi", value: "/img/Ksi.png", city: "necropolis" },
  { label: "Nagash", value: "/img/Nagash.png", city: "necropolis" },
  { label: "Nimbus", value: "/img/Nimbus.png", city: "necropolis" },
  { label: "Sandro", value: "/img/Sandro.png", city: "necropolis" },
  { label: "Septina", value: "/img/Septina.png", city: "necropolis" },
  { label: "Aislin", value: "/img/Aislin.png", city: "necropolis" },
  // Fortress
  { label: "Tazar", value: "/img/Tazar.gif", city: "fortress" },
  { label: "Alkin", value: "/img/Alkin.png", city: "fortress" },
  { label: "Bron", value: "/img/Bron.png", city: "fortress" },
  { label: "Brohild", value: "/img/Bronhild.png", city: "fortress" },
  { label: "Vistan", value: "/img/Vistan.png", city: "fortress" },
  { label: "Gerwolf", value: "/img/Gerwolf.png", city: "fortress" },
  { label: "Draikon", value: "/img/Draikon.png", city: "fortress" },
  { label: "Korbak", value: "/img/Korbak.png", city: "fortress" },
  { label: "Andra", value: "/img/Andra.png", city: "fortress" },
  { label: "Verdish", value: "/img/Verdish.png", city: "fortress" },
  { label: "Voi", value: "/img/Voi.png", city: "fortress" },
  { label: "Merist", value: "/img/Merist.png", city: "fortress" },
  { label: "Mirlanda", value: "/img/Mirlanda.png", city: "fortress" },
  { label: "Rozik", value: "/img/Rozik.png", city: "fortress" },
  { label: "Stig", value: "/img/Stig.png", city: "fortress" },
  { label: "Tiva", value: "/img/Tiva.png", city: "fortress" },
  // Conflux
  { label: "Luna", value: "/img/Luna.png", city: "conflux" },
  { label: "Ignissa", value: "/img/Ignissa.png", city: "conflux" },
  { label: "Kalt", value: "/img/Kalt.png", city: "conflux" },
  { label: "Lakus", value: "/img/Lakus.png", city: "conflux" },
  { label: "Monner", value: "/img/Monner.png", city: "conflux" },
  { label: "Passisa", value: "/img/Passisa.png", city: "conflux" },
  { label: "Tunar", value: "/img/Tunar.png", city: "conflux" },
  { label: "Fiur", value: "/img/Fiur.png", city: "conflux" },
  { label: "Erdamon", value: "/img/Erdamon.png", city: "conflux" },
  { label: "Brissa", value: "/img/Brissa.png", city: "conflux" },
  { label: "Grindan", value: "/img/Grindan.png", city: "conflux" },
  { label: "Djelar", value: "/img/Djelar.png", city: "conflux" },
  { label: "Intei", value: "/img/Intei.png", city: "conflux" },
  { label: "Labeta", value: "/img/Labeta.png", city: "conflux" },
  { label: "Ciel", value: "/img/Ciel.png", city: "conflux" },
  { label: "Anein", value: "/img/Anein.png", city: "conflux" },
  // Cove
  { label: "Anabel", value: "/img/Anabel.png", city: "cove" },
  { label: "Andal", value: "/img/Andal.png", city: "cove" },
  { label: "Derek", value: "/img/Derek.png", city: "cove" },
  { label: "Miriam", value: "/img/Miriam.png", city: "cove" },
  { label: "Astra", value: "/img/Astra.png", city: "cove" },
  { label: "Dargem", value: "/img/Dargem.png", city: "cove" },
  { label: "Djeremy", value: "/img/Djeremy.png", city: "cove" },
  { label: "Zilar", value: "/img/Zilar.png", city: "cove" },
  { label: "Illor", value: "/img/Illor.png", city: "cove" },
  { label: "Kasmetra", value: "/img/Kasmetra.png", city: "cove" },
  { label: "Kasseopea", value: "/img/Kasseopea.png", city: "cove" },
  { label: "Korkes", value: "/img/Korkes.png", city: "cove" },
  { label: "Lina", value: "/img/Lina.png", city: "cove" },
  { label: "Manfred", value: "/img/Manfred.png", city: "cove" },
  { label: "Spint", value: "/img/Spint.png", city: "cove" },
  { label: "Elmor", value: "/img/Elmor.png", city: "cove" },
  { label: "Eovacii", value: "/img/Eovacii.png", city: "cove" },
  // Fabric/Factory (Horn of the Abyss)
  { label: "Sam", value: "/img/Sam.png", city: "fabric" },
  { label: "Agar", value: "/img/Agar.png", city: "fabric" },
  { label: "Bertram", value: "/img/Bertram.png", city: "fabric" },
  { label: "Tancred", value: "/img/Tankred.png", city: "fabric" },
  { label: "Floriber", value: "/img/Floriber.png", city: "fabric" },
  { label: "Melhior", value: "/img/Melhior.png", city: "fabric" },
  { label: "Morton", value: "/img/Morton.png", city: "fabric" },
  { label: "Victoria", value: "/img/Victoria.png", city: "fabric" },
  { label: "Wynona", value: "/img/Vainona.png", city: "fabric" },
  { label: "Esvita", value: "/img/Esvita.png", city: "fabric" },
  { label: "Celestina", value: "/img/Selestina.png", city: "fabric" },
  { label: "Dury", value: "/img/Diuri.png", city: "fabric" },
  { label: "Racmont", value: "/img/Racmont.png", city: "fabric" },
  { label: "Genrietta", value: "/img/Genrietta.png", city: "fabric" },
  { label: "Zif", value: "/img/Zif.png", city: "fabric" },
  { label: "Todd", value: "/img/Todd.png", city: "fabric" },
];

// Кастомный Input компонент
const Input: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}> = ({ value, onChange, placeholder, style }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      padding: "8px 12px",
      border: "1px solid #d9d9d9",
      borderRadius: "6px",
      fontSize: "14px",
      outline: "none",
      ...style,
    }}
  />
);

// Кастомный TextArea компонент
const TextArea: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}> = ({ value, onChange, placeholder, rows = 4 }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    style={{
      padding: "8px 12px",
      border: "1px solidrgb(70, 63, 63)",
      borderRadius: "6px",
      fontSize: "14px",
      outline: "none",
      resize: "vertical",
      width: "100%",
    }}
  />
);

// Кастомный Button компонент
const Button: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  type?: "primary" | "default";
}> = ({ onClick, children, type = "default" }) => (
  <button
    onClick={onClick}
    style={{
      padding: "8px 16px",
      border: type === "primary" ? "none" : "1px solid #d9d9d9",
      borderRadius: "6px",
      fontSize: "14px",
      cursor: "pointer",
      backgroundColor: type === "primary" ? "#1890ff" : "#fff",
      color: type === "primary" ? "#fff" : "#000",
      marginRight: "8px",
    }}
  >
    {children}
  </button>
);

// Кастомное модальное окно
const Modal: React.FC<{
  open: boolean;
  onCancel: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}> = ({ open, onCancel, title, children, footer }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalTitle}>
          {title}
          <button className={styles.modalClose} onClick={onCancel}>
            ×
          </button>
        </div>
        <div style={{ marginBottom: "16px" }}>{children}</div>
        {footer && <div style={{ textAlign: "right" }}>{footer}</div>}
      </div>
    </div>,
    typeof window !== "undefined" ? document.body : (null as any)
  );
};

// Простой блок с информацией для обычных пользователей
const InfoBlock: React.FC<{
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
}> = ({
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

// Вспомогательная функция для фильтрации героев по городу
const getHeroesByTown = (townImg: string) => {
  const town = townImages.find((t) => t.value === townImg);
  if (!town) return [];
  return heroImages.filter((h) => h.city === town.key);
};

const FormCard: React.FC<FormCardProps> = ({
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
  editable,
  date,
  videoLink,
  onChange,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [infoAlign, setInfoAlign] = useState<"left" | "right">("right");
  const [infoPos, setInfoPos] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });
  const cardRef = useRef<HTMLDivElement>(null);
  const [editData, setEditData] = useState({
    player1,
    player2,
    score: score || "",
    details: details || "",
    townImg1: townImg1 || "",
    heroImg1: heroImg1 || "",
    townImg2: townImg2 || "",
    heroImg2: heroImg2 || "",
    winner: (winner ?? 0) as 0 | 1 | 2,
    challenges: challenges || "",
    date: date || "",
    videoLink: videoLink || "",
  });
  const [cardHovered, setCardHovered] = useState(false);
  const [infoHovered, setInfoHovered] = useState(false);

  const handleModalOpen = () => {
    setEditData({
      player1,
      player2,
      score: score || "",
      details: details || "",
      townImg1: townImg1 || "",
      heroImg1: heroImg1 || "",
      townImg2: townImg2 || "",
      heroImg2: heroImg2 || "",
      winner: (winner ?? 0) as 0 | 1 | 2,
      challenges: challenges || "",
      date: date || "",
      videoLink: videoLink || "",
    });
    setModalOpen(true);
  };

  const handleModalClose = () => setModalOpen(false);

  const handleSave = () => {
    onChange?.({
      ...editData,
      winner: Number(editData.winner) as 0 | 1 | 2,
    });
    setModalOpen(false);
  };

  // Показывать инфоблок только при наведении на форму, но не закрывать по клику на форму
  const showInfo = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const align =
        rect.left + rect.width / 2 > window.innerWidth / 2 ? "left" : "right";
      setInfoAlign(align);
    }
    setInfoVisible(true);
  };
  // Не скрываем инфоблок по клику на форму
  const hideInfo = (e?: React.MouseEvent) => {
    // Если клик был внутри инфоблока — не скрывать
    if (e && (e.target as HTMLElement).closest(".info-block")) return;
    setInfoVisible(false);
  };

  // В форме выводим мишени
  const challengeCount = (editData.challenges || "")
    .split("\n")
    .filter(Boolean).length;

  return (
    <div
      className={formCardStyles.card}
      ref={cardRef}
      onClick={editable ? handleModalOpen : !editable ? showInfo : undefined}
      onMouseEnter={() => {
        setCardHovered(true);
        if (!editable) showInfo();
      }}
      onMouseLeave={() => {
        setCardHovered(false);
        if (!editable) hideInfo();
      }}
    >
      {/* Мишени над формой */}
      {challengeCount > 0 && (
        <span className={formCardStyles.challengesAbove}>
          {Array.from({ length: challengeCount }).map((_, i) => (
            <span key={i}>🎯</span>
          ))}
        </span>
      )}
      <div className={formCardStyles.playersBlock}>
        <span className={formCardStyles.player}>{player1}</span>
        <span className={formCardStyles.player}>{player2}</span>
      </div>
      {/* Информационный блок для обычных пользователей */}
      {!editable && (
        <InfoBlock
          visible={infoVisible}
          player1={player1}
          player2={player2}
          score={score}
          details={details}
          townImg1={townImg1}
          heroImg1={heroImg1}
          townImg2={townImg2}
          heroImg2={heroImg2}
          winner={winner}
          challenges={challenges}
          align={infoAlign}
          left={0}
          top={0}
          date={editData.date || date}
          videoLink={editData.videoLink || videoLink}
          className={""}
          onMouseEnter={() => setInfoHovered(true)}
          onMouseLeave={() => {
            setInfoHovered(false);
            hideInfo();
          }}
          style={{}}
        />
      )}
      {/* Модальное окно для админа */}
      <Modal
        open={modalOpen}
        onCancel={handleModalClose}
        title={
          editable ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Input
                value={editData.player1}
                onChange={(e) =>
                  setEditData((d) => ({ ...d, player1: e.target.value }))
                }
                style={{ width: 120 }}
                placeholder="Игрок 1"
              />
              <Input
                value={editData.score}
                onChange={(e) =>
                  setEditData((d) => ({ ...d, score: e.target.value }))
                }
                style={{ width: 50 }}
                placeholder="Счёт"
              />
              <Input
                value={editData.player2}
                onChange={(e) =>
                  setEditData((d) => ({ ...d, player2: e.target.value }))
                }
                style={{ width: 120 }}
                placeholder="Игрок 2"
              />
            </div>
          ) : (
            <span>
              {player1} <b>{score}</b> {player2}
            </span>
          )
        }
        footer={
          editable
            ? [
                <Button key="save" type="primary" onClick={handleSave}>
                  Сохранить
                </Button>,
              ]
            : undefined
        }
      >
        {editable ? (
          <>
            <label style={{ display: "block", marginBottom: 4 }}>
              Город 1:
            </label>
            <select
              value={editData.townImg1}
              onChange={(e) =>
                setEditData((d) => ({ ...d, townImg1: e.target.value }))
              }
              style={{
                marginBottom: 8,
                width: "100%",
                padding: 6,
                borderRadius: 6,
              }}
            >
              <option value="">Выберите город</option>
              {townImages.map((img) => (
                <option key={img.value} value={img.value}>
                  {img.label}
                </option>
              ))}
            </select>
            <label style={{ display: "block", marginBottom: 4 }}>
              Герой 1:
            </label>
            <select
              value={editData.heroImg1}
              onChange={(e) =>
                setEditData((d) => ({ ...d, heroImg1: e.target.value }))
              }
              style={{
                marginBottom: 8,
                width: "100%",
                padding: 6,
                borderRadius: 6,
              }}
            >
              <option value="">Выберите героя</option>
              {getHeroesByTown(editData.townImg1).map((img) => (
                <option key={img.value} value={img.value}>
                  {img.label}
                </option>
              ))}
            </select>
            <label style={{ display: "block", marginBottom: 4 }}>
              Город 2:
            </label>
            <select
              value={editData.townImg2}
              onChange={(e) =>
                setEditData((d) => ({ ...d, townImg2: e.target.value }))
              }
              style={{
                marginBottom: 8,
                width: "100%",
                padding: 6,
                borderRadius: 6,
              }}
            >
              <option value="">Выберите город</option>
              {townImages.map((img) => (
                <option key={img.value} value={img.value}>
                  {img.label}
                </option>
              ))}
            </select>
            <label style={{ display: "block", marginBottom: 4 }}>
              Герой 2:
            </label>
            <select
              value={editData.heroImg2}
              onChange={(e) =>
                setEditData((d) => ({ ...d, heroImg2: e.target.value }))
              }
              style={{
                marginBottom: 8,
                width: "100%",
                padding: 6,
                borderRadius: 6,
              }}
            >
              <option value="">Выберите героя</option>
              {getHeroesByTown(editData.townImg2).map((img) => (
                <option key={img.value} value={img.value}>
                  {img.label}
                </option>
              ))}
            </select>
            <label style={{ display: "block", marginBottom: 4 }}>
              Победитель:
            </label>
            <select
              value={editData.winner}
              onChange={(e) =>
                setEditData((d) => ({
                  ...d,
                  winner: Number(e.target.value) as 0 | 1 | 2,
                }))
              }
              style={{
                marginBottom: 8,
                width: "100%",
                padding: 6,
                borderRadius: 6,
              }}
            >
              <option value={0}>Нет победителя</option>
              <option value={1}>Игрок 1</option>
              <option value={2}>Игрок 2</option>
            </select>
            <TextArea
              value={editData.details}
              onChange={(e) =>
                setEditData((d) => ({ ...d, details: e.target.value }))
              }
              placeholder="Задание/условия (каждая строка — отдельный пункт)"
            />
            <label style={{ display: "block", margin: "8px 0 4px" }}>
              Выполненные челленджи:
            </label>
            <TextArea
              value={editData.challenges}
              onChange={(e) =>
                setEditData((d) => ({ ...d, challenges: e.target.value }))
              }
              placeholder="Каждая строка — отдельный челлендж"
              rows={3}
            />
            <label style={{ display: "block", margin: "8px 0 4px" }}>
              Дата (например, 03.07):
            </label>
            <Input
              value={editData.date}
              onChange={(e) =>
                setEditData((d) => ({ ...d, date: e.target.value }))
              }
              placeholder="Дата игры (03.07)"
              style={{ width: 120 }}
            />
            <label style={{ display: "block", margin: "8px 0 4px" }}>
              Ссылка на видео:
            </label>
            <Input
              value={editData.videoLink}
              onChange={(e) =>
                setEditData((d) => ({ ...d, videoLink: e.target.value }))
              }
              placeholder="https://..."
              style={{ width: 180 }}
            />
          </>
        ) : details ? (
          <ul style={{ fontSize: "14px", color: "#222", paddingLeft: 18 }}>
            {details.split("\n").map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        ) : (
          <div>Задание/условия появятся здесь</div>
        )}
      </Modal>
    </div>
  );
};

export default FormCard;
