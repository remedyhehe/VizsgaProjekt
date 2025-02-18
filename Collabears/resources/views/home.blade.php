@extends ('layouts.header')

@section('title')
    home
@endsection

@section('content')
<div class="bg-gray-50 min-h-screen">
    <!-- Bevezető -->

    <section class="relative bg-cover bg-center text-white py-20">
        <div class="absolute inset-0 bg-[url('{{ asset('img/proj.jpeg') }}')] bg-cover bg-center blur-[1px]"></div>
        <div class="absolute inset-0 bg-black/30"></div>
        <div class="relative container mx-auto px-6 text-center">
            <h1 class="text-4xl font-bold mb-4">Find your perfect team!</h1>
            <p class="text-lg mb-6">Start your own project or join others to do great things together.</p>
            <div class="flex justify-center space-x-4">
                <a href="myprojects"
                    class="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg shadow-md hover:bg-orange-700"><i
                        class="fa-solid fa-folder-plus"></i> My Projects</a>
                <a href="projects"
                    class="px-6 py-3 bg-gray-800  text-white font-medium rounded-lg  hover:bg-gray-900 hover:text-white">Browse between projects</a>
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
                    <p class="text-gray-600"><i class="fa-solid fa-play"></i> Started Projects</p>
                </div>
                <div>
                    <h3 class="text-4xl font-bold text-orange-500">0</h3>
                    <p class="text-gray-600"><i class="fa-solid fa-users"></i> Joined Members</p>
                </div>
                <div>
                    <h3 class="text-4xl font-bold text-orange-500">0</h3>
                    <p class="text-gray-600"><i class="fa-solid fa-check"></i> Active Projects</p>
                </div>
            </div>

            <!-- Miért érdemes használni? -->
            <div class="text-center">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Why you should use our site?</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="group bg-gray-100 p-6 rounded-lg shadow-md">
                        <h3 class="text-lg font-semibold mb-3 text-orange-500 group-hover:stroke-white "><i
                                class="fa-solid fa-bolt"></i> Fast recruitment</h3>
                        <p class="text-gray-600 group-hover:text-orange-500">Find the right team members for your project quickly and easily.</p>
                    </div>
                    <div class="group bg-gray-100 p-6 rounded-lg shadow-md">
                        <h3 class="text-lg font-semibold mb-3 text-orange-500"><i
                                class="fa-solid fa-magnifying-glass"></i> Easy searching</h3>
                        <p class="text-gray-600 group-hover:text-orange-500">Filter by projects and skills to easily find what you're looking for.</p>
                    </div>
                    <div class="group bg-gray-100 p-6 rounded-lg shadow-md">
                        <h3 class="text-lg font-semibold mb-3 text-orange-500"><i class="fa-solid fa-earth-europe"></i>
                        Wide community</h3>
                        <p class="text-gray-600 group-hover:text-orange-500">Join an active and inspiring community where everyone works together to succeed.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>



    <!-- Kiemelt Projektek -->
    <section class="py-10">
        <div class="container px-20">
            <h2 class="text-2xl font-bold text-gray-800 text-center mb-8">
                Top Projects <i class="fa-solid fa-star"></i>
            </h2>
            <div class="swiper mySwiper">
                <div class="swiper-wrapper">
                    <!-- Project Kártya -->
                    <div class="swiper-slide border rounded-lg shadow-lg p-3 text-center">
                        <img src="{{ asset('img/kep2.png') }}" alt="Card Image" class="w-full h-32 object-cover mb-4 rounded-md">
                        <h2 class="text-lg font-bold mb-2">Project 1</h2>
                        <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        <div class="flex gap-6 mt-10 p-3 text-sm justify-center">
                            <i class="fa-regular fa-heart fa-xl py-5"></i>
                            <button class="bg-orange-500 p-3 rounded text-white hover:bg-gray-700 font-semibold">
                                More
                            </button>
                            <i class="fa-regular fa-star fa-xl py-5 right-0"></i>
                        </div>
                    </div>
                    <!-- Project Kártya -->
                    <div class="swiper-slide border rounded-lg shadow-lg p-3 text-center">
                        <img src="{{ asset('img/kep2.png') }}" alt="Card Image" class="w-full h-32 object-cover mb-4 rounded-md">
                        <h2 class="text-lg font-bold mb-2">Project 2</h2>
                        <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        <div class="flex gap-6 mt-10 p-3 text-sm justify-center">
                            <i class="fa-regular fa-heart fa-xl py-5"></i>
                            <button class="bg-orange-500 p-3 rounded text-white hover:bg-gray-700 font-semibold">
                                More
                            </button>
                            <i class="fa-regular fa-star fa-xl py-5 right-0"></i>
                        </div>
                    </div>
                    <!-- Project Kártya -->
                    <div class="swiper-slide border rounded-lg shadow-lg mb-10 p-3 text-center">
                        <img src="{{ asset('img/kep2.png') }}" alt="Card Image" class="w-full h-32 object-cover mb-4 rounded-md">
                        <h2 class="text-lg font-bold mb-2">Project 3</h2>
                        <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        <div class="flex gap-6 mt-10 p-3 text-sm justify-center">
                            <i class="fa-regular fa-heart fa-xl py-5"></i>
                            <button class="bg-orange-500 p-3 rounded text-white hover:bg-gray-700 font-semibold">
                                Részletek
                            </button>
                            <i class="fa-regular fa-star fa-xl py-5 right-0"></i>
                        </div>
                    </div>
                    <!-- Project Kártya -->
                    <div class="swiper-slide border rounded-lg shadow-lg mb-10 p-3 text-center">
                        <img src="{{ asset('img/kep2.png') }}" alt="Card Image" class="w-full h-32 object-cover mb-4 rounded-md">
                        <h2 class="text-lg font-bold mb-2">Project 4</h2>
                        <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        <div class="flex gap-6 mt-10 p-3 text-sm justify-center">
                            <i class="fa-regular fa-heart fa-xl py-5"></i>
                            <button class="bg-orange-500 p-3 rounded text-white hover:bg-gray-700 font-semibold">
                                More
                            </button>
                            <i class="fa-regular fa-star fa-xl py-5 right-0"></i>
                        </div>
                    </div>
                    <!-- Project Kártya -->
                    <div class="swiper-slide border rounded-lg shadow-lg mb-10 p-3 text-center">
                        <img src="{{ asset('img/kep2.png') }}" alt="Card Image" class="w-full h-32 object-cover mb-4 rounded-md">
                        <h2 class="text-lg font-bold mb-2">Project 5</h2>
                        <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        <div class="flex gap-6 mt-10 p-3 text-sm justify-center">
                            <i class="fa-regular fa-heart fa-xl py-5"></i>
                            <button class="bg-orange-500 p-3 rounded text-white hover:bg-gray-700 font-semibold">
                                More
                            </button>
                            <i class="fa-regular fa-star fa-xl py-5 right-0"></i>
                        </div>
                    </div>
                    <!-- Project Kártya -->
                    <div class="swiper-slide border rounded-lg shadow-lg mb-10 p-3 text-center">
                        <img src="{{ asset('img/kep2.png') }}" alt="Card Image" class="w-full h-32 object-cover mb-4 rounded-md">
                        <h2 class="text-lg font-bold mb-2">Project 6</h2>
                        <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        <div class="flex gap-6 mt-10 p-3 text-sm justify-center">
                            <i class="fa-regular fa-heart fa-xl py-5"></i>
                            <button class="bg-orange-500 p-3 rounded text-white hover:bg-gray-700 font-semibold">
                                More
                            </button>
                            <i class="fa-regular fa-star fa-xl py-5 right-0"></i>
                        </div>
                    </div>
                </div>
                <!-- Navigáció -->
                <div class="swiper-pagination"></div>
            </div>
            
        </div>
    </section>

    <!-- SwiperJS (az oldal neve ahonnan van a cucc, lényegében ez leegyszerűsíti a dolgunk.-->
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
    <style>
        .swiper {
            width: 100%;
            height: auto;
        }

        .swiper-slide {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        .swiper-pagination-bullet-active{
            background-color:orange !important;
        }

        
    </style>
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
    <script>
        const viewportWidth = window.innerWidth;
        console.log(`A viewport szélessége: ${viewportWidth}px`);

        document.addEventListener('DOMContentLoaded', () => {
            let slidesPerView = 3; // Alapértelmezett szám, hogy hány kártya jelenjen meg

            if(viewportWidth < 790){
                slidesPerView = 1; // Ha kisebb, mint 790px, akkor 1 kártya
            }

            var swiper = new Swiper(".mySwiper", {
      slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
        });
    </script>





    <!-- Hogyan működik -->
    <section class="bg-gray-100 py-16">
        <div class="container mx-auto px-6">
            <h2 class="text-2xl font-bold text-gray-800 text-center mb-8">How it works?</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                    <div class="text-orange-500 text-4xl mb-4">1</div>
                    <p class="text-gray-600">Create a project or browse existing ones.</p>
                </div>
                <div>
                    <div class="text-orange-500 text-4xl mb-4">2</div>
                    <p class="text-gray-600">Add roles and skills.</p>
                </div>
                <div>
                    <div class="text-orange-500 text-4xl mb-4">3</div>
                    <p class="text-gray-600">Find team members or join a project.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Felhasználói Vélemények -->
    <section class="py-16">
        <div class="container mx-auto px-6">
            <h2 class="text-2xl font-bold text-gray-800 text-center mb-8">User reviews<i
                    class="fa-solid fa-comment"></i></h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <p class="text-gray-600 italic">"Thanks to the platform, I found the perfect team for app development!"</p>
                    <p class="text-gray-800 mt-4 font-bold">- Gergő</p>
                </div>
                <!-- Felhasználói Vélemények -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <p class="text-gray-600 italic">"Easy and quick way to get started, fantastic community."</p>
                    <p class="text-gray-800 mt-4 font-bold">- Peti</p>
                </div>
                <!-- Felhasználói Vélemények -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <p class="text-gray-600 italic">"I have been looking for a platform like this for a long time. Thank you!"</p>
                    <p class="text-gray-800 mt-4 font-bold">- Zoli</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    
</div>
@include('layouts.footer')

@endsection
