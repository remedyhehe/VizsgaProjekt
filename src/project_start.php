<?php require "./layouts/header.php" ?>


<div class="container p-10">
<div class="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-5">
  <h2 class="text-2xl font-bold mb-4">New Project</h2>
  
  <!-- Projekt neve -->
  <div class="mb-4">
    <label class="block text-gray-700 font-medium mb-2" for="project-name">Project name</label>
    <input type="text" id="project-name" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" placeholder="Type your project name" />
  </div>
  
  <!-- Leírás -->
  <div class="mb-4">
    <label class="block text-gray-700 font-medium mb-2" for="description">Description</label>
    <textarea id="description" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" placeholder="Type your project description" rows="4"></textarea>
  </div>
  
  <!-- Szükséges tagok -->
  <div class="mb-4">
    <label class="block text-gray-700 font-medium mb-2" for="members-needed">Needs number of people:</label>
    <input type="number" id="members-needed" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" min="1" />
  </div>
  
  <!-- Képességek -->
  <div class="mb-4">
    <label class="block text-gray-700 font-medium mb-2">Required knowledge/skills</label>
    <input type="text" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" placeholder="Type required knowledge or skills (pl.: , JavaScript, Design)" />
  </div>

  <!-- Feltételek -->
  <div class="mb-4">
    <label class="block text-gray-700 font-medium mb-2" for="criteria">Terms and conditions</label>
    <textarea id="criteria" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" placeholder="Type your condition" rows="3"></textarea>
  </div>

  <!-- Gombok -->
  <div class="flex justify-end">
    <button class="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-400">Start</button>
  </div>
</div>
</div>



<?php require "./layouts/footer.php" ?>