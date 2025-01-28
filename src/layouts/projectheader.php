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

<body class="">
    <!-- Számítós nézet -->
    <nav class="bg-gray-800 text-white sticky top-0 z-50 px-5 py-4 flex justify-between items-center">
        <!-- Bal oldali logo -->
        <a class="text-3xl font-bold leading-none" href="#">
            <img class="h-12" src="../../img/maci.png" alt="">
        </a>

        <!-- Hamburger menu szine -->
        <div class="lg:hidden">
            <button class="navbar-burger flex items-center text-white p-3">
                <svg class="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Mobile menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
            </button>
        </div>
        <!-- Tartalom -->
        <div
            class="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6 ">
            <a href="./projecthome.php" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:text-orange-500"
                aria-current="page"><i class="fa-solid fa-house"></i> Home</a>
            <a href="./tasks.php" class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-orange-500"
                aria-current="page"><i class="fa-solid fa-list-check"></i> Tasks</a>
            <a href="#" class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-orange-500"><i
                    class="fa-solid fa-calendar"></i> Calendar</a>
            <a href="./projects.php" class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-orange-500"><i
                    class="fa-solid fa-sliders"></i> Settings</a>
            <a href="./projects.php" class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-orange-500"><i
                    class="fa-solid fa-right-from-bracket"></i> Quit</a>
        </div>

        <!-- Bejelentkezés -->
        <div class="hidden lg:inline-block lg:ml-auto text-white">
            <button id="userIcon" class="w-10 h-10 rounded-full cursor-pointer">
                <i class="fa-solid fa-circle-user fa-2xl"></i>
            </button>
            <div id="userDropdown"
                class="hidden absolute right-5 mt-2 w-64 bg-white text-black rounded-lg shadow-lg p-4 z-10">
                <form action="#" method="POST" class="space-y-4">
                    <h2 class="text-gray-800 font-semibold text-lg">Login</h2>
                    <div>
                        <label for="email" class="block text-sm">Email</label>
                        <input type="email" id="email" name="email"
                            class="w-full rounded-md p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm"
                            required>
                    </div>
                    <div>
                        <label for="password" class="block text-sm">Password</label>
                        <input type="password" id="password" name="password"
                            class="w-full rounded-md p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm"
                            required>
                    </div>
                    <button type="submit" class="w-full bg-orange-500 text-white py-2 rounded-md">Login</button>
                </form>
                <div class="mt-4 text-center">
                    <p class="text-sm text-gray-600">
                        You don't have account yet?
                        <a href="./register.php" class="text-orange-500 hover:underline">Regist!</a>
                    </p>
                </div>
            </div>
        </div>
    </nav>
    <!-- Teló nézet -->
    <div class="navbar-menu sitcky top-0 z-50 hidden">
        <div class="navbar-backdrop fixed top-0 inset-0 bg-gray-800 opacity-50"></div>
        <nav
            class="fixed top-0 z-50 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-4 px-5 bg-gray-800 overflow-y-auto">
            <div class="flex items-center mb-8">
                <a class="mr-auto text-3xl font-bold leading-none" href="#">
                    <img class="h-12" src="../img/maci.png" alt="">

                </a>
                <button class="navbar-close">
                    <svg class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>
            <!-- Teló nézet navbarlista -->
            <div>
                <h2 class="text-white font-semibold text-lg">Pages</h2>

                <ul>
                    <li class="mb-1">
                        <a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                            href="./index.php"><i class="fa-solid fa-house"></i> Home</a>
                    </li>
                    <li class="mb-1">
                        <a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                            href="./project_start.php"><i class="fa-solid fa-list-check"></i> Tasks</a>
                    </li>
                    <li class="mb-1">
                        <a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                            href="#"><i class="fa-solid fa-Calendar"></i>Calendar</a>
                    </li>
                    <li class="mb-1">
                        <a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                            href="./projects.php"><i class="fa-solid fa-sliders"></i> Settings</a>
                    </li>
                    <li class="mb-1">
                        <a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                            href="./projects.php"><i class="fa-solid fa-right-from-bracket"></i> Quit</a>
                    </li>
                </ul>
            </div>
            <!-- Login -->
            <!-- <div class="mt-auto">
                <form action="#" method="POST" class="space-y-4">
                    <h2 class="text-white font-semibold text-lg pt-5">Login</h2>
                    <div>
                        <label for="email" class="block text-sm text-gray-400 pl-4 pb-2">Email</label>
                        <input type="email" id="email" name="email"
                            class="w-full rounded-md p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm"
                            required>
                    </div>
                    <div>
                        <label for="password" class="block text-sm text-gray-400 pl-4 pb-2">Password</label>
                        <input type="password" id="password" name="password"
                            class="w-full rounded-md p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm"
                            required>
                    </div>
                    <button type="submit" class="w-full bg-orange-500 text-white py-2 rounded-md">Login</button>
                </form>
                <p class="text-sm text-gray-200 py-2 text-center">
                    You don't have account yet?
                    <a href="./register.php" class="text-orange-500 hover:underline">Regist!</a>
                </p>
                <p class="my-4 text-xs text-center text-gray-400">
                    <span>CollaBears © 2025</span>
                </p>
            </div> -->
        </nav>
    </div>

    <script>
        // Burger menus
        document.addEventListener('DOMContentLoaded', function () {
            // open
            const burger = document.querySelectorAll('.navbar-burger');
            const menu = document.querySelectorAll('.navbar-menu');

            if (burger.length && menu.length) {
                for (var i = 0; i < burger.length; i++) {
                    burger[i].addEventListener('click', function () {
                        for (var j = 0; j < menu.length; j++) {
                            menu[j].classList.toggle('hidden');
                        }
                    });
                }
            }

            // close
            const close = document.querySelectorAll('.navbar-close');
            const backdrop = document.querySelectorAll('.navbar-backdrop');

            if (close.length) {
                for (var i = 0; i < close.length; i++) {
                    close[i].addEventListener('click', function () {
                        for (var j = 0; j < menu.length; j++) {
                            menu[j].classList.toggle('hidden');
                        }
                    });
                }
            }

            if (backdrop.length) {
                for (var i = 0; i < backdrop.length; i++) {
                    backdrop[i].addEventListener('click', function () {
                        for (var j = 0; j < menu.length; j++) {
                            menu[j].classList.toggle('hidden');
                        }
                    });
                }
            }
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