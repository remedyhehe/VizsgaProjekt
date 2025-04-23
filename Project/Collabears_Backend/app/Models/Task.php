<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use SoftDeletes;
    protected $fillable = ['column_id', 'name', 'description','project_id', 'due_date', 'status_id',  'comments',];

    public function column()
    {
        return $this->belongsTo(Column::class);
    }
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id');
    }

}
