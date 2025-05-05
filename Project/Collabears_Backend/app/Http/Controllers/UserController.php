<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */public function update(Request $request)
{
    $user = Auth::user();

    $validated = $request->validate([
        'first_name' => 'nullable|string|max:255',
        'last_name' => 'nullable|string|max:255',
        'email' => 'nullable|email|max:255',
        'birth' => 'nullable|date',
        'phone_number' => 'nullable|string|max:20',
        'name' => 'nullable|string|max:255',
        'bio' => 'nullable|string',
        'url' => 'nullable|url',
        'company' => 'nullable|string|max:255',
        'country' => 'nullable|string|max:255',
        'profile_picture' => 'nullable|url',
    ]);

    $user->update($validated);

    return response()->json($user);
}
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
