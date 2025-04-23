import React from "react";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";
import { motion } from "framer-motion";

const PremiumPage = () => {
  return (
    <>
      <Navbar />
      <nav className="flex m-4 justify-center" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-orange-500"
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
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                Premium
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="">
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Kezdőállapot: teljesen áttetsző és lentebb
          animate={{ opacity: 1, y: 0 }} // Animáció: fokozatosan jelenjen meg és mozogjon felfelé
          transition={{ duration: 1, ease: "easeOut" }} // Lassú, sima megjelenés
        >
          <section className="text-gray-700 body-font overflow-hidden border-t border-gray-200 bg-white">
            <div className="p-5 mt-10 flex flex-col justify-center items-center gap-6">
              <h1 className="text-5xl font-bold">
                Choose the right plan for you
              </h1>
              <p className="text-xl font-bold text-gray-500">
                Choose an affordable plan that’s packed with the best features
                for <br />
                engaging your audience, creating customer loyalty, and driving
                sales.
              </p>
            </div>

            <div className="container px-5 py-16 mx-auto">
              <div className="flex flex-wrap justify-center gap-10">
                {/* Plan Card */}
                {[
                  {
                    name: "Free",
                    price: "0",
                    features: {
                      Tasks: true,
                    },
                    description: "Basic tools for individuals starting out.",
                    buttonText: "Owned",
                  },
                  {
                    name: "Plus",
                    price: "12",
                    features: {
                      Tasks: true,
                      Timeline: true,
                      Calendar: true,
                    },
                    description:
                      "For professionals managing multiple projects.",
                    buttonText: "Choose Plan",
                    popular: true,
                  },
                  {
                    name: "Pro",
                    price: "25",
                    features: {
                      Tasks: true,
                      Timeline: true,
                      Calendar: true,
                      Files: true,
                      Chat: true,
                      Notifications: true,
                    },
                    description: "Best for teams that need everything.",
                    buttonText: "Choose Plan",
                  },
                ].map((plan, idx) => (
                  <div
                    key={idx}
                    className={`w-full md:w-80 border-2 rounded-xl shadow-lg relative ${
                      plan.popular ? "border-orange-500" : "border-gray-200"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-3 py-1 rounded-bl-lg">
                        MOST POPULAR
                      </div>
                    )}

                    <div className="p-6 text-center">
                      <h3 className="text-lg font-semibold tracking-wide mb-2">
                        {plan.name}
                      </h3>
                      <div className="text-4xl font-bold text-gray-900 mb-1">
                        {plan.price === "0" ? "Free" : `$${plan.price}/mo`}
                      </div>
                      <p className="text-sm text-gray-500 mb-6">
                        {plan.description}
                      </p>

                      <ul className="text-sm text-left space-y-2 mb-6">
                        {Object.entries(plan.features).map(
                          ([feature, isEnabled]) => (
                            <li
                              key={feature}
                              className="flex items-center gap-2"
                            >
                              <i
                                className={`fa-solid ${
                                  isEnabled
                                    ? "fa-circle-check text-green-500"
                                    : "fa-x text-red-400"
                                }`}
                              ></i>
                              {feature}
                            </li>
                          )
                        )}
                      </ul>

                      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded transition">
                        {plan.buttonText}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default PremiumPage;
