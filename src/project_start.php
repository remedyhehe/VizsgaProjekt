<?php require "./layouts/header.php" ?>


<div class="container p-10">
<div class="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-5">
  <h2 class="text-2xl font-bold mb-4">Új Projekt indítása</h2>
  
  <!-- Projekt neve -->
  <div class="mb-4">
    <label class="block text-gray-700 font-medium mb-2" for="project-name">Project neve</label>
    <input type="text" id="project-name" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" placeholder="Írd be a projekt nevét" />
  </div>
  
  <!-- Leírás -->
  <div class="mb-4">
    <label class="block text-gray-700 font-medium mb-2" for="description">Leírás</label>
    <textarea id="description" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" placeholder="Írd le mi is maga a projekt" rows="4"></textarea>
  </div>
  
  <!-- Szükséges tagok -->
  <div class="mb-4">
    <label class="block text-gray-700 font-medium mb-2" for="members-needed">Szükségek emberek száma:</label>
    <input type="number" id="members-needed" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" min="1" />
  </div>
  
  <!-- Képességek -->
  <div class="mb-4">
    <label class="block text-gray-700 font-medium mb-2">Szükséges tudás/készségek</label>
    <input type="text" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" placeholder="Tudás/készségek írása (pl.: , JavaScript, Design)" />
  </div>

  <!-- Feltételek -->
  <div class="mb-4">
    <label class="block text-gray-700 font-medium mb-2" for="criteria">Feltételek</label>
    <textarea id="criteria" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" placeholder="Határozd meg a feltételeket" rows="3"></textarea>
  </div>

  <!-- Gombok -->
  <div class="flex justify-end">
    <button class="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-400">Indítás</button>
  </div>
</div>
</div>



<?php require "./layouts/footer.php" ?>