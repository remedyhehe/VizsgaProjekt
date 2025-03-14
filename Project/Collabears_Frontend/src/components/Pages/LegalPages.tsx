import { useState } from "react";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";
import { FaAngleDown } from "react-icons/fa";

export default function LegalPages() {
  const [tab, setTab] = useState("terms");
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
              tab === "terms"
                ? "bg-orange-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setTab("terms")}
          >
            Terms & Conditions
          </button>
          <button
            className={`px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
              tab === "privacy"
                ? "bg-orange-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setTab("privacy")}
          >
            Privacy Policy
          </button>
        </div>

        <div className="bg-white p-8 border rounded-xl shadow-lg flex flex-col">
          {tab === "terms" && (
            <>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Terms and Conditions
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By using our website, you agree to the following terms and
                conditions...
              </p>
              <div>
                <button
                  className="flex w-full text-left font-semibold text-lg mb-2 items-center gap-2"
                  onClick={() => toggleSection("usage")}
                >
                  Usage Rules <FaAngleDown />
                </button>
                {openSections["usage"] && (
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li>Users must comply with all applicable laws.</li>
                    <li>Projects created must not contain harmful content.</li>
                    <li>We reserve the right to remove any project.</li>
                  </ul>
                )}
              </div>
              <div>
                <button
                  className="flex w-full text-left font-semibold text-lg mb-2 items-center gap-2"
                  onClick={() => toggleSection("responsibility")}
                >
                  User Responsibilities <FaAngleDown />
                </button>
                {openSections["responsibility"] && (
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Users are responsible for their content.</li>
                    <li>
                      Violation of rules may result in account suspension.
                    </li>
                    <li>Report any harmful activities to support.</li>
                  </ul>
                )}
              </div>
            </>
          )}

          {tab === "privacy" && (
            <>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Privacy Policy
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We are committed to protecting your privacy...
              </p>
              <div>
                <button
                  className="flex w-full text-left font-semibold text-lg mb-2 items-center gap-2"
                  onClick={() => toggleSection("dataCollection")}
                >
                  Data Collection <FaAngleDown />
                </button>
                {openSections["dataCollection"] && (
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li>We collect necessary data for project management.</li>
                    <li>Data is stored securely and used responsibly.</li>
                    <li>You can access your stored data upon request.</li>
                  </ul>
                )}
              </div>
              <div>
                <button
                  className="flex w-full text-left font-semibold text-lg mb-2 items-center gap-2"
                  onClick={() => toggleSection("dataProtection")}
                >
                  Data Protection <FaAngleDown />
                </button>
                {openSections["dataProtection"] && (
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>
                      Personal information is not shared with third parties.
                    </li>
                    <li>We use encryption to secure your data.</li>
                    <li>You can request data deletion at any time.</li>
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
