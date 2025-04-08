<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('project_id')) {
            $tasks = Task::where('project_id', $request->project_id)->get();
        } else {
            $tasks = Task::all();
        }

        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'project_id' => 'required|integer|exists:projects,id',
            'column_id' => 'required|integer|exists:columns,id',
        ]);

        try {
            $task = Task::create([
                'name' => $validatedData['name'],
                'project_id' => $validatedData['project_id'],
                'column_id' => $validatedData['column_id'],
            ]);

            return response()->json([
                'message' => 'Task added successfully',
                'id' => $task->id,
                'name' => $task->name,
                'project_id' => $task->project_id,
                'column_id' => $task->column_id,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error adding task',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $task->column_id = $request->input('column_id', $task->column_id);
        $task->save();

        return response()->json($task);
    }

    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(null, 204);
    }
}