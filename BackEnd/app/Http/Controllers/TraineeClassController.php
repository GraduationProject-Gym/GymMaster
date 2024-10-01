<?php

namespace App\Http\Controllers;

use App\Http\Resources\TraineeClassResource;
use App\Http\Resources\TraineeResource;
use App\Http\Resources\TraineeScheduleResource;
use App\Http\Resources\TraineeExerciseResource;
use App\Http\Resources\TraineeEquipmentResource;
use App\Http\Resources\TraineeClassesResource;
use App\Models\GymClass;
use App\Models\UserClass;
use App\Models\Trainee;
use App\Models\Memberships;
use App\Models\Subscription;
use Illuminate\Auth\Access\AuthorizationException;
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
    }
    public function trainees(Request $request){
        // return $request->id;
        $trainee = GymClass::where('id', $request->id)->first();
        $trainee = $trainee->user;

        return TraineeClassesResource::collection($trainee);
    }

    public function updateMemperTrainee(Request $request){


        // only reainee can create membership
        $this->authorize('create', UserClass::class);
        try{
            $trainee = Trainee::find($request->user_id);
            $membership = Memberships::find($request->id);
            if($membership){
                $subscription = Subscription::find($trainee->user_id);
                if(!$subscription){
                    return response()->json([
                        'message'=>"First Payment",
                    ],402);
                }
                $trainee->membership_id = $request->id;
                $trainee->save();
            }else{
                return response()->json([
                    'message'=>"membership not exist.",
                ],403);
            }

        }catch(AuthorizationException $e){
            return response()->json([
                'message' => 'You are not authorized'
            ], 403);
        }

    }

    public function addAndUpdateGoals(Request $request){
        $this->authorize('create', UserClass::class);
        try{
            $user = Auth::user()->id;
            $trainee = Trainee::find($user);
            $trainee->goals = $request->goals;
            $trainee->save();
        }catch(AuthorizationException $e){
            return response()->json([
                'message' => 'You are not authorized'
            ], 403);
        }
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'class_id' => 'required|exists:gym_classes,id',
        ]);
        $class_id = $request->class_id;
        $trainee = Trainee::findOrFail(auth::id());
        $currentUser = User::findOrFail(auth::id());
        // $this->authorize('create', $trainee);
        try {
            $this->authorize('create', UserClass::class);
        } catch (AuthorizationException $e) {
            return response()->json([
                'message' => 'You are not authorized to join the class'
            ], 403);
        }

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
            return response()->json(['message'=>'You joined to this class']);
        }
        return response()->json([
            'message' => 'You joined to class successfully',
            'trainee_class' => new TraineeClassResource($trainee_class),
            // 'traineeData' => new TraineeResource($trainee),
        ], 201);

    }

    // Train show his joined classes

    public function showJoinedClasses()
    {
        $trainee = User::findOrFail(Auth::id());
        return response()->json([
            'traineeData' => $trainee
        ]);
    }
    /**
     * Display the specified resource.
     */
    public function show($id)//GymClass $gymClass)
    {
        $trainee = User::findOrFail(auth::id());
        // $this->authorize('view', $trainee);
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
