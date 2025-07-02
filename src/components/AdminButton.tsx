import { useRouter } from "next/router";

const AdminButton = () => {
  const router = useRouter();
  return (
    <button
      className="admin-btn"
      onClick={() => router.push("/admin")}
      title="Админ-панель"
      style={{ position: "absolute", top: 24, right: 32 }}
    >
      <span role="img" aria-label="admin" style={{ fontSize: 22 }}>
        👑
      </span>
    </button>
  );
};

export default AdminButton;
