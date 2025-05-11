<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Project;

class ProjectTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_be_created_updated_and_deleted()
    {
        // Létrehozunk egy felhasználót
        $user = User::factory()->create([
            'name' => 'Original Name',
            'email' => 'original@example.com',
        ]);

        $this->assertDatabaseHas('users', [
            'email' => 'original@example.com',
        ]);

        // Frissítjük a felhasználó nevét
        $user->update([
            'name' => 'Updated Name',
        ]);

        $this->assertDatabaseHas('users', [
            'name' => 'Updated Name',
        ]);

        // Töröljük a felhasználót
        $user->delete();

        $this->assertDatabaseMissing('users', [
            'email' => 'original@example.com',
        ]);
    }

    public function test_project_can_be_created_updated_and_deleted()
    {
        // Létrehozunk egy felhasználót, akihez a projekt tartozik
        $user = User::factory()->create();

        // Projekt létrehozása
        $project = Project::factory()->create([
            'name' => 'Test Project',
            'description' => 'Initial description',
            'category' => 'Development',
        ]);

        $this->assertDatabaseHas('projects', [
            'name' => 'Test Project',
            'description' => 'Initial description',
            'category' => 'Development',
        ]);

        // Projekt frissítése
        $project->update([
            'description' => 'Updated description',
            'category' => 'Research',
        ]);

        $this->assertDatabaseHas('projects', [
            'description' => 'Updated description',
            'category' => 'Research',
        ]);

        // Projekt törlése
        $project->delete();

        $this->assertDatabaseMissing('projects', [
            'name' => 'Test Project',
        ]);
    }
}
