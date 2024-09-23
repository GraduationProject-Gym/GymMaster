<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GymClass;
class GymClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return GymClass::all();
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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|integer',
            'total_no_of_session' => 'required|integer',
            'max_trainee' => 'required|integer',
        ]);

        return GymClass::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return GymClass::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $gymClass = GymClass::findOrFail($id);
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|required|boolean',
            'total_no_of_session' => 'sometimes|required|integer',
            'max_trainee' => 'sometimes|required|integer',
        ]);

        $gymClass->update($validated);
        return $gymClass;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $gymClass = GymClass::findOrFail($id);
        $gymClass->delete();
        return response()->noContent();
    }
}
