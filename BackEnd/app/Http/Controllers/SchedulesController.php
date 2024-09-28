<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;
use App\Http\Resources\TraineeScheduleResource;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $schedules = Schedule::with('gymClass')->get();

        if ($schedules->isEmpty()) {
            return response()->json(['message' => 'No schedules found'], 404);
        }

        return TraineeScheduleResource::collection($schedules);
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

    public function show($id)
    {
        $schedule = Schedule::with('gymClass')->find($id);

        if (!$schedule) {
            return response()->json(['message' => 'Schedule not found'], 404);
        }

        if (!$schedule->gymClass) {
            return response()->json([
                'message' => 'Gym class not found for this schedule',
                'schedule' => $schedule
            ], 404);
        }

        return response()->json(new TraineeScheduleResource($schedule));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Schedule $schedule)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        //
    }
}
