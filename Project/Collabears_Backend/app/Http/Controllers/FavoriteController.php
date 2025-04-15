<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function toggleFavorite($projectId)
    {
        $userId = Auth::id(); // Get the currently authenticated user's ID

        // Check if the project is already in favorites
        $favorite = Favorite::where('user_id', $userId)
            ->where('project_id', $projectId)
            ->first();

        if ($favorite) {
            // If it exists, remove it
            $favorite->delete();

            return response()->json([
                'status' => true,
                'message' => 'Project removed from favorites',
            ]);
        } else {
            // Otherwise, add it to favorites
            Favorite::create([
                'user_id' => $userId,
                'project_id' => $projectId,
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Project added to favorites',
            ]);
        }
    }
}