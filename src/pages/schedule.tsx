import styles from "@/styles/Schedule.module.css";

const games = [
  {
    date: "14.06",
    time: "18:00",
    player1: "valerie_rayne",
    player2: "Pavllovich",
  },
  { date: "15.06", time: "19:00", player1: "Игрок 3", player2: "Игрок 4" },
];

export default function Schedule() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Расписание</h1>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>Дата</th>
            <th className={styles.th}>Время</th>
            <th className={styles.th}>Игрок 1</th>
            <th className={styles.th}></th>
            <th className={styles.th}>Игрок 2</th>
          </tr>
        </thead>
        <tbody>
          {games.map((g, i) => (
            <tr className={styles.tr} key={i}>
              <td className={styles.td}>{g.date}</td>
              <td className={styles.td}>{g.time}</td>
              <td className={`${styles.td} ${styles.player}`}>
                <a href="#">{g.player1}</a>
              </td>
              <td className={`${styles.td} ${styles.vs}`}>vs.</td>
              <td className={`${styles.td} ${styles.player}`}>
                <a href="#">{g.player2}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
