<?php

namespace App\Http\Controllers;

use App\Http\Resources\TraineeClassResource;
use App\Http\Resources\TraineeResource;
use App\Http\Resources\TraineeScheduleResource;
use App\Http\Resources\TraineeExerciseResource;
use App\Http\Resources\TraineeEquipmentResource;
use App\Models\GymClass;
use App\Models\UserClass;
use App\Models\Trainee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TraineeClassController extends Controller
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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        // user_id  class_id
        $class_id = $request->class_id;
        $trainee = Trainee::findOrFail(auth::id());
        $trainee_class = GymClass::findOrFail($class_id);
        $exists = UserClass::where('user_id', auth::id())
            ->where('class_id', $class_id)
            ->exists();

        if (!$exists) {
            $user_class = UserClass::create([
                'user_id' => auth::id(),
                'class_id' => $request->class_id
            ]);
        }
        else{
            return response()->json(['message'=>'You are join to this class']);
        }
        return response()->json([
            'message' => 'You joined to class successfully',
            'trainee_class' => new TraineeClassResource($trainee_class),
            'traineeData' => new TraineeResource($trainee),
        ], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show($id)//GymClass $gymClass)
    {
        $trainee = User::findOrFail(auth::id());
        $this->authorize('view', $trainee);
        $gymClass = GymClass::findOrFail($id);
        return response()->json([
            'trainee_class' => new TraineeClassResource($gymClass),
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GymClass $gymClass)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GymClass $gymClass)
    {
        //
    }
}
