import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("auth_token"); // Token lekérése
            if (!token) {
                console.error("Nincs bejelentkezett felhasználó.");
                return;
            }

            const res = await fetch("http://localhost:8000/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("user_name"); // ❗ Ezt töröld ki is
                navigate("/");
            } else {
                console.error("Hiba a kijelentkezésnél.");
            }
        } catch (error) {
            console.error("Hálózati hiba:", error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="w-full text-left"
        >
            <h2 className="p-2 hover:bg-slate-300 rounded-lg w-full cursor-pointer">
                <i className="fa-solid fa-right-from-bracket"></i> Logout
            </h2>
        </button>
    );
};

export default LogoutButton;
