<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::all(); // `get()` helyett `all()`, így biztosan tömböt kapunk

        return response()->json([
            'status' => true,
            'data' => $projects->map(function ($project) {
                return [
                    'id' => $project->id,
                    'name' => $project->name,
                    'description' => $project->description,
                    'category' => $project->category,
                    'start_date' => $project->start_date,
                    'end_date' => $project->end_date,
                    'is_favorite' => $project->is_favorite,
                    'image_url' => url($project->image_url),
                ];
            }),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    // ProjectController.php
    public function getDashboardData()
    {
        $projectsCount = Project::count(); // a projektek számát adja vissza
        $membersCount = User::count(); // a tagok számát adja vissza

        return response()->json([
            'projects_count' => $projectsCount,
            'members_count' => $membersCount,
        ]);
    }

    public function toggleFavorite($id)
    {
        $project = Project::find($id);

        if ($project) {
            // Toggle the 'is_favorite' status
            $project->is_favorite = !$project->is_favorite;
            $project->save();

            return response()->json([
                'status' => true,
                'message' => 'Favorite status updated',
                'is_favorite' => $project->is_favorite
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Project not found'
        ], 404);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        try {
            $project = new Project();
            $project->name = $request->name;
            $project->description = $request->description;
            $project->category = $request->category;
            $project->start_date = $request->start_date;
            $project->end_date = $request->end_date;
            $project->save();
    
            return response()->json([
                'status' => true,
                'message' => 'Project added successfully',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found',
                'data' => null
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $project
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, $id)
    {
        $project = Project::find($id);

        if ($project == null) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found.',
            ]);
        } 

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string|max:100',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            "image_url" => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Please fix the errors',
                'errors' => $validator->errors()
            ]);
        }
        try {
            $project->name = $request->name;
            $project->description = $request->description;
            $project->category = $request->category;
            $project->start_date = $request->start_date;
            $project->end_date = $request->end_date;
            $project->image_url = $request->image_url;
            $project->save();
    
            return response()->json([
                'status' => true,
                'message' => 'Project updated successfully',
                'data' => $project
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $project = Project::find($id);
        
        // Check if the project exists
        if ($project === null) {
            return response()->json([
                'status' => false,
                'message' => "Project not found."
            ], 404); // 404 Not Found HTTP code
        }

        // Delete the project
        $project->delete();
        
        // Return success response
        return response()->json([
            'status' => true,
            'message' => "Project deleted successfully."
        ], 200); // 200 OK HTTP code
    }
}