<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'category',
        'start_date',
        'end_date',
        'image_url', // Add this line
    ];

    public function users()
{
    return $this->belongsToMany(User::class, 'workers', 'project_id', 'user_id');
}
    
    
}
