<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\UserEquipment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\TraineeEquipmentResource;

class EquipmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }
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
    public function show(Equipment $equipment)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equipment $equipment)
    {
        //
    }

    // work on
    public function workOn(Request $request)
    {
        $request->validate([
            'equipment_id' => 'required|exists:equipments,id',
        ]);

        // $exists = UserEquipment::where('user_id', auth::id())
        //     ->where('equipment_id', $request->equipment_id)
        //     ->exists();

        // if ($exists) {
        //     return response()->json(['message' => 'You already have this equipment'], 400);
        // }

        UserEquipment::create([
            'user_id' => auth::id(),
            'equipment_id' => $request->equipment_id
        ]);

        return response()->json([
            'message' => 'You have successfully joined our gym with the selected equipment',
            'equipmentData' => new TraineeEquipmentResource(Equipment::find($request->equipment_id)),
        ], 201);
    }
}
