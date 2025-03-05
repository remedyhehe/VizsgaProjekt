<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Project::factory()->create([
            "name" => "Mobil app fejlesztés",
            "description" => "Fejlessz velünk egy mobil appot!",
            "category" => "Programing",
            "member_number" => 3
        ]);
        Project::factory()->create([
            "name" => "Webfejlesztés",
            "description" => "Fejlessz velünk egy weboldalt!",
            "category" => "Programing",
            "member_number" => 5
        ]);
        Project::factory()->create([
            "name" => "Ruha darab tervezés",
            "description" => "Tervezz meg velünk egy forradalmi ruhadarabot!",
            "category" => "Fashion",
            "member_number" => 4
        ]);
        Project::factory()->create([
            "name" => "Szakácskönyv készítés",
            "description" => "Készíts velünk egy egyedi szakácskönyvet!",
            "category" => "Cooking",
            "member_number" => 2
        ]);
        Project::factory()->create([
            "name" => "Tanuló app",
            "description" => "Fejlessz velünk a diákok segítésére szolgáló telefonos appot!",
            "category" => "Programing",
            "member_number" => 8
        ]);
    }
}
