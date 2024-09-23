<?php

namespace App\Http\Controllers\Api;
use App\Models\Schedule;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Schedule::with('gymClass')->get();
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
        'class_id' => 'required|exists:gym_classes,id',
        'trainer_id' => 'required|exists:trainers,id',
        'start_time' => 'required|date',
        'end_time' => 'required|date|after:start_time',
    ]);

    $schedule = Schedule::create($validated);

    return response()->json([
        'message' => 'Schedule created successfully',
        'schedule' => $schedule
    ], 201);
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        $schedule = Schedule::findOrFail($id);

    $validated = $request->validate([
        'class_id' => 'sometimes|exists:gym_classes,id',
        'trainer_id' => 'sometimes|exists:trainers,id',
        'start_time' => 'sometimes|date',
        'end_time' => 'sometimes|date|after:start_time',
    ]);

    $schedule->update($validated);
    return $schedule;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $schedule = Schedule::findOrFail($id);
        $schedule->delete();
        return response()->noContent();
    }
}
