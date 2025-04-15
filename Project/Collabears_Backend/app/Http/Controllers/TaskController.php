<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Models\Column;

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
            'description' => 'nullable|string|max:255',
            'project_id' => 'required|integer|exists:projects,id',
            'column_id' => 'required|integer|exists:columns,id',
            'due_date' => 'nullable|date',
            'status_id' => 'nullable|integer|exists:statuses,id',
        ]);
    
        $task = Task::create($validatedData);
    
        // Frissítsük az oszlophoz tartozó feladatok számát
        $column = Column::find($validatedData['column_id']);
        $column->updateNumberOfTasks();
    
        return response()->json([
            'message' => 'Task added successfully',
            'task' => $task,
        ], 201);
    }

    public function update(Request $request, $id)
{
    $task = Task::findOrFail($id);

    $validatedData = $request->validate([
        'name' => 'string|max:255',
        'description' => 'nullable|string|max:255',
        'due_date' => 'nullable|date_format:Y-m-d',
        'column_id' => 'nullable|integer|exists:columns,id',
        'status' => 'nullable|string|in:Kész,Nincs kész', // Validate status names
    ]);

    // If a status is provided, find or create the corresponding status ID
    if (isset($validatedData['status'])) {
        $status = \App\Models\Status::firstOrCreate(['name' => $validatedData['status']]);
        $validatedData['status_id'] = $status->id;
    }

    unset($validatedData['status']); // Remove the 'status' field as it's not a column in the tasks table

    $oldColumnId = $task->column_id;
    $task->update($validatedData);

    // Update task counts for columns if moved
    if ($oldColumnId !== $task->column_id) {
        $oldColumn = Column::find($oldColumnId);
        if ($oldColumn) {
            $oldColumn->updateNumberOfTasks();
        }

        $newColumn = Column::find($task->column_id);
        if ($newColumn) {
            $newColumn->updateNumberOfTasks();
        }
    }

    return response()->json([
        'message' => 'Task updated successfully',
        'task' => $task,
    ]);
}
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $columnId = $task->column_id;
        $task->delete();
    
        // Frissítsük az oszlophoz tartozó feladatok számát
        $column = Column::find($columnId);
        if ($column) {
            $column->updateNumberOfTasks();
        }
    
        return response()->json(['message' => 'Task deleted successfully'], 204);
    }
    public function tasksWithDueDates(Request $request)
{
    $tasks = Task::whereNotNull('due_date')
        ->where('project_id', $request->project_id)
        ->get(['id', 'name', 'due_date']); // Fetch only necessary fields

    return response()->json($tasks);
}
}