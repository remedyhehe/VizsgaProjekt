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
            'due_date' => 'nullable|date',
            'column_id' => 'nullable|integer|exists:columns,id',
            'status_id' => 'nullable|integer|exists:statuses,id',
        ]);
    
        $oldColumnId = $task->column_id;
        $task->update($validatedData);
    
        // Frissítsük a régi oszlop feladatainak számát
        if ($oldColumnId !== $task->column_id) {
            $oldColumn = Column::find($oldColumnId);
            if ($oldColumn) {
                $oldColumn->updateNumberOfTasks();
            }
    
            // Frissítsük az új oszlop feladatainak számát
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
}