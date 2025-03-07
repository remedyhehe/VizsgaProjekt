/** @format */
import React, { useState } from "react";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Sikeres bejelentkezés!");
        setToken(data.token);
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("user_name", data.user.name); // Felhasználónév mentése
      } else {
        setMessage(data.message || "⚠️ Hibás email vagy jelszó!");
      }
    } catch (error) {
      setMessage("❌ Hálózati hiba!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Bejelentkezés
        </h2>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Jelszó"
            value={form.password}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Bejelentkezés
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
