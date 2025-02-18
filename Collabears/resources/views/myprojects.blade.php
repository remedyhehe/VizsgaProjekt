@extends ('layouts.header')

@section('title')
    contact
@endsection

@section('content')

<nav class="flex m-4 justify-center" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
      <li class="inline-flex items-center">
        <a href="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-orange-500">
          <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
          </svg>
          Home
        </a>
      </li>
      <li aria-current="page">
        <div class="flex items-center">
          <svg class="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg>
          <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">My projects</span>
        </div>
      </li>
    </ol>
  </nav>
  <div class="flex flex-col p-5 items-center justify-center">
    <a href="/newproject">
      <button class="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
        New Project
      </button>
    </a>
  </div>

<div class="flex flex-col p-5 items-center justify-center gap-10">
  <h1 class="text-2xl font-bold">My Projects</h1>
        <div class="p-5 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img class="object-cover w-full rounded  h-full md:h-auto md:w-48" src="../img/kep2.png" alt="">
            <div class="flex flex-col justify-between p-4">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Project 1</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut, corrupti maiores qui in voluptates exercitationem recusandae repudiandae, nostrum est iure fugit quam, incidunt tempora natus sequi dignissimos aut dolor eius.</p>
            </div>
            <div>
                <button type="button" class="w-20  focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><i class="fa-solid fa-eye"></i></button>
            <button type="button" class="w-20 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"><i class="fa-solid fa-pen-to-square"></i></button>
            <button type="button" class="w-20  focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><i class="fa-solid fa-trash"></i></button>   
            </div>
        </div>
        <div class=" p-5 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img class="object-cover w-full rounded h-full md:h-auto md:w-48 " src="../img/kep2.png" alt="">
            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Project 2</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor, voluptas. Voluptatem consequatur quasi, voluptatum consequuntur natus at quo nobis vero ipsa quisquam aliquam sequi eligendi explicabo porro, suscipit nesciunt. Libero!</p>
            </div>
            <div>
                <button type="button" class="w-20 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><i class="fa-solid fa-eye"></i></button>
                <button type="button" class="w-20 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"><i class="fa-solid fa-pen-to-square"></i></button>
                <button type="button" class="w-20 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><i class="fa-solid fa-trash"></i></button>   
            </div>
            
        </div>
</div>

<!-- Kategorák vége -->
@endsection