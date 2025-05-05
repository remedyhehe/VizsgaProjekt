import React, { useState } from "react";
import Navbar from "../Layouts/Navbar";
import { motion } from "framer-motion";
import { FaCreditCard } from "react-icons/fa";

const PremiumPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const plans = [
    {
      name: "Free",
      price: "0",
      total: "0",
      features: [
        "Create and manage tasks",
        "Assign members to tasks",
        "Basic project overview",
      ],
      billed: "No payment required",
    },
    {
      name: "Pro",
      price: "12",
      total: "60",
      features: [
        "Everything in Free",
        "Team chat for projects",
        "File uploads and sharing",
        "Priority task management",
        "Advanced member roles",
      ],
      billed: "Billed annually",
      popular: true,
    },
    {
      name: "Elite",
      price: "20",
      total: "100",
      features: [
        "Everything in Pro",
        "Project timelines & Gantt charts",
        "Advanced analytics and reporting",
        "Cross-project member management",
        "Workflow automations",
      ],
      billed: "Billed annually",
    },
  ];

  interface Plan {
    name: string;
    price: string;
    total: string;
    features: string[];
    billed: string;
    popular?: boolean;
  }

  const openModal = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <>
      <Navbar />
      <div
        className={`bg-[#0f172a] min-h-screen text-white ${
          isModalOpen ? "backdrop-blur-sm" : ""
        }`}
      >
        {/* Breadcrumb */}
        <nav className="flex pt-5 justify-center" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-300 hover:text-orange-400"
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </a>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ms-1 text-sm font-medium text-gray-300 md:ms-2">
                  Premium
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Title and Description */}
        <section className="flex flex-col justify-center items-center text-center mt-10">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-bold mb-4"
          >
            Choose the right plan for you
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl text-gray-400"
          >
            Pick a plan tailored to your team’s needs — from starting small to
            managing full project workflows.
          </motion.p>
        </section>

        {/* Plans */}
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-wrap justify-center gap-10">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.3 }}
                className={`w-full md:w-80 rounded-2xl shadow-lg p-8 border-2 relative  hover:bg-gray-900 ${
                  plan.popular
                    ? "border-blue-400"
                    : "border-gray-600 hover:bg-blue-400"
                } bg-[#1e293b]`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 bg-blue-400 text-white text-xs font-bold px-3 py-1 rounded-br-xl rounded-tl-xl">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-extrabold">
                    {plan.price === "0" ? "Free" : `${plan.price} €`}
                  </span>
                  {plan.price !== "0" && (
                    <span className="ml-1 text-gray-400">/ seat / month</span>
                  )}
                </div>
                <div className="text-sm text-gray-400 mb-4">
                  {plan.total !== "0"
                    ? `Total ${plan.total} € / month`
                    : "No monthly cost"}
                </div>
                <div className="text-xs text-gray-500 mb-6">{plan.billed}</div>

                <ul className="text-sm space-y-3 mb-8 text-white">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <i className="fa-solid fa-check text-blue-400"></i>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full bg-blue-400 hover:bg-blue-500 text-gray-900 font-semibold py-2 rounded transition"
                  onClick={() => openModal(plan)}
                >
                  {plan.name === "Free" ? "Owned" : `Choose ${plan.name}`}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {isModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl relative animate-fadeInUp">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>

            <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
              {selectedPlan.name} Plan
            </h2>

            <p className="text-center text-gray-600 text-lg mb-2">
              Price:{" "}
              <span className="font-bold text-gray-900">
                {selectedPlan.price} €
              </span>
            </p>

            <p className="text-center text-sm text-gray-500 mb-6">
              Please fill in your payment details or choose a payment method
              below. Your purchase will be processed securely.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 font-medium mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm text-gray-700 font-medium mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm text-gray-700 font-medium mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="CVC"
                  />
                </div>
              </div>

              <button
                className="flex flex-row justify-center gap-2 items-center w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                onClick={closeModal}
              >
                Pay with Card <FaCreditCard />
              </button>

              <div className="flex items-center gap-2 my-2">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="text-gray-400 text-sm">OR</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              <button className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 border border-gray-300 text-black py-3 rounded-lg font-semibold transition">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
                  alt="Google Pay"
                  className="w-10 h-10"
                />
                Pay with Google
              </button>

              <button className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg font-semibold transition">
                <img
                  src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
                  alt="PayPal"
                  className="w-6 h-6"
                />
                Pay with PayPal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PremiumPage;
