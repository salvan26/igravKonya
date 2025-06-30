import React, { useState } from "react";

export type FormCardProps = {
  player1: string;
  player2: string;
  score?: string;
  details?: string;
  editable?: boolean;
  onChange?: (data: {
    player1: string;
    player2: string;
    score?: string;
    details?: string;
  }) => void;
};

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
      border: "1px solid #d9d9d9",
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

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onCancel}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "24px",
          minWidth: "400px",
          maxWidth: "600px",
          maxHeight: "80vh",
          overflow: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {title}
          <button
            onClick={onCancel}
            style={{
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              padding: "0",
              width: "24px",
              height: "24px",
            }}
          >
            ×
          </button>
        </div>
        <div style={{ marginBottom: "16px" }}>{children}</div>
        {footer && <div style={{ textAlign: "right" }}>{footer}</div>}
      </div>
    </div>
  );
};

// Простой блок с информацией для обычных пользователей
const InfoBlock: React.FC<{
  visible: boolean;
  player1: string;
  player2: string;
  score?: string;
  details?: string;
}> = ({ visible, player1, player2, score, details }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#fff",
        border: "1px solid #d9d9d9",
        borderRadius: "6px",
        padding: "12px",
        minWidth: "200px",
        maxWidth: "300px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
        marginTop: "8px",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
        {player1} {score && <span style={{ color: "#1890ff" }}>{score}</span>}{" "}
        {player2}
      </div>
      {details && (
        <div style={{ fontSize: "14px", color: "#666" }}>{details}</div>
      )}
    </div>
  );
};

const FormCard: React.FC<FormCardProps> = ({
  player1,
  player2,
  score,
  details,
  editable,
  onChange,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [editData, setEditData] = useState({
    player1,
    player2,
    score: score || "",
    details: details || "",
  });

  const handleModalOpen = () => {
    setEditData({
      player1,
      player2,
      score: score || "",
      details: details || "",
    });
    setModalOpen(true);
  };

  const handleModalClose = () => setModalOpen(false);

  const handleSave = () => {
    onChange?.(editData);
    setModalOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "1fr 1fr",
          alignItems: "center",
          justifyItems: "center",
          minWidth: 120,
          minHeight: 40,
          cursor: "pointer",
          fontWeight: 600,
          background: "none",
          border: "none",
          boxShadow: "none",
          color: "#222",
          fontSize: 16,
          lineHeight: 1.2,
          padding: 0,
          margin: 0,
          userSelect: "none",
          rowGap: 2,
          transition: "color 0.2s",
        }}
        onClick={editable ? handleModalOpen : undefined}
        onMouseEnter={!editable ? () => setInfoVisible(true) : undefined}
        onMouseLeave={!editable ? () => setInfoVisible(false) : undefined}
      >
        <span style={{ fontSize: 16 }}>{player1}</span>
        <span style={{ fontSize: 14, color: "#7a5c2b", fontWeight: 400 }}>
          {player2}
        </span>
      </div>

      {/* Информационный блок для обычных пользователей */}
      {!editable && (
        <InfoBlock
          visible={infoVisible}
          player1={player1}
          player2={player2}
          score={score}
          details={details}
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
          <TextArea
            value={editData.details}
            onChange={(e) =>
              setEditData((d) => ({ ...d, details: e.target.value }))
            }
            placeholder="Задание/условия"
          />
        ) : (
          <div>{details || "Задание/условия появятся здесь"}</div>
        )}
      </Modal>
    </div>
  );
};

export default FormCard;
