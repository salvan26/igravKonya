import React, { useState, useEffect } from "react";
import { Input, Button, message } from "antd";
import { useRouter } from "next/router";

const ADMIN_PASSWORD = "ADMIN123";

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      setIsAdmin(true);
      setPassword("");
      router.push("/");
    } else {
      message.error("Неверный пароль");
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
        <Input.Password
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 12 }}
        />
        <Button type="primary" onClick={handleLogin} block>
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
