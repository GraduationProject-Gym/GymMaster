<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Equipment;
use Illuminate\Http\Request;
use App\Http\Resources\Api\EquipmentsResource;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class EquipmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Equipment::class);
        $equipments = Equipment::all();
        return response()->json($equipments, 200);
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
        $this->authorize('create', Equipment::class);

        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'used_weight' => 'nullable|numeric|min:0',
                'number_of_equipments' => 'required|integer|min:1',
            ]);
        } catch (ValidationException $e) {
            $errors = $e->validator->errors();
            $customMessages = $errors->all();

            return response()->json([
                'message' => 'Validation failed',
                'errors' => $customMessages,
            ], 422);
        }

        $equipment = Equipment::create($validatedData);
        return new EquipmentsResource($equipment);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $equipment = Equipment::findOrFail($id);
            $this->authorize('view', $equipment);
            return new EquipmentsResource($equipment);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Equipment not found'], 404);   
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Equipment $equipment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Equipment $equipment)
    {
        try {
            $equipment = Equipment::findOrFail($id);
            $this->authorize('update', $equipment);
 
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'used_weight' => 'nullable|numeric|min:0',
                'number_of_equipments' => 'required|integer|min:1',
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

        $equipment->update($validatedData);

        return new EquipmentsResource($equipment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equipment $equipment)
    {
        $equipment = Equipment::find($id);
    $this->authorize('delete', $equipment);

    if (!$equipment) {
        return response()->json(['message' => 'Equipment not found'], 404);
    }

    $equipment->delete();

    return response()->json(['message' => 'Equipment deleted successfully']);
    }
}
