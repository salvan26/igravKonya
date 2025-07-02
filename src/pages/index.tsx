import Link from "next/link";
import FormCard from "@/components/FormCard";
import { useEffect, useState } from "react";
import { getAllForms, saveForm, FormData } from "@/utils/firestoreForms";
import AdminButton from "@/components/AdminButton";
const defaultForms: FormData[] = [
  { id: 1, player1: "Player A", player2: "Player B", top: "5%", left: "7%" },
];

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState<FormData[]>(defaultForms);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsAdmin(
      typeof window !== "undefined" &&
        localStorage.getItem("isAdmin") === "true"
    );
  }, []);

  useEffect(() => {
    getAllForms().then((forms) => {
      if (forms.length > 0) setFormData(forms);
      setLoading(false);
    });
  }, []);

  const updateForm = async (id: number, data: Partial<FormData>) => {
    setFormData((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...data } : f))
    );
    const updated = formData.find((f) => f.id === id);
    if (updated) await saveForm({ ...updated, ...data });
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#6b5c2b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1800px",
          aspectRatio: "16/9",
          margin: "0 auto",
        }}
      >
        <img
          src="/mainBg.jpg"
          alt="map"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
        {!loading &&
          formData.map((f) => (
            <div
              key={f.id}
              style={{
                position: "absolute",
                top: f.top,
                left: f.left,
                transform: "translate(-50%, -50%)",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "auto",
              }}
            >
              <FormCard
                {...f}
                editable={isAdmin}
                onChange={(data) => updateForm(f.id, data)}
              />
            </div>
          ))}
      </div>
      <AdminButton />
    </div>
  );
}
