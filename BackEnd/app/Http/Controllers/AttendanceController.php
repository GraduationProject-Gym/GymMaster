<?php

namespace App\Http\Controllers;

use App\Http\Resources\AttendanceResource;
use App\Models\Attendance;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Access\AuthorizationException;

class AttendanceController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index(Request $request)
    {
        $user = Auth::user();

        if ($user->role === 'trainee') {
            try {
                $this->authorize('view', Attendance::class);
            } catch (AuthorizationException $e) {
                return response()->json([
                    'message' => 'You are not authorized to view this attendance.'
                ], 403);
            }

            $attendance = Attendance::where('user_id', $user->id)->get();


        } else if ($user->role == 'admin') {
            try {
                $this->authorize('viewAny', Attendance::class);
            } catch (AuthorizationException $e) {
                return response()->json([
                    'message' => 'You are not authorized to show this attendance'
                ], 403);
            }
            $attendance = Attendance::where('user_id', $request->user_id)->get();
        }
        return response()->json([
            'attendance' => AttendanceResource::collection($attendance)
        ], 200);
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
        // return ["message"=>$request->all()];
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
