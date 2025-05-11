import React, { useState, useEffect } from "react";
import Navbar from "../Layouts/Navbar";
import { motion } from "framer-motion";
import { FaCreditCard } from "react-icons/fa";
import { toast } from "react-toastify"; // Importáljuk a toast-ot

const PremiumPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [userSubscriptionId, setUserSubscriptionId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const plans = [
    {
      id: 1, // Add unique IDs for each plan
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

  // Fetch current user's subscription ID from backend
  useEffect(() => {
  const fetchUserSubscription = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch(
        "http://localhost:8000/api/users/subscription",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );

      if (!response.ok) {
        console.error(`HTTP Error: ${response.status} - ${response.statusText}`);
        throw new Error("Failed to fetch user subscription.");
      }

      const data = await response.json();
      setUserSubscriptionId(data.subscription_id);
    } catch (error) {
      console.error("Error fetching user subscription:", error);
      // Optionally show error to user
    } finally {
      setIsLoading(false); // End loading regardless of success/failure
    }
  };

  fetchUserSubscription();
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

      // Toast értesítés sikeres előfizetés esetén
      toast.success(`${planName} subscription activated successfully!`, {
        className: "bg-green-500 text-white px-4 py-2 rounded shadow-lg",
      });

      setUserSubscriptionId(planId); // Frissítjük a felhasználó előfizetését
      closeModal();
    } catch (error: any) {
      console.error("Error updating subscription:", error);

      // Toast értesítés hiba esetén
      toast.error("Failed to update subscription. Please try again.", {
        className: "bg-red-500 text-white px-4 py-2 rounded shadow-lg",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div
        className={`bg-[#0f172a] min-h-screen text-white ${isModalOpen ? "backdrop-blur-sm" : ""
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

        {/* Plans */}
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-wrap justify-center gap-10">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: plan.id * 0.3 }}
                className={`w-full md:w-80 rounded-2xl shadow-lg p-8 border-2 relative hover:bg-gray-900 ${plan.popular
                    ? "border-blue-400"
                    : "border-gray-600 hover:bg-blue-400"
                  } bg-[#1e293b] flex flex-col justify-between`} // Flexbox hozzáadása
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
                  <div className="text-xs text-gray-500 mb-6">{plan.billed}</div>

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
                  className={`w-full ${userSubscriptionId === plan.id
                      ? "bg-gray-500 cursor-default text-white"
                      : "bg-blue-400 hover:bg-blue-500 text-gray-900"
                    } font-semibold py-2 rounded transition`}
                  onClick={() =>
                    userSubscriptionId !== plan.id && openModal(plan.id)
                  }
                  disabled={userSubscriptionId === plan.id}
                >
                  {userSubscriptionId === plan.id
                    ? "Owned"
                    : `Choose ${plan.name}`}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {isModalOpen && selectedPlanId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl relative animate-fadeInUp">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>

            <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
              {plans.find((plan) => plan.id === selectedPlanId)?.name} Plan
            </h2>

            <p className="text-center text-gray-600 text-lg mb-2">
              Price:{" "}
              <span className="font-bold text-gray-900">
                {plans.find((plan) => plan.id === selectedPlanId)?.price} €
              </span>
            </p>

            <p className="text-center text-sm text-gray-500 mb-6">
              Please fill in your payment details or choose a payment method
              below. Your purchase will be processed securely.
            </p>

            <div className="space-y-4">
              <button
                className="flex flex-row justify-center gap-2 items-center w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                onClick={() => handleSubscriptionPurchase(selectedPlanId)}
              >
                Pay with Card <FaCreditCard />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PremiumPage;
