import Link from "next/link";
import AdminButton from "./AdminButton";
import styles from "../styles/Header.module.css";

const Header = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <Link href="/" className={styles.link}>
        Сетка
      </Link>
      <Link href="/schedule" className={styles.link}>
        Расписание игр
      </Link>
    </nav>
    <div className={styles.adminBtn}>
      <AdminButton />
    </div>
  </header>
);

export default Header;
