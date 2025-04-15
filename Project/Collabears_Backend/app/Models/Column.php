<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Column extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name',
        'project_id',
        'number_of_tasks',
        'order'
        
    
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
    public function updateNumberOfTasks()
    {
        $this->number_of_tasks = $this->tasks()->count();
        $this->save();
    }
}
