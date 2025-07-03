import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import scheduleStyles from "@/styles/Schedule.module.css";
import modalStyles from "@/styles/ModalCustom.module.css";
import {
  getAllSchedule,
  saveSchedule,
  ScheduleGame,
  deleteSchedule,
  updateSchedule,
} from "@/utils/firestoreForms";
import adminStyles from "@/components/FormCard.module.css";

const ADMIN_PASSWORD = "2801394aa";

// Кастомный Input компонент
const Input: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  style?: React.CSSProperties;
}> = ({ value, onChange, placeholder, type = "text", style }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={adminStyles.adminInput}
    style={style}
  />
);

// Кастомный Button компонент
const Button: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  type?: "primary" | "default" | "danger";
  style?: React.CSSProperties;
  className?: string;
}> = ({ onClick, children, type = "default", style, className }) => (
  <button
    onClick={onClick}
    className={
      (className ? className + " " : "") +
      adminStyles.adminBtn +
      (type === "primary"
        ? " " + adminStyles.adminBtnPrimary
        : type === "danger"
        ? " " + adminStyles.adminBtnDanger
        : "")
    }
    style={style}
  >
    {children}
  </button>
);

// Кастомная функция для показа сообщений
const showMessage = (type: "error" | "success", content: string) => {
  const messageDiv = document.createElement("div");
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 16px;
    border-radius: 6px;
    color: white;
    font-size: 14px;
    z-index: 10000;
    background-color: ${type === "error" ? "#ff4d4f" : "#52c41a"};
  `;
  messageDiv.textContent = content;
  document.body.appendChild(messageDiv);

  setTimeout(() => {
    document.body.removeChild(messageDiv);
  }, 3000);
};

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [games, setGames] = useState<ScheduleGame[]>([]);
  const [newGame, setNewGame] = useState({
    date: "",
    time: "",
    player1: "",
    player2: "",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [editGame, setEditGame] = useState<ScheduleGame | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsAdmin(
      typeof window !== "undefined" &&
        localStorage.getItem("isAdmin") === "true"
    );
  }, []);

  useEffect(() => {
    if (isAdmin && scheduleModalOpen) {
      getAllSchedule().then((data) =>
        setGames(data.sort((a, b) => a.date.localeCompare(b.date)))
      );
    }
  }, [isAdmin, scheduleModalOpen]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      setIsAdmin(true);
      setPassword("");
      router.push("/");
    } else {
      showMessage("error", "Неверный пароль");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
  };

  if (!isAdmin) {
    return (
      <div className={adminStyles.adminLoginWrapper}>
        <h2 className={adminStyles.adminTitle}>Вход в админ-панель</h2>
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="primary" onClick={handleLogin} style={{ width: "100%" }}>
          Войти
        </Button>
      </div>
    );
  }

  const handleAddGame = async () => {
    if (
      !newGame.date ||
      !newGame.time ||
      !newGame.player1 ||
      !newGame.player2
    ) {
      showMessage("error", "Заполните все поля");
      return;
    }
    const game: ScheduleGame = { ...newGame, id: Date.now().toString() };
    await saveSchedule(game);
    setGames((prev) => [...prev, game]);
    setNewGame({ date: "", time: "", player1: "", player2: "" });
  };

  const handleDeleteGame = async (id: string) => {
    await deleteSchedule(id);
    setGames((prev) => prev.filter((g) => g.id !== id));
  };

  const handleEditGame = (game: ScheduleGame) => {
    setEditId(game.id);
    setEditGame({ ...game });
  };

  const handleSaveEdit = async () => {
    if (!editGame) return;
    await updateSchedule(editGame);
    setGames((prev) => prev.map((g) => (g.id === editGame.id ? editGame : g)));
    setEditId(null);
    setEditGame(null);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditGame(null);
  };

  return (
    <div className={adminStyles.adminWrapper}>
      <h2 className={adminStyles.adminTitle}>Админ-панель</h2>
      <Button onClick={handleLogout} className={adminStyles.adminLogoutBtn}>
        Выйти
      </Button>
      <div className={adminStyles.adminTopSpace}></div>
      <Button type="primary" onClick={() => setScheduleModalOpen(true)}>
        Редактировать расписание
      </Button>
      {/* Модалка для редактирования расписания */}
      {scheduleModalOpen && (
        <div
          className={modalStyles.modalOverlay}
          onClick={() => setScheduleModalOpen(false)}
        >
          <div
            className={modalStyles.modalWindow}
            onClick={(e) => e.stopPropagation()}
            style={{ minWidth: 420 }}
          >
            <div className={modalStyles.modalTitle}>
              Редактирование расписания
              <button
                className={modalStyles.modalClose}
                onClick={() => setScheduleModalOpen(false)}
              >
                ×
              </button>
            </div>
            <table
              className={scheduleStyles.table}
              style={{ marginBottom: 16 }}
            >
              <thead>
                <tr className={scheduleStyles.tr}>
                  <th className={scheduleStyles.th}>Дата</th>
                  <th className={scheduleStyles.th}>Время</th>
                  <th className={scheduleStyles.th}>Игрок 1</th>
                  <th className={scheduleStyles.th}></th>
                  <th className={scheduleStyles.th}>Игрок 2</th>
                  <th className={scheduleStyles.th}></th>
                </tr>
              </thead>
              <tbody>
                {games.map((g, i) => (
                  <tr className={scheduleStyles.tr} key={g.id}>
                    {editId === g.id ? (
                      <>
                        <td className={scheduleStyles.td}>
                          <Input
                            value={editGame?.date || ""}
                            onChange={(e) =>
                              setEditGame((eg) =>
                                eg ? { ...eg, date: e.target.value } : null
                              )
                            }
                            style={{ width: 70 }}
                          />
                        </td>
                        <td className={scheduleStyles.td}>
                          <Input
                            value={editGame?.time || ""}
                            onChange={(e) =>
                              setEditGame((eg) =>
                                eg ? { ...eg, time: e.target.value } : null
                              )
                            }
                            style={{ width: 70 }}
                          />
                        </td>
                        <td
                          className={`${scheduleStyles.td} ${scheduleStyles.player}`}
                        >
                          <Input
                            value={editGame?.player1 || ""}
                            onChange={(e) =>
                              setEditGame((eg) =>
                                eg ? { ...eg, player1: e.target.value } : null
                              )
                            }
                            style={{ width: 110 }}
                          />
                        </td>
                        <td
                          className={`${scheduleStyles.td} ${scheduleStyles.vs}`}
                        >
                          vs.
                        </td>
                        <td
                          className={`${scheduleStyles.td} ${scheduleStyles.player}`}
                        >
                          <Input
                            value={editGame?.player2 || ""}
                            onChange={(e) =>
                              setEditGame((eg) =>
                                eg ? { ...eg, player2: e.target.value } : null
                              )
                            }
                            style={{ width: 110 }}
                          />
                        </td>
                        <td
                          className={
                            scheduleStyles.td + " " + adminStyles.adminBtnGroup
                          }
                        >
                          <Button type="primary" onClick={handleSaveEdit}>
                            Сохранить
                          </Button>
                          <Button onClick={handleCancelEdit}>Отмена</Button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className={scheduleStyles.td}>{g.date}</td>
                        <td className={scheduleStyles.td}>{g.time}</td>
                        <td
                          className={`${scheduleStyles.td} ${scheduleStyles.player}`}
                        >
                          {g.player1}
                        </td>
                        <td
                          className={`${scheduleStyles.td} ${scheduleStyles.vs}`}
                        >
                          vs.
                        </td>
                        <td
                          className={`${scheduleStyles.td} ${scheduleStyles.player}`}
                        >
                          {g.player2}
                        </td>
                        <td
                          className={
                            scheduleStyles.td + " " + adminStyles.adminBtnGroup
                          }
                        >
                          <Button onClick={() => handleEditGame(g)}>
                            Редактировать
                          </Button>
                          <Button
                            type="danger"
                            onClick={() => handleDeleteGame(g.id)}
                          >
                            Удалить
                          </Button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
                <tr className={scheduleStyles.tr}>
                  <td className={scheduleStyles.td}>
                    <Input
                      value={newGame.date}
                      onChange={(e) =>
                        setNewGame((g) => ({ ...g, date: e.target.value }))
                      }
                      placeholder="Дата"
                      style={{ width: 70 }}
                    />
                  </td>
                  <td className={scheduleStyles.td}>
                    <Input
                      value={newGame.time}
                      onChange={(e) =>
                        setNewGame((g) => ({ ...g, time: e.target.value }))
                      }
                      placeholder="Время"
                      style={{ width: 70 }}
                    />
                  </td>
                  <td
                    className={`${scheduleStyles.td} ${scheduleStyles.player}`}
                  >
                    <Input
                      value={newGame.player1}
                      onChange={(e) =>
                        setNewGame((g) => ({ ...g, player1: e.target.value }))
                      }
                      placeholder="Игрок 1"
                      style={{ width: 110 }}
                    />
                  </td>
                  <td className={`${scheduleStyles.td} ${scheduleStyles.vs}`}>
                    vs.
                  </td>
                  <td
                    className={`${scheduleStyles.td} ${scheduleStyles.player}`}
                  >
                    <Input
                      value={newGame.player2}
                      onChange={(e) =>
                        setNewGame((g) => ({ ...g, player2: e.target.value }))
                      }
                      placeholder="Игрок 2"
                      style={{ width: 110 }}
                    />
                  </td>
                  <td
                    className={
                      scheduleStyles.td + " " + adminStyles.adminBtnGroup
                    }
                  >
                    <Button type="primary" onClick={handleAddGame}>
                      Добавить игру
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
