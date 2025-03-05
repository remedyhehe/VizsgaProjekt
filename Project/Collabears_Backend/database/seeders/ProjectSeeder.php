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
        Project::factory()->create([
            "name" => "Lövöldözős játék",
            "description" => "Készíts és ötletelj velünk egy új csgo elkészítésében.",
            "category" => "Games",
            "member_number" => 12
        ]);
        Project::factory()->create([
            "name" => "Open World Game",
            "description" => "Szeretnél velünk egy iszonyatosan jó open world gamet fejleszteni? Gyere és csatlakozz!",
            "category" => "Games",
            "member_number" => 14
        ]);
        Project::factory()->create([
            "name" => "Halálos Iramban 20",
            "description" => "Forgasd le velünk és készítsd el te a forgatókönyvet az új Halálos iramban filmnek!",
            "category" => "Movies",
            "member_number" => 1
        ]);
        Project::factory()->create([
            "name" => "Rap music",
            "description" => "Tudsz rappelni? Ha igen akkor csatlakozz, hogy össze rakjunk egy berobbanó számot!",
            "category" => "Music",
            "member_number" => 2
        ]);
    }
}
