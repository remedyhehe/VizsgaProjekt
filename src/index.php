<?php require "./layouts/header.php" ?>

<div class="bg-gray-50 min-h-screen">
    <!-- Bevezető -->

    <section class="relative bg-cover bg-center text-white py-20">
        <div class="absolute inset-0 bg-[url('../img/proj.jpeg')] bg-cover bg-center blur-[1px]"></div>
        <div class="absolute inset-0 bg-black/30"></div>
        <div class="relative container mx-auto px-6 text-center">
            <h1 class="text-4xl font-bold mb-4">Találd meg a tökéletes csapatodat!</h1>
            <p class="text-lg mb-6">Indítsd el a saját projektedet, vagy csatlakozz másokhoz, hogy együtt valósítsatok
                meg
                nagyszerű dolgokat.</p>
            <div class="flex justify-center space-x-4">
                <a href="./project_start.php"
                    class="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg shadow-md hover:bg-orange-700"><i
                        class="fa-solid fa-folder-plus"></i> Projekt létrehozása</a>
                <a href="./projects.php"
                    class="px-6 py-3 bg-gray-800  text-white font-medium rounded-lg  hover:bg-gray-900 hover:text-white">Böngészés
                    projektek között</a>
            </div>
        </div>
    </section>
    <!-- Információ -->
    <section class="bg-white py-16">
        <div class="container mx-auto px-6">
            <!-- Számlálók -->
            <div class="grid grid-cols-1 md:grid-cols-3 text-center gap-8 mb-12">
                <div>
                    <h3 class="text-4xl font-bold text-orange-500">0</h3>
                    <p class="text-gray-600"><i class="fa-solid fa-play"></i> Elindított projektek</p>
                </div>
                <div>
                    <h3 class="text-4xl font-bold text-orange-500">0</h3>
                    <p class="text-gray-600"><i class="fa-solid fa-users"></i> Csatlakozott tagok</p>
                </div>
                <div>
                    <h3 class="text-4xl font-bold text-orange-500">0</h3>
                    <p class="text-gray-600"><i class="fa-solid fa-check"></i> Aktív projektek</p>
                </div>
            </div>

            <!-- Miért érdemes használni? -->
            <div class="text-center">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Miért érdemes használni az oldalunkat?</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="group bg-gray-100 p-6 rounded-lg shadow-md">
                        <h3 class="text-lg font-semibold mb-3 text-orange-500 group-hover:stroke-white "><i
                                class="fa-solid fa-bolt"></i> Gyors toborzás</h3>
                        <p class="text-gray-600 group-hover:text-orange-500">Találd meg gyorsan és egyszerűen a
                            megfelelő
                            csapattagokat a projekthez.</p>
                    </div>
                    <div class="group bg-gray-100 p-6 rounded-lg shadow-md">
                        <h3 class="text-lg font-semibold mb-3 text-orange-500"><i
                                class="fa-solid fa-magnifying-glass"></i> Egyszerű
                            keresés</h3>
                        <p class="text-gray-600 group-hover:text-orange-500">Szűrj projektek és készségek alapján, hogy
                            könnyen
                            megtaláld, amit keresel.</p>
                    </div>
                    <div class="group bg-gray-100 p-6 rounded-lg shadow-md">
                        <h3 class="text-lg font-semibold mb-3 text-orange-500"><i class="fa-solid fa-earth-europe"></i>
                            Széles
                            közösség</h3>
                        <p class="text-gray-600 group-hover:text-orange-500">Csatlakozz egy aktív és inspiráló
                            közösséghez, ahol
                            mindenki együtt dolgozik a sikerért.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>



    <!-- Kiemelt Projektek -->

    <section class="py-16">
        <div class="container mx-auto px-6">
            <h2 class="text-2xl font-bold text-gray-800 text-center mb-8">Kiemelt Projektek <i
                    class="fa-solid fa-star"></i>
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Project Kártya -->
                <div class="border rounded-lg shadow-lg p-3 text-center">
                    <img src="../img/kep2.png" alt="Card Image" class="w-full h-32 object-cover mb-4 rounded-md">
                    <h2 class="text-lg font-bold mb-2">Project 1</h2>
                    <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    <div class="flex gap-6 mt-10 p-3 text-sm justify-center">
                        <i class="fa-regular fa-heart fa-xl py-5"></i>
                        <button
                            class="bg-orange-500 p-3 rounded text-white hover:bg-gray-700 font-semibold">Részletek</button>
                        <i class="fa-regular fa-star fa-xl py-5 right-0"></i>
                    </div>
                </div>
                <!-- Project Kártya -->
                <div class="border rounded-lg shadow-lg p-3 text-center">
                    <img src="../img/kep2.png" alt="Card Image" class="w-full h-32 object-cover mb-4 rounded-md">
                    <h2 class="text-lg font-bold mb-2">Project 3</h2>
                    <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    <div class="flex gap-6 mt-10 p-3 text-sm justify-center">
                        <i class="fa-regular fa-heart fa-xl py-5"></i>
                        <button
                            class="bg-orange-500  p-3 rounded text-white hover:bg-gray-700 font-semibold">Részletek</button>
                        <i class="fa-regular fa-star fa-xl py-5 right-0"></i>
                    </div>
                </div>
                <!-- Project Kártya -->
                <div class="border rounded-lg shadow-lg p-3 text-center">
                    <img src="../img/kep2.png" alt="Card Image" class="w-full h-32 object-cover mb-4 rounded-md">
                    <h2 class="text-lg font-bold mb-2">Project 4</h2>
                    <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    <div class="flex gap-6 mt-10 p-3 text-sm justify-center">
                        <i class="fa-regular fa-heart fa-xl py-5"></i>
                        <button
                            class="bg-orange-500  p-3 rounded text-white hover:bg-gray-700 font-semibold">Részletek</button>
                        <i class="fa-regular fa-star fa-xl py-5 right-0"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <!-- Hogyan működik -->
    <section class="bg-gray-100 py-16">
        <div class="container mx-auto px-6">
            <h2 class="text-2xl font-bold text-gray-800 text-center mb-8">Hogyan működik?</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                    <div class="text-orange-500 text-4xl mb-4">1</div>
                    <p class="text-gray-600">Hozz létre egy projektet vagy böngéssz a meglévők között.</p>
                </div>
                <div>
                    <div class="text-orange-500 text-4xl mb-4">2</div>
                    <p class="text-gray-600">Adj hozzá szerepeket és készségeket.</p>
                </div>
                <div>
                    <div class="text-orange-500 text-4xl mb-4">3</div>
                    <p class="text-gray-600">Találd meg a csapattagokat, vagy csatlakozz egy projekthez.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Felhasználói Vélemények -->
    <section class="py-16">
        <div class="container mx-auto px-6">
            <h2 class="text-2xl font-bold text-gray-800 text-center mb-8">Felhasználói vélemények <i
                    class="fa-solid fa-comment"></i></h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <p class="text-gray-600 italic">"A platformnak köszönhetően találtam meg a tökéletes csapatot az
                        alkalmazásfejlesztéshez!"</p>
                    <p class="text-gray-800 mt-4 font-bold">- Gergő</p>
                </div>
                <!-- Felhasználói Vélemények -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <p class="text-gray-600 italic">"Egyszerű és gyors módja a projektindításnak, fantasztikus
                        közösség."</p>
                    <p class="text-gray-800 mt-4 font-bold">- Peti</p>
                </div>
                <!-- Felhasználói Vélemények -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <p class="text-gray-600 italic">"Régóta kerestem egy ilyen platformot. Köszönöm!"</p>
                    <p class="text-gray-800 mt-4 font-bold">- Zoli</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-6">
        <div class="container mx-auto px-6 text-center">
            <p>&copy; 2025 Collabears. Minden jog fenntartva.</p>
        </div>
    </footer>
</div>