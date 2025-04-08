<?php

namespace App\Http\Controllers;

use App\Models\Column;
use App\Models\Task;
use Illuminate\Http\Request;

class ColumnController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('project_id')) {
            $columns = Column::where('project_id', $request->project_id)->get();
        } else {
            $columns = Column::all();
        }

        return response()->json($columns);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'project_id' => 'required|integer|exists:projects,id',
        ]);

        $column = Column::create([
            'name' => $request->name,
            'project_id' => $request->project_id,
        ]);

        return response()->json([
            'message' => 'Column added successfully',
            'id' => $column->id,
            'name' => $column->name,
            'project_id' => $column->project_id,
        ], 201);
    }

    public function destroy($id)
    {
        $column = Column::findOrFail($id);

        // Find and delete all tasks associated with the column
        Task::where('column_id', $id)->delete();

        // Delete the column
        $column->delete();

        return response()->json([
            'message' => 'Column and its tasks deleted successfully'
        ], 204);
    }
}