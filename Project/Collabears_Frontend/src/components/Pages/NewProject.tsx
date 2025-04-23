import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Navbar from "../Layouts/Navbar";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

const NewProject = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const totalSteps = 5; // The total number of steps
  const { width, height } = useWindowSize();

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === totalSteps) {
      // Handle the final step separately
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const formSubmit: SubmitHandler<any> = async (data) => {
    const token = localStorage.getItem("auth_token"); // Retrieve token from localStorage
    if (!token) {
      console.error("No authentication token found. Please log in again.");
      alert("You are not logged in. Please log in to create a project.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send the token in Authorization header
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setCurrentStep(totalSteps + 1);
        setShowConfetti(true); // Show success screen
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert(
          errorData.message || "Failed to create the project. Please try again."
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
      alert("An error occurred while creating the project. Please try again.");
    }
  };
  const handleGoToProjects = () => {
    setShowConfetti(false); // Konfetti leállítása
    window.location.href = "/myprojects"; // Navigálás a projektekhez
  };

  return (
    <>
      {showConfetti && <Confetti width={width} height={height} />}
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                My Projects
              </span>
            </div>
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                Create new project
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="max-w-lg mx-auto p-6 mt-6 justify-center text-center">
        <form onSubmit={handleSubmit(formSubmit)}>
          {currentStep === 1 && (
            <div id="step-1" className="step">
              <h1 className="text-2xl font-bold m-4">Create Project</h1>
              <p className="m-4">
                Getting started is easy. You just need to create the name of
                your new project.
              </p>
              <input
                {...register("name", { required: true })}
                type="text"
                id="projectName"
                className="w-full border border-gray-300 p-4 rounded-xl"
                placeholder="Project name"
              />
              <button
                type="button"
                className="w-full mt-4 bg-orange-500 text-white p-4 rounded-xl hover:bg-orange-600"
                onClick={nextStep}
              >
                Next <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div id="step-2" className="step">
              <h2 className="text-2xl font-bold m-4">Project Description</h2>
              <p className="m-4">
                Describe your project in a few sentences. Explain its purpose,
                goals, and key features.
              </p>
              <textarea
                {...register("description", { required: true })}
                id="projectDescription"
                className="w-full border border-gray-300 p-2 rounded-xl"
                placeholder="Enter project description"
              ></textarea>
              <button
                type="button"
                className="w-full mt-4 bg-orange-500 text-white p-4 rounded-xl hover:bg-orange-600"
                onClick={nextStep}
              >
                Next <i className="fa-solid fa-arrow-right"></i>
              </button>
              <button
                type="button"
                className="w-full mt-4 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 rounded-xl p-2 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={prevStep}
              >
                <i className="fa-solid fa-arrow-left"></i> Back
              </button>
            </div>
          )}

          {currentStep === 3 && (
            <div id="step-3" className="step">
              <h2 className="text-2xl font-bold m-4">Project Category</h2>
              <p className="m-4">
                Select the most relevant category that best describes your
                project.
              </p>
              <select
                {...register("category")}
                id="categories"
                className="w-full border border-gray-300 p-4 rounded-xl"
              >
                <option>Choose a category</option>
                <option value="Games">Games</option>
                <option value="Programing">Programing</option>
                <option value="Music">Music</option>
                <option value="Technology">Technology</option>
                <option value="Movies">Movies</option>
                <option value="Fashion">Fashion</option>
              </select>
              <button
                type="button"
                className="w-full mt-4 bg-orange-500 text-white p-4 rounded-xl hover:bg-orange-600"
                onClick={nextStep}
              >
                Next <i className="fa-solid fa-arrow-right"></i>
              </button>
              <button
                type="button"
                className="w-full mt-4 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 rounded-xl p-2 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={prevStep}
              >
                <i className="fa-solid fa-arrow-left"></i> Back
              </button>
            </div>
          )}

          {currentStep === 4 && (
            <div id="step-5" className="step">
              <h2 className="text-2xl font-bold m-4">Project Time</h2>
              <p className="m-4">
                Set the project timeline by selecting a start and end date.
              </p>
              <input
                {...register("start_date")}
                type="date"
                id="startDate"
                className="w-full border border-gray-300 p-4 rounded-xl"
              />
              <input
                {...register("end_date")}
                type="date"
                id="endDate"
                className="w-full mt-4 border border-gray-300 p-4 rounded-xl"
              />
              <button
                type="submit"
                className="w-full mt-4 bg-green-500 text-white p-4 rounded-xl hover:bg-green-600 font-bold"
              >
                <i className="fa-solid fa-plus"></i> Create project
              </button>
              <button
                type="button"
                className="w-full mt-4 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 rounded-xl p-2 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={prevStep}
              >
                <i className="fa-solid fa-arrow-left"></i> Back
              </button>
            </div>
          )}

          {currentStep === totalSteps + 1 && (
            <div id="final-step" className="step">
              <h2 className="text-3xl font-bold text-green-600 m-4">
                🎉 Project Created!
              </h2>
              <p className="m-4">
                Congratulations! Your project has been successfully created. You
                can now invite team members, upload files, and start working on
                it.
              </p>
              <button
                type="button"
                onClick={handleGoToProjects}
                className="w-full mt-4 bg-green-500 text-white p-4 rounded-xl hover:bg-green-600"
              >
                Go to My Projects
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default NewProject;
