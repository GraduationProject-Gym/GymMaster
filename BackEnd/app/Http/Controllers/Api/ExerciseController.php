<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Exercise;
use App\Http\Resources\Api\ExerciseResource;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ExerciseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Exercise::class);
        $exercises = Exercise::all();
        return response()->json($exercises, 200);
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
        $this->authorize('create', Exercise::class);

        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'category' => 'required|in:Strength,Cardio,Flexibility and Mobility,Recovery and Rehabilitation',
                'no_of_times' => 'required|integer|min:1',
            ]);
        } catch (ValidationException $e) {
            $errors = $e->validator->errors();
            $customMessages = $errors->all();

            return response()->json([
                'message' => 'Validation failed',
                'errors' => $customMessages,
            ], 422);
        }

        $exercise = Exercise::create($validatedData);
        return new ExerciseResource($exercise);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $exercise = Exercise::findOrFail($id);
            $this->authorize('view', $exercise);
            return new ExerciseResource($exercise);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Exercise not found'], 404);   
        }
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
            try {
                $exercise = Exercise::findOrFail($id);
                if (!$exercise) {
                    return response()->json(['message' => 'Exercise not found'], 404);
                }
                $this->authorize('update', $exercise);
     
                $validatedData = $request->validate([
                    'name' => 'required|string|max:255',
                    'category' => 'required|in:Strength,Cardio,Flexibility and Mobility,Recovery and Rehabilitation',
                    'no_of_times' => 'required|integer|min:1',
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
    
            $exercise->update($validatedData);
    
            return new ExerciseResource($exercise);
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
