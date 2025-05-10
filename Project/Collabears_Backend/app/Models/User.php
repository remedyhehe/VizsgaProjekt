<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password_id',
        'first_name',
        'last_name',
        'birth',
        'bio',
        'url',
        'phone_number',
        'company',
        'country',
        'profile_picture',
        'subscription_id'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function password()
    {
        return $this->belongsTo(Password::class);
    }
    public function passwordRelation()
    {
        return $this->belongsTo(Password::class, 'password_id');
    }
    public function projects()
{
    return $this->belongsToMany(Project::class, 'workers', 'user_id', 'project_id', );
}
    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }


}
