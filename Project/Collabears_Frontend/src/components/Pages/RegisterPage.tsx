/** @format */

import React, { useEffect, useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaInfo, FaUser } from "react-icons/fa";
import { FaCheck, FaTimes } from "react-icons/fa";
import { GoCheck } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
  country: string;
  birthdate: Date;
}

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [countries, setCountries] = useState<{ name: string }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [showPassword, setShowPassword] = useState({
    password: false,
    password_confirmation: false,
  });
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
    country: "",
    birthdate: new Date(),
  });

  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Frissítjük a form adatokat, hogy a country a selectedCountry legyen
    const updatedForm = {
      ...form,
      country: selectedCountry, // Itt beállítjuk a country-t
      birthdate: form.birthdate.toISOString(),
    };

    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(updatedForm), // Az updatedForm-ot küldjük el
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Sikeres regisztráció!");
        setForm({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
          first_name: "",
          last_name: "",
          country: "",
          birthdate: new Date(),
        });
        toast.success("Register successfull!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          style: {
            backgroundColor: "#008000",
            color: "#fff",
            fontWeight: "bold",
          },
          icon: <GoCheck color="black" />,
        });
        navigate("/");
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

  const togglePasswordVisibility = (
    field: "password" | "password_confirmation"
  ) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  const hasNumber = (str: string) => /\d/.test(str);
  const hasUpperCase = (str: string) => /[A-Z]/.test(str);
  const hasSpecialChar = (str: string) => /[!@#$%^&*(),.?":{}|<>]/.test(str);

  // Jelszókövetelmények státusza
  const passwordRequirements = [
    { text: "Password has a number.", valid: hasNumber(form.password) },
    {
      text: "Password has a capital letter.",
      valid: hasUpperCase(form.password),
    },
    {
      text: "Password has special characters.",
      valid: hasSpecialChar(form.password),
    },
  ];

  useEffect(() => {
    // API hívás az országok lekérésére
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryNames = data.map((country: any) => ({
          name: country.name.common,
        }));
        countryNames.sort((a: { name: string }, b: { name: string }) =>
          a.name.localeCompare(b.name)
        );
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <>
      <div className="flex h-screen">
        {/* Bal */}
        <div className="w-0 md:w-1/2 bg-cover  bg-center blur-[right 2px] bg-[url(/images/registerpic1.jpg)] text-white">
          <h2 className="text-4xl font-bold text-center mt-40 mx-20">
            Create your free account
          </h2>
          <p className="text-lg text-center mt-5 mx-20">
            Explore Collabears's core features for individuals and
            organizations.
          </p>
        </div>
        {/* Jobb */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center min-h-screen">
          <div className="w-full text-center mb-2">
            <a
              href="/"
              className="hover:text-orange-500 font-semibold hover:underline hover:underline-offset-8"
            >
              Click here to back to the Main Page{" "}
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
          <div className="shadow-lg rounded-lg p-6 w-full max-w-md mx-auto bg-slate-100 min-h-72">
            {/* Ikonok és vonalak */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex-1 h-0.5 bg-transparent"></div>
              <div className="flex items-center gap-4 px-4">
                <FaUser
                  className={`${
                    step >= 1 ? "text-green-500" : "text-gray-400"
                  } transition-all duration-700`} // Add transition
                />
                <div
                  className={`flex-1 h-0.5 w-10 ${
                    step >= 2 ? "bg-green-500" : "bg-gray-300"
                  } transition-all duration-700`} // Add transition
                ></div>
                <FaEnvelope
                  className={`${
                    step >= 2 ? "text-green-500" : "text-gray-400"
                  } transition-all duration-700`} // Add transition
                />
                <div
                  className={`flex-1 h-0.5 w-10 ${
                    step >= 3 ? "bg-green-500" : "bg-gray-300"
                  } transition-all duration-700`} // Add transition
                ></div>
                <FaInfo
                  className={`${
                    step >= 3 ? "text-green-500" : "text-gray-400"
                  } transition-all duration-700`} // Add transition
                />
              </div>
              <div className="flex-1 h-0.5 bg-transparent"></div>
            </div>

            {/* Form lépések */}
            <form>
              {step === 1 && (
                <div className="mb-20">
                  <label className="block text-gray-700 font-medium m-2">
                    What is your name?
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full  p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
                    required
                  />
                  <label className="block text-gray-700 font-medium m-2">
                    When is your birthday?
                  </label>
                  <input
                    id="datepicker-autohide"
                    type="date"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full  p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
                    placeholder="Select date"
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
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full  p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
                    required
                  />
                  <div className="flex justify-between items-center m-2">
                    <label className="text-gray-700 font-medium">
                      What will your password be?
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword.password ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      onFocus={() => setPasswordFocused(true)}
                      placeholder="My password is..."
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full  p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => togglePasswordVisibility("password")}
                    >
                      {showPassword.password ? (
                        <FaEyeSlash size={20} />
                      ) : (
                        <FaEye size={20} />
                      )}
                    </button>
                  </div>
                  {passwordFocused && ( // Csak akkor jelenjen meg, ha rákattintottunk
                    <div className="mt-2 text-sm">
                      {passwordRequirements.map((req, index) => (
                        <div
                          key={index}
                          className={`flex items-center text-sm ${
                            req.valid ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {/* Itt a React ikont használjuk, ha teljesült a követelmény */}
                          <span
                            className={`mr-2 ${
                              req.valid ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {req.valid ? <FaCheck /> : <FaTimes />}
                          </span>
                          {req.text}
                        </div>
                      ))}
                    </div>
                  )}

                  <label className="block text-gray-700 font-medium m-2">
                    Enter your password again
                  </label>
                  <div className="relative">
                    <input
                      type={
                        showPassword.password_confirmation ? "text" : "password"
                      }
                      name="password_confirmation"
                      value={form.password_confirmation}
                      onChange={handleChange}
                      placeholder="My password again..."
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full  p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() =>
                        togglePasswordVisibility("password_confirmation")
                      }
                    >
                      {showPassword.password_confirmation ? (
                        <FaEyeSlash size={20} />
                      ) : (
                        <FaEye size={20} />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="mb-20">
                  <label className="block text-gray-700 font-medium m-2">
                    Firstname
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    placeholder="Enter your Firstname"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full  p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
                    required
                  />
                  <label className="block text-gray-700 font-medium m-2">
                    Lastname
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    placeholder="Enter your Lastname"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full  p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
                  />
                  <label className="block text-gray-700 font-medium m-2">
                    Country
                  </label>
                  <select
                    value={selectedCountry} // Az aktuálisan kiválasztott országot tartja
                    onChange={(e) => setSelectedCountry(e.target.value)} // A kiválasztott ország frissítése
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full  p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
                  >
                    <option value="" disabled>
                      Select a country
                    </option>
                    {countries.map((country, index) => (
                      <option key={index} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
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
              <p className="text-gray-600 mb-4 font-semibold">
                Or continue with
              </p>
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
