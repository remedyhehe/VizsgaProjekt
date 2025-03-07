/** @format */

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
  const prevStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Megakadályozzuk az oldal újratöltését
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Bal */}
        <div className="w-0 md:w-1/2 bg-cover bg-[auto_300px] bg-center blur-[right 2px] bg-[url(/images/registerpic1.jpg)] text-white">
          <h2 className="text-4xl font-bold text-center mt-40 mx-20">Create your account for free!</h2>
        </div>
        {/* Jobb */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center min-h-screen">
          <div className="w-full text-center mb-2">
            <a href="/" className="hover:text-orange-500 font-semibold hover:underline hover:underline-offset-8">
              Click here to back to the Main Page <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
          <div className="shadow-lg rounded-lg p-6 w-full max-w-md mx-auto bg-slate-100 min-h-72">
            {/* Ikonok és vonalak */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex-1 h-0.5 bg-transparent"></div>
              <div className="flex items-center gap-4 px-4">
                <FaUser
                  className={step >= 1 ? "text-green-500" : "text-gray-400"}
                />
                <div
                  className={`flex-1 h-0.5 w-10 ${step >= 2 ? "bg-green-500" : "bg-gray-300"
                    }`}
                ></div>
                <FaEnvelope
                  className={step >= 2 ? "text-green-500" : "text-gray-400"}
                />
                <div
                  className={`flex-1 h-0.5 w-10 ${step >= 3 ? "bg-green-500" : "bg-gray-300"
                    }`}
                ></div>
                <FaInfo
                  className={step >= 3 ? "text-green-500" : "text-gray-400"}
                />
              </div>
              <div className="flex-1 h-0.5 bg-transparent"></div>
            </div>

            {/* Form lépések */}
            <form>
              {step === 1 && (
                <div className="mb-20">
                  <label className="block text-gray-700 font-medium m-2">
                    How can we name you?
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="My username is..."
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              )}

              {step === 2 && (
                <div className="mb-20">
                  <label className="block text-gray-700 font-medium m-2">
                    What is your Email?
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="My email address is..."
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <div className="flex justify-between items-center m-2">
                    <label className="text-gray-700 font-medium">What will your password be?</label>
                    <a
                      href="#"
                      className="text-orange-500 text-md hover:underline"
                    >
                      Requirement?
                    </a>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="My password is..."
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <label className="block text-gray-700 font-medium m-2">
                    Enter your password again
                  </label>
                  <input
                    type="password"
                    name="password_confirmation"
                    value={form.password_confirmation}
                    onChange={handleChange}
                    placeholder="My password again..."
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              )}

              {step === 3 && (
                <div className="mb-20">
                  <label className="block text-gray-700 font-medium m-2">
                    Nem kötelező dolgok TODO
                  </label>
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
              {step > 1 && (
                <button
                  type="button"
                  className="w-full mt-4 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 rounded-xl p-2 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={prevStep}
                >
                  <i className="fa-solid fa-arrow-left"></i> Back
                </button>
              )}
            </form>

            {message && (
              <p className="mt-4 text-center text-red-500">{message}</p>
            )}
          </div>
          {step === 1 && (
            <div className="shadow-lg rounded-lg p-6 w-full max-w-md mx-auto mt-5 bg-slate-100 min-h-20 text-center">
              <p className="text-gray-600 mb-4 font-semibold">Or continue with</p>
              <div className="flex space-x-3">
                <button className="flex items-center font-semibold justify-center gap-2 w-1/2 py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-200 transition">
                  <i className="fa-brands fa-google"></i> Google
                </button>
                <button className="flex items-center font-semibold justify-center gap-2 w-1/2 py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-200 transition">
                  <i className="fa-brands fa-github"></i> GitHub
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
