import { useState } from "react";
import { toast } from "react-toastify";


const useLogin = () => {
  const [message, setMessage] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Sikeres bejelentkezés!", {
                className: "bg-red-500 text-white px-4 py-2 rounded shadow-lg",
              });
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("user_name", data.user.name);
        window.location.reload(); // Frissítjük az oldalt, hogy frissüljön a navbar
      } else {
        toast.error(data.message || "⚠️ Hibás email vagy jelszó!");
      }
    } catch (error) {
      (error || "❌ Hálózati hiba!");
    }
  };

  return { login, message };
};

export default useLogin;
