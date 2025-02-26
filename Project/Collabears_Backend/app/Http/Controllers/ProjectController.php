<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;

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
        'data' => $projects ?? [] // Ha nincs projekt, akkor üres tömböt küldünk
    ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
            $project->member_number = $request->member_number;
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
    public function show(Project $project)
    {
        //
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
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
