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
        localStorage.setItem("auth_token", data.token); // Save token to localStorage
        localStorage.setItem("user_name", data.user.name);
        window.location.reload(); // Refresh the page to update the navbar
      } else {
        toast.error(data.message || "⚠️ Hibás email vagy jelszó!");
      }
    } catch (error) {
      toast.error("❌ Hálózati hiba!");
      console.error("Login error:", error);
    }
  };
  return { login, message };
};

export default useLogin;
