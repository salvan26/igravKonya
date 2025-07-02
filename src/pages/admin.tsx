import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
    style={{
      padding: "8px 12px",
      border: "1px solid #d9d9d9",
      borderRadius: "6px",
      fontSize: "14px",
      outline: "none",
      width: "100%",
      ...style,
    }}
  />
);

// Кастомный Button компонент
const Button: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  type?: "primary" | "default";
  style?: React.CSSProperties;
}> = ({ onClick, children, type = "default", style }) => (
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
      ...style,
    }}
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
  const router = useRouter();

  useEffect(() => {
    setIsAdmin(
      typeof window !== "undefined" &&
        localStorage.getItem("isAdmin") === "true"
    );
  }, []);

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
      <div style={{ maxWidth: 320, margin: "120px auto", textAlign: "center" }}>
        <h2>Вход в админ-панель</h2>
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 12 }}
        />
        <Button type="primary" onClick={handleLogin} style={{ width: "100%" }}>
          Войти
        </Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
      <h2>Админ-панель</h2>
      <Button onClick={handleLogout} style={{ float: "right" }}>
        Выйти
      </Button>
      <div style={{ marginTop: 60 }}></div>
    </div>
  );
};

export default AdminPage;
