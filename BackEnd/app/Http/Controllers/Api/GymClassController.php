<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GymClass;
use App\Http\Resources\Api\GymClassResource;

class GymClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', GymClass::class);
        $gymClasses = GymClass::with(['equipments', 'exercises','trainer.user'])->get();
        return response()->json($gymClasses, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', GymClass::class);

    try {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|boolean',
            'total_no_of_session' => 'required|integer|min:1',
            'max_trainee' => 'required|integer|min:1',
        ]);
    } catch (ValidationException $e) {
        $errors = $e->validator->errors();
        $customMessages = [];

        foreach ($errors->all() as $error) {
            $customMessages[] = $error;  
        }

        return response()->json([
            'message' => 'Validation failed',
            'errors' => $customMessages,
        ], 422);
    }

    $gymClass = GymClass::create($validatedData);

    return new GymClassResource($gymClass);
        // $this->authorize('create', GymClass::class);

        // $gymClass = GymClass::create($request->all());

        // return new GymClassResource($gymClass);
    }
       /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $gymClass = GymClass::with(['equipments', 'exercises'])->findOrFail($id);
            $this->authorize('view', $gymClass);
            return new GymClassResource($gymClass);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Gym class not found'], 404);
        }
    }
     /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $gymClass = GymClass::findOrFail($id);
            if (!$gymClass) {
                return response()->json(['message' => 'Gym class not found'], 404);
            }
            $this->authorize('update', $gymClass);
    
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'status' => 'required|boolean',
                'total_no_of_session' => 'required|integer|min:1',
                'max_trainee' => 'required|integer|min:1',
            ]);
        } catch (ValidationException $e) {
            $errors = $e->validator->errors();
            $customMessages = [];
    
            foreach ($errors->all() as $error) {
                $customMessages[] = $error;   
            }
    
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $customMessages,  
            ], 422);
        }
    
        $gymClass->update($validatedData);
    
        return new GymClassResource($gymClass);
    }
     /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $gymClass = GymClass::find($id);
        $this->authorize('delete', $gymClass);
        if (!$gymClass) {
            return response()->json(['message' => 'Gym class not found'], 404);
        }
    
        $gymClass->delete();
    
        return response()->json(['message' => 'Gym class deleted successfully']);
    }
}
