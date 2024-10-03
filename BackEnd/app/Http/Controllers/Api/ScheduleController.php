<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;
use App\Http\Resources\Api\ScheduleResource;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Schedule::class);
        $schedules = Schedule::with('gymclass')->get();
        return response()->json($schedules, 200);
        // $schedules = Schedule::all();
        // return response()->json($schedules, 200);
        // return ScheduleResource::collection($schedules);
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
        // $this->authorize('create', Schedule::class);

        try {
            $validatedData= $request->validate([
                'class_id' => 'required|exists:gymclass,id',
                'session_start' => 'required|date_format:H:i',
                'session_end' => 'required|date_format:H:i|after:session_start',
                'session_duration' => 'required|numeric|min:0',
                'nameDay' => 'required|string|max:255',
                'date_day'=>'required'
            ]);
        } catch (ValidationException $e) {
            $errors = $e->validator->errors();
            $customMessages = $errors->all();

            return response()->json([
                'message' => 'Validation failed',
                'errors' => $customMessages,
            ], 422);
        }

        $schedule  = Schedule::create($validatedData);
        return new ScheduleResource($schedule );
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
        try {

            $schedule = Schedule::findOrFail($id);
            if (!$schedule) {
                return response()->json(['message' => 'schedule not found'], 404);
            }
            \Log::info('User role: ' . auth()->user()->role);
            // \Log::info('User variable:', ['user' => $user]);

            $this->authorize('update', $schedule);

            $validatedData= $request->validate([
                'class_id' => 'required|exists:gymclass,id',
                'session_start' => 'required|date_format:H:i',
                'session_end' => 'required|date_format:H:i|after:session_start',
                'session_duration' => 'required|numeric|min:0',
                'nameDay' => 'required|string|max:255',
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

        $schedule->update($validatedData);

        return new ScheduleResource($schedule);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
