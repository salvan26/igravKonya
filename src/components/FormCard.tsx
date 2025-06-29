import React, { useState } from "react";
import { Modal, Input, Button } from "antd";

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

const FormCard: React.FC<FormCardProps> = ({
  player1,
  player2,
  score,
  details,
  editable,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({
    player1,
    player2,
    score: score || "",
    details: details || "",
  });

  const handleOpen = () => {
    setEditData({
      player1,
      player2,
      score: score || "",
      details: details || "",
    });
    setOpen(true);
  };

  const handleSave = () => {
    onChange?.(editData);
    setOpen(false);
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "1fr 1fr",
          alignItems: "center",
          maxWidth: 120,
          minHeight: 40,
          cursor: "pointer",
          fontWeight: 600,
          background: "none",
          border: "none",
          boxShadow: "none",
          color: "#222",
          fontSize: 16,
          lineHeight: 1.9,
          padding: 0,
          margin: 0,
          userSelect: "none",
          rowGap: 3,
          transition: "color 0.2s",
        }}
        onClick={handleOpen}
      >
        <span style={{ fontSize: 16 }}>{player1}</span>
        <span style={{ fontSize: 16 }}>{player2}</span>
      </div>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={
          editable
            ? [
                <Button key="save" type="primary" onClick={handleSave}>
                  Сохранить
                </Button>,
              ]
            : null
        }
        title={
          editable ? (
            <>
              <Input
                value={editData.player1}
                onChange={(e) =>
                  setEditData((d) => ({ ...d, player1: e.target.value }))
                }
                style={{ width: 120, marginRight: 8 }}
                placeholder="Игрок 1"
              />
              <Input
                value={editData.score}
                onChange={(e) =>
                  setEditData((d) => ({ ...d, score: e.target.value }))
                }
                style={{ width: 50, marginRight: 8 }}
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
            </>
          ) : (
            <span>
              {player1} <b>{score}</b> {player2}
            </span>
          )
        }
      >
        {editable ? (
          <Input.TextArea
            value={editData.details}
            onChange={(e) =>
              setEditData((d) => ({ ...d, details: e.target.value }))
            }
            rows={4}
            placeholder="Задание/условия"
          />
        ) : (
          <div>{details || "Задание/условия появятся здесь"}</div>
        )}
      </Modal>
    </>
  );
};

export default FormCard;
