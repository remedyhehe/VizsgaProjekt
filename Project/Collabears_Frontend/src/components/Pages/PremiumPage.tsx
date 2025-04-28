import React from "react";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";
import { motion } from "framer-motion";

const PremiumPage = () => {
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

  return (
    <>
      <Navbar />
      <div className="bg-[#0f172a] min-h-screen text-white">
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

                <button className="w-full bg-blue-400 hover:bg-blue-500 text-gray-900 font-semibold py-2 rounded transition">
                  {plan.name === "Free" ? "Owned" : `Choose ${plan.name}`}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PremiumPage;
