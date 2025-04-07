<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       User::factory(10)->create();

       $passwordId = DB::table('passwords')->insertGetId([
        'hashed_password' => bcrypt('your-password')
    ]);
    
    User::create([
        'name' => 'Teszt Felhasználó',
        'email' => 'teszt@example.com',
        'password_id' => $passwordId,
    ]);
    }
}
