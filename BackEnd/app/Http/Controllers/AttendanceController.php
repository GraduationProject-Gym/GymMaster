<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\AuthorizationException;

class AttendanceController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {

    }
    public function checkin(Request $request)
    {//30|BjvahpfhfO4iHQVBdagA4qVFxHAsVg4Gi811tstaa5f0c484 
        try {
            $this->authorize('create', Attendance::class);
        } catch (AuthorizationException $e) {
            return response()->json([
                'message' => 'You are not authorized to checkin'
            ], 403);
        }
        Attendance::create([
            'check_in' => now(),
            'user_id' => $request->user_id
        ]);
        return response()->json([
            'message' => 'Attendance recorded successfully'
        ]);
    }
   
    public function checkout(Request $request)
    {
        try {
            $this->authorize('create', Attendance::class);
        } catch (AuthorizationException $e) {
            return response()->json([
                'message' => 'You are not authorized to checkout'
            ], 403);
        }
        $attendance = Attendance::where('user_id', $request->user_id)
            ->whereNotNull('check_in')
            ->whereNull('check_out')
            ->first();

        if ($attendance) {
            $attendance->update([
                'check_out' => now(),
            ]);

            return response()->json([
                'message' => 'Checked out successfully!',
                'attendance' => $attendance
            ], 200);
        }

        return response()->json([
            'message' => 'No valid check-in found or already checked out.',
        ], 404);
    }

}
