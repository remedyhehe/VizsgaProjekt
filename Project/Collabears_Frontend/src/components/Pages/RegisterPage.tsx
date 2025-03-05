import React, { useState } from "react";
import { FaEnvelope, FaInfo, FaUser } from "react-icons/fa";
import Navbar from "../Layouts/Navbar";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Sikeres regisztráció!");
        setForm({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        });
        setStep(1); // Siker esetén visszaállunk az első lépésre
      } else {
        setMessage(data.message || "⚠️ Hiba történt a regisztráció során!");
      }
    } catch (error) {
      setMessage("❌ Hálózati hiba!");
    }
  };

  const nextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Megakadályozzuk az oldal újratöltését
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit(e as unknown as React.FormEvent); // Az utolsó lépésnél küldjük el az űrlapot
    }
  };

  return (
    <>
    <div className="shadow-lg rounded-lg p-6 w-full max-w-md mx-auto mt-40 bg-slate-100 min-h-72">
      {/* Ikonok és vonalak */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex-1 h-0.5 bg-transparent"></div>
        <div className="flex items-center gap-4 px-4">
          <FaUser className={step >= 1 ? "text-green-500" : "text-gray-400"} />
          <div className={`flex-1 h-0.5 w-10 ${step >= 2 ? "bg-green-500" : "bg-gray-300"}`}></div>
          <FaEnvelope className={step >= 2 ? "text-green-500" : "text-gray-400"} />
          <div className={`flex-1 h-0.5 w-10 ${step >= 3 ? "bg-green-500" : "bg-gray-300"}`}></div>
          <FaInfo className={step >= 3 ? "text-green-500" : "text-gray-400"} />
        </div>
        <div className="flex-1 h-0.5 bg-transparent"></div>
      </div>

      {/* Form lépések */}
      <form>
        {step === 1 && (
          <div className="mb-20">
            <label className="block text-gray-700 font-medium m-2">Username</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Type here..."
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}

        {step === 2 && (
          <div className="mb-20">
            <label className="block text-gray-700 font-medium m-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Type here..."
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="flex justify-between items-center m-2">
              <label className="text-gray-700 font-medium">Password</label>
              <a href="#" className="text-orange-500 text-md hover:underline">Forgot password?</a>
            </div>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Type here..."
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <label className="block text-gray-700 font-medium m-2">Password Confirm</label>
            <input
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleChange}
              placeholder="Type here..."
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}

        {step === 3 && (
          <div className="mb-20">
            <label className="block text-gray-700 font-medium m-2">Nem kötelező dolgok TODO</label>
            <input
              type="text"
              name="optional"
              onChange={handleChange}
              placeholder="Type here..."
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <button
          onClick={nextStep}
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {step < 3 ? "Next" : "Register"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
    {step === 1 && (
      <div className="shadow-lg rounded-lg p-6 w-full max-w-md mx-auto mt-5 bg-slate-100 min-h-20 text-center">
        <a href="/" className="hover:text-orange-500">Click here to back to the Main Page</a>
      </div>
    )}

    </>
  );
};

export default RegisterPage;
