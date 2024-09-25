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
        $gymClasses = GymClass::with(['equipments', 'exercises'])->get();
        return response()->json($gymClasses, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', GymClass::class);

        $gymClass = GymClass::create($request->all());

        return new GymClassResource($gymClass);
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
            
            $this->authorize('update', $gymClass);
           
            $gymClass->update($request->all());
    
           
            return new GymClassResource($gymClass);
            
        } catch (ModelNotFoundException $e) {
            
            return response()->json(['message' => 'Gym class not found'], 404);
        }
        
    }
}
