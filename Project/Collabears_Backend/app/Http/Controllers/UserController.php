<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getUser(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'User not authenticated.'], 401);
        }

        $subscription = $user->subscription_id
        ? Subscription::find($user->subscription_id)
        : null;

        Log::info('User subscription fetched:', [
            'user_id' => $user->id,
            'subscription_id' => $user->subscription_id,
            'subscription_name' => $subscription ? $subscription->name : 'Free Plan',
        ]);

        return response()->json([
            'subcription' => $subscription ? $subscription->name : 'Free Plan',
        ]);
    }

    public function getSubscription(Request $request)
    {
        $user = $request->user(); // Az authentikált felhasználó
        return response()->json(['subscription_id' => $user->subscription_id]);
    }

    public function updateSubscription(Request $request)
    {
        $user = User::find(Auth::id());

        // Ellenőrizd, hogy a felhasználó autentikált-e
        if (!$user) {
            return response()->json(['error' => 'User not authenticated.'], 401);
        }

        // Validáció
        $validated = $request->validate([
            'subscription_id' => 'required|exists:subscriptions,id',
        ]);

        // Frissítsd a felhasználó előfizetését
        try {
            $user->subscription_id = $validated['subscription_id'];
            $user->save();

            return response()->json([
                'message' => 'Subscription updated successfully.',
                'user' => $user
            ]);
        } catch (\Exception $e) {
            // Logold a hibát és küldj vissza egy megfelelő válasz
            Log::error('Error updating subscription: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update subscription.'], 500);
        }
    }

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
     */
    public function update(Request $request)
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
