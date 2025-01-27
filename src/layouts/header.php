<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Collabears</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <script src="https://kit.fontawesome.com/28b979de8c.js" crossorigin="anonymous"></script>
</head>

<body class="min-h-screen flex flex-col">
    <!-- Navbar kezdete -->
    <nav class="bg-gray-800 text-white p-2 sticky top-0 z-50">
        <div class="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <!-- Logo -->
                <div class="flex items-center">
                    <img class="h-12 mr-2" src="../img/maci.png" alt="">
                    <h1 class="font-bold text-xl">Collabears</h1>
                </div>

                <!-- Hamburger Icon -->
                <div class="flex sm:hidden">
                    <button id="menuToggle" class="text-white focus:outline-none">
                        <i class="fa-solid fa-bars fa-lg"></i>
                    </button>
                </div>

                <!-- Menu Links (Desktop) -->
                <div class="hidden sm:flex space-x-4">
                    <a href="./index.php" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                        aria-current="page"><i class="fa-solid fa-house"></i> Főoldal</a>
                    <a href="./project_start.php"
                        class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"><i
                            class="fa-solid fa-play"></i> Projekt indítása</a>
                    <a href="#"
                        class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"><i
                            class="fa-solid fa-plus"></i> Saját Projektek</a>
                    <a href="./projects.php"
                        class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"><i
                            class="fa-solid fa-globe"></i> Böngészés</a>
                </div>

                <!-- User Dropdown -->
                <div class="relative">
                    <button id="userIcon" class="w-10 h-10 rounded-full cursor-pointer">
                        <i class="fa-solid fa-circle-user fa-2xl"></i>
                    </button>
                    <div id="userDropdown"
                        class="hidden absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg p-4 z-10">
                        <form action="#" method="POST" class="space-y-4">
                            <h2 class="text-gray-800 font-semibold text-lg">Bejelentkezés</h2>
                            <div>
                                <label for="email" class="block text-sm">Email</label>
                                <input type="email" id="email" name="email"
                                    class="w-full rounded-md p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm"
                                    required>
                            </div>
                            <div>
                                <label for="password" class="block text-sm">Jelszó</label>
                                <input type="password" id="password" name="password"
                                    class="w-full rounded-md p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm"
                                    required>
                            </div>
                            <button type="submit" class="w-full bg-gray-800 text-white py-2 rounded-md">Bejelentkezés</button>
                        </form>
                        <div class="mt-4 text-center">
                            <p class="text-sm text-gray-600">
                                Nincs még fiókod?
                                <a href="./register.php" class="text-blue-500 hover:underline">Regisztrálj</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div id="mobileMenu" class="hidden sm:hidden mt-2">
                <a href="./index.php" class="block rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                    aria-current="page"><i class="fa-solid fa-house"></i> Főoldal</a>
                <a href="./project_start.php"
                    class="block rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"><i
                        class="fa-solid fa-play"></i> Projekt indítása</a>
                <a href="#"
                    class="block rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"><i
                        class="fa-solid fa-plus"></i> Saját Projektek</a>
                <a href="./projects.php"
                    class="block rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"><i
                        class="fa-solid fa-globe"></i> Böngészés</a>
            </div>
        </div>
    </nav>
    <!-- Navbar vége -->

    <!-- JavaScript -->
    <script>
        // Hamburger menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');

        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // User dropdown toggle
        const userIcon = document.getElementById('userIcon');
        const userDropdown = document.getElementById('userDropdown');

        userIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
            if (!userIcon.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.add('hidden');
            }
        });
    </script>
</body>

</html>
