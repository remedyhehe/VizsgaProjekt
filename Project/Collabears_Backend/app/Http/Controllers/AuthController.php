<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Password;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class AuthController extends Controller
{
    public function getAllUsers()
    {
        $users = User::with('passwordRelation')->get();
        return response()->json(['status' => true, 'data' => $users]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'birth' => 'required|date',
            'password' => 'required|string|min:6|confirmed',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
        ]);

        // 1. Jelszó létrehozása a passwords táblában
        $passwordRecord = Password::create([
            'hashed_password' => Hash::make($request->password)
        ]);

        // 2. Felhasználó létrehozása a password_id-vel
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'birth' => $request->birth,
            'password_id' => $passwordRecord->id,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
        ]);

        return response()->json(['message' => 'Registration successful'], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::with('passwordRelation')->where('email', $request->email)->first();

        if (!$user || !$user->passwordRelation || !Hash::check($request->password, $user->passwordRelation->hashed_password)) {
            return response()->json(['message' => 'Hibás email vagy jelszó'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Sikeres bejelentkezés!',
            'token' => $token,
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Sikeres kijelentkezés!']);
    }
}