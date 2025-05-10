<?php

namespace Database\Seeders;

use App\Models\Subscription;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Subscription::create([
            'name' => 'Free',
        ]);
        Subscription::create([
            'name' => 'Pro',
        ]);
        Subscription::create([
            'name' => 'Elite',
        ]);
    }
}
