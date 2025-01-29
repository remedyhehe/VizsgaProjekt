<?php require "../layouts/projectheader.php" ?>

<div class="taskview">

    <!-- Oszlopok listája -->
    <ol class="taskcols bg-slate-500 p-10 mt-10 min-w-fit flex">
        <!-- Oszlop -->
        <li class="taskcol bg-emerald-500 p-2 rounded shadow mx-4 w-72 min-h-20">
            <div class="columnheader flex justify-between p-2 pb-4">
                <h2 class="font-semibold">Name of Column</h2>
                <i class="fa-solid fa-ellipsis inline-block align-middle"></i>
            </div>
            
            <!-- Feladatok listája -->
            <ol class="tasks bg-slate-100 w-full min-h-2">
                <!-- Feladat -->
                <li class="task bg-cyan-800 rounded w-full min-h-2 py-1 px-3 mb-2">
                    <div>
                        <h3 class="taskName">Task</h3>
                        <div class="taskContent">



                        </div>
                    </div>
                    
                </li>
            </ol>
        </li>
        
        <!-- Oszlop -->
        <li class="taskcol bg-emerald-500 p-2 rounded shadow mx-4 w-72 min-h-20">
            <div class="columnheader flex justify-between p-2 pb-4">
                <h2 class="font-semibold">Name of Column</h2>
                <i class="fa-solid fa-ellipsis inline-block align-middle"></i>
            </div>
            
            <!-- Feladatok listája -->
            <ol class="tasks bg-slate-100 w-full min-h-2">
                <!-- Feladat -->
                <li class="task bg-cyan-800 rounded w-full min-h-2 py-1 px-3 mb-2">
                    <div>
                        <h3>Task</h3>
                        <div></div>
                    </div>
                    
                </li>
                <!-- Feladat -->
                <li class="task bg-cyan-800 rounded w-full min-h-2 py-1 px-3 mb-2">
                    <div>
                        <h3>Task</h3>
                        <div></div>
                    </div>
                    
                </li>
                <!-- Feladat -->
                <li class="task bg-cyan-800 rounded w-full min-h-2 py-1 px-3 mb-2">
                    <div>
                        <h3>Task</h3>
                        <div></div>
                    </div>
                    
                </li>
            </ol>
        </li>
    </ol>
</div>


<?php require "../layouts/projectfooter.php" ?>