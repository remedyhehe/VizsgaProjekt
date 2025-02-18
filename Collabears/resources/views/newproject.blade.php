@extends ('layouts.header')

@section('title')
    New Project
@endsection

@section('content')

<nav class="flex m-4 justify-center" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li class="inline-flex items-center">
            <a href="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-orange-500">
                <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                </svg>
                Home
            </a>
        </li>
        <li>
            <div class="flex items-center">
                <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                <a href="/myprojects" class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-orange-500">My Projects</a>
            </div>
        </li>
        <li aria-current="page">
            <div class="flex items-center">
                <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">New Project</span>
            </div>
        </li>
    </ol>
</nav>

<div class="max-w-lg mx-auto p-6 mt-6 justify-center text-center">
    <div id="step-1" class="step">
        <h1 class="text-2xl font-bold m-4">Create Project</h1>
        <p class="m-4">Getting started is easy. You just need to create the name of your new project.</p>
        <input type="text" id="projectName" class="w-full border border-gray-300 p-4 rounded-xl" placeholder="Project name">
        <button onclick="nextStep()" class="w-full mt-4 bg-orange-500 text-white p-4 rounded-xl hover:bg-orange-600">Next <i class="fa-solid fa-arrow-right"></i></button>
    </div>
    
    <div id="step-2" class="step hidden">
        <h2 class="text-2xl font-bold m-4">Project Description</h2>
        <p class="m-4">Describe your project in a few sentences. Explain its purpose, goals, and key features.</p>
        <textarea id="projectDescription" class="w-full border border-gray-300 p-2 rounded-xl" placeholder="Enter project description"></textarea>
        <button onclick="nextStep()" class="w-full mt-4 bg-orange-500 text-white p-4 rounded-xl hover:bg-orange-600">Next <i class="fa-solid fa-arrow-right"></i></button>
        <button onclick="prevStep()" class="w-full mt-4 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 rounded-xl p-2 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"><i class="fa-solid fa-arrow-left"></i> Back</button>
    </div>
    
    <div id="step-3" class="step hidden">
        <h2 class="text-2xl font-bold m-4">Project Category</h2>
        <p class="m-4">Select the most relevant category that best describes your project.</p>
        <select id="categories" class="w-full border border-gray-300 p-4 rounded-xl">
            <option selected>Choose a category</option>
            <option value="games">Games</option>
            <option value="programs">Programs</option>
            <option value="music">Music</option>
            <option value="technology">Technology</option>
            <option value="movies">Movies</option>
            <option value="fashion">Fashion</option>
        </select>
        <button onclick="nextStep()" class="w-full mt-4 bg-orange-500 text-white p-4 rounded-xl hover:bg-orange-600">Next <i class="fa-solid fa-arrow-right"></i></button>
        <button onclick="prevStep()" class="w-full mt-4 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 rounded-xl p-2 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"><i class="fa-solid fa-arrow-left"></i> Back</button>    </div>
    
    <div id="step-4" class="step hidden">
        <h2 class="text-2xl font-bold m-4">Project Team</h2>
        <p class="m-4">Specify how many people will be working on this project.</p>
        <input type="number" id="teamSize" class="w-full border border-gray-300 p-4 rounded-xl" placeholder="Number of team members">
        <button onclick="nextStep()" class="w-full mt-4 bg-orange-500 text-white p-4 rounded-xl hover:bg-orange-600">Next <i class="fa-solid fa-arrow-right"></i></button>
        <button onclick="prevStep()" class="w-full mt-4 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 rounded-xl p-2 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"><i class="fa-solid fa-arrow-left"></i> Back</button>    </div>
    
    <div id="step-5" class="step hidden">
        <h2 class="text-2xl font-bold m-4">Project Roles</h2>
        <p class="m-4">Assign roles to your team members based on their skills.</p>
        <select id="roles" class="w-full border border-gray-300 p-4 rounded-xl">
            <option selected>Choose a role</option>
            <option value="designer">Designer</option>
            <option value="programmer">Programmer</option>
            <option value="manager">Manager</option>
            <option value="actor">Actor</option>
            <option value="chef">Chef</option>
            <option value="photographer">Photographer</option>
        </select>
        <button onclick="nextStep()" class="w-full mt-4 bg-orange-500 text-white p-4 rounded-xl hover:bg-orange-600">Next <i class="fa-solid fa-arrow-right"></i></button>
        <button onclick="prevStep()" class="w-full mt-4 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 rounded-xl p-2 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"><i class="fa-solid fa-arrow-left"></i> Back</button>    </div>
    
    <div id="step-6" class="step hidden">
        <h2 class="text-2xl font-bold m-4">Project Files</h2>
        <p class="m-4">Upload any necessary files for your project, such as images, documents, or code files.</p>
        
<div class="flex items-center justify-center w-full">
    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-white hover:bg-gray-100 dark:border-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-100">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" class="hidden" />
    </label>
</div> 

<button onclick="nextStep()" class="w-full mt-4 bg-orange-500 text-white p-4 rounded-xl hover:bg-orange-600">Next <i class="fa-solid fa-arrow-right"></i></button>
<button onclick="prevStep()" class="w-full mt-4 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 rounded-xl p-2 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"><i class="fa-solid fa-arrow-left"></i> Back</button>    </div>
    
    <div id="step-7" class="step hidden">
        <h2 class="text-2xl font-bold m-4">Project Time</h2>
        <p class="m-4">Set the project timeline by selecting a start and end date.</p>
        <input type="date" id="startDate" class="w-full border border-gray-300 p-4 rounded-xl">
        <input type="date" id="endDate" class="w-full mt-4 border border-gray-300 p-4 rounded-xl">
        <button onclick="nextStep()" class="w-full mt-4 bg-green-500 text-white p-4 rounded-xl hover:bg-green-600 font-bold"><i class="fa-solid fa-plus"></i> Create project</button>
        <button onclick="prevStep()" class="w-full mt-4 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 rounded-xl p-2 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"><i class="fa-solid fa-arrow-left"></i> Back</button>    </div>
    
    <div id="final-step" class="step hidden">
        <h2 class="text-3xl font-bold text-green-600 m-4">🎉 Project Created!</h2>
        <p class="m-4">Congratulations! Your project has been successfully created. You can now invite team members, upload files, and start working on it.</p>
        <button onclick="location.href='/myprojects'" class="w-full mt-4 bg-green-500 text-white p-4 rounded-xl hover:bg-green-600">Go to My Projects</button>
    </div>
    
    
</div>

<script>
    let currentStep = 1;
const totalSteps = 7; // Az utolsó tényleges lépés száma

function nextStep() {
    document.getElementById(`step-${currentStep}`).classList.add("hidden");
    
    if (currentStep < totalSteps) {
        currentStep++;
        document.getElementById(`step-${currentStep}`).classList.remove("hidden");
    } else {
        // Az utolsó lépés után a "Projekt létrehozva" képernyőt mutatjuk
        document.getElementById("final-step").classList.remove("hidden");
    }
}

function prevStep() {
    if (currentStep > 1) {
        document.getElementById(`step-${currentStep}`).classList.add("hidden");
        currentStep--;
        document.getElementById(`step-${currentStep}`).classList.remove("hidden");
    }
}

</script>

@endsection