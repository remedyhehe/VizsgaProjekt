<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Collabears</title>
    <!-- <link href="./output.css" rel="stylesheet"> -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <script src="https://kit.fontawesome.com/28b979de8c.js" crossorigin="anonymous"></script>

</head>
<body class="min-h-screen flex flex-col">
  <!-- Navbar kezdete -->
    <nav class="bg-gray-800 text-white p-2">
        <div class="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <div class="absolute inset-y-0 left-0 flex items-center">
                <img class="h-24" src="../img/maci.png" alt=""><h1 class="font-bold text-xl">Collabears</h1>
            </div>
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
              <div class="hidden sm:block">
                <div class="flex space-x-4">
                  <a href="./index.php" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page"><i class="fa-solid fa-house"></i> Főoldal</a>
                  <a href="#" class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"><i class="fa-solid fa-play"></i> Projekt indítása</a>
                  <a href="#" class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"><i class="fa-solid fa-plus"></i> Saját Projektek</a>
                  <a href="./projects.php" class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"><i class="fa-solid fa-globe"></i> Böngészés</a>
                </div>
              </div>
            </div>
            <div class="absolute right-0 pr-2 sm:static">
                <a href="#" class="user-icon" id="userIcon">
                    <a href="#" class="user-icon" id="userIcon">
                        <i class="fa-solid fa-circle-user fa-2xl"></i>
                    </a>
                </a>
            </div>
          </div>
        </div>
      
        <div class="sm:hidden" id="mobile-menu">
          <div class="space-y-1 px-2 pb-3 pt-2">
            <a href="./index.php" class="block rounded-md bg-gray-900 px-3 py-2 font-medium text-white" aria-current="page">Főoldal</a>
            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white">Projekt indítás</a>
            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white">Sajtát Projektek</a>
            <a href="./proects.php" class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white">Böngészés</a>
          </div>
        </div>
    </nav>
    <!-- Navbar vége -->