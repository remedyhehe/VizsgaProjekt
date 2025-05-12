import React, { useState, useEffect } from "react";
import Navbar from "../Layouts/Navbar";
import { motion } from "framer-motion";
import { FaCreditCard, FaLock } from "react-icons/fa";

const PremiumPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [userSubscriptionId, setUserSubscriptionId] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [notification, setNotification] = useState<string | null>(null); // Custom notification state

  const plans = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
    id: number;
    name: string;
    price: string;
    total: string;
    features: string[];
    billed: string;
    popular?: boolean;
  }

  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");
    setIsLoggedIn(!!authToken); // Check if user is logged in

    if (authToken) {
      const fetchUserSubscription = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            "http://localhost:8000/api/users/subscription",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
            }
          );

          if (!response.ok) {
            console.error(
              `HTTP Error: ${response.status} - ${response.statusText}`
            );
            throw new Error("Failed to fetch user subscription.");
          }

          const data = await response.json();
          setUserSubscriptionId(data.subscription_id);
        } catch (error) {
          console.error("Error fetching user subscription:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserSubscription();
    }
  }, []);

  const openModal = (planId: number) => {
    setSelectedPlanId(planId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlanId(null);
  };

  const handleSubscriptionPurchase = async (planId: number) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/users/subscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          body: JSON.stringify({ subscription_id: planId }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const planName = plans.find((plan) => plan.id === planId)?.name;

      // Success notification
      setNotification(`${planName} subscription activated successfully!`);
      setTimeout(() => setNotification(null), 3000); // Auto-hide notification after 3 seconds

      setUserSubscriptionId(planId);
      closeModal();
    } catch (error: any) {
      console.error("Error updating subscription:", error);

      // Error notification
      setNotification("Failed to update subscription. Please try again.");
      setTimeout(() => setNotification(null), 3000); // Auto-hide notification after 3 seconds
    }
  };

  return (
    <>
      <Navbar />
      <div
        className={`bg-[#0f172a] min-h-screen text-white ${
          isModalOpen ? "backdrop-blur-sm" : ""
        }`}
      >
        {/* Notification */}
        {notification && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-2 rounded shadow-lg z-50">
            {notification}
          </div>
        )}

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

        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-wrap justify-center gap-10">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: plan.id * 0.3 }}
                className={`w-full md:w-80 rounded-2xl shadow-lg p-8 border-2 relative hover:bg-gray-900 ${
                  plan.popular
                    ? "border-blue-400"
                    : "border-gray-600 hover:bg-blue-400"
                } bg-[#1e293b] flex flex-col justify-between`}
              >
                <div>
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
                  <div className="text-xs text-gray-500 mb-6">
                    {plan.billed}
                  </div>

                  <ul className="text-sm space-y-3 mb-8 text-white">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <i className="fa-solid fa-check text-blue-400"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`w-full ${
                    !isLoggedIn
                      ? "bg-gray-500 cursor-not-allowed"
                      : userSubscriptionId === plan.id
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-400 hover:bg-blue-500 text-gray-900 cursor-pointer"
                  } font-semibold py-2 rounded transition flex items-center justify-center gap-2`}
                  onClick={() => {
                    if (!isLoggedIn) {
                      setNotification("Please log in to select a plan.");
                      setTimeout(() => setNotification(null), 3000); // Auto-hide notification
                    } else if (userSubscriptionId === plan.id) {
                      setNotification("You already have this subscription.");
                      setTimeout(() => setNotification(null), 3000); // Auto-hide notification
                    } else {
                      openModal(plan.id); // Open the modal for payment
                    }
                  }}
                  disabled={!isLoggedIn || userSubscriptionId === plan.id} // Disable if not logged in or already subscribed to this plan
                >
                  {!isLoggedIn ? (
                    <>
                      <FaLock />
                      Locked
                    </>
                  ) : userSubscriptionId === plan.id ? (
                    "Owned"
                  ) : (
                    `Choose ${plan.name}`
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Payment Modal */}
        {isModalOpen && selectedPlanId && (
          <div
            className="fixed inset-0 bg-[#0f172a]/80 flex justify-center items-center z-50"
            // A háttér színe a normál háttér halványabb változata
          >
            <div className="bg-white p-6 rounded-lg shadow-lg text-black w-96">
              <h2 className="text-xl font-bold mb-4">Payment for Plan</h2>
              <p className="mb-4">
                You are about to subscribe to the{" "}
                <strong>
                  {plans.find((plan) => plan.id === selectedPlanId)?.name}
                </strong>{" "}
                plan.
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer"
                onClick={() => {
                  handleSubscriptionPurchase(selectedPlanId);
                }}
              >
                Confirm Payment
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded ml-4 cursor-pointer"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PremiumPage;
