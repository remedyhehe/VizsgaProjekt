<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['column_id', 'name', 'description','project_id',];

    public function column()
    {
        return $this->belongsTo(Column::class);
    }
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

}
