import { useState } from "react";

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
        setMessage("✅ Sikeres bejelentkezés!");
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("user_name", data.user.name);
        window.location.reload(); // Frissítjük az oldalt, hogy frissüljön a navbar
      } else {
        setMessage(data.message || "⚠️ Hibás email vagy jelszó!");
      }
    } catch (error) {
      setMessage("❌ Hálózati hiba!");
    }
  };

  return { login, message };
};

export default useLogin;
