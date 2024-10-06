<?php

namespace App\Http\Controllers;

use App\Http\Resources\Api\GymClassResource;
use App\Http\Resources\TraineeClassResource;
use App\Http\Resources\TraineeResource;
use App\Http\Resources\TraineeScheduleResource;
use App\Http\Resources\TraineeExerciseResource;
use App\Http\Resources\TraineeEquipmentResource;
use App\Http\Resources\TraineeClassesResource;
use App\Http\Resources\TrainerResource;
use App\Models\GymClass;
use App\Models\UserClass;
use App\Models\Trainee;
use App\Models\Memberships;
use App\Models\Subscription;
use Illuminate\Auth\Access\AuthorizationException;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\Review;

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
    public function trainees(){
        try{
            $this->authorize('view', UserClass::class);
            $user = Auth::user();
            $class = GymClass::where('trainer_id', $user->id)->first();
            if(!$class){
                return response()->json([
                    'message' => 'this class not exit'
                ], 403);
            }
            $trainee = $class->user;
            return TraineeClassesResource::collection($trainee);
        }
        catch(AuthorizationException $e){
            return response()->json([
                'message' => 'You are not authorized'
            ], 403);
        }

    }

    public function updateMemperTrainee(Request $request)
    {


        // only reainee can create membership
        $this->authorize('create', UserClass::class);
        try {
            $trainee = Trainee::find($request->user_id);
            $membership = Memberships::find($request->id);
            if ($membership) {
                $subscription = Subscription::find($trainee->user_id);
                if (!$subscription) {
                    return response()->json([
                        'message' => "First Payment",
                    ], 402);
                }
                $trainee->membership_id = $request->id;
                $trainee->save();
            } else {
                return response()->json([
                    'message' => "membership not exist.",
                ], 403);
            }

        } catch (AuthorizationException $e) {
            return response()->json([
                'message' => 'You are not authorized'
            ], 403);
        }

    }

    public function addAndUpdateGoals(Request $request)
    {
        $this->authorize('create', UserClass::class);
        try {
            $user = Auth::user()->id;
            $trainee = Trainee::where('user_id', $user)->first();
            $trainee->goals = $request->goals;
            $trainee->save();
            return response()->json([
                'message' => 'Goal added successfully',
            ], 201);
        } catch (AuthorizationException $e) {
            return response()->json([
                'message' => 'You are not authorized'
            ], 403);
        }
    }

    public function showGoal()
    {
        try {
            // $trainee = User::findOrFail(auth::id());
            $trainee = User::find(Auth::user()->id);
              if(!$trainee){
                response()->json([
                    'message' => 'Trainee not found'
                ], 403);
            } else {
                $goals = $trainee->goals;
                return response()->json([
                    'goals' => $goals,
                ], 201);
            }
        } catch (AuthorizationException $e) {
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
            // 'class_id' => 'required|exists:gym_classes,id',
            'class_id' => 'required|exists:gymclass,id',
        ]);
        $trainee = Trainee::where('user_id',auth::id());
        $class_id = $request->class_id;
        $currentUser = User::find(auth::id());
        
        // $this->authorize('create', $trainee);
        try {
            $this->authorize('create', UserClass::class);
        } catch (AuthorizationException $e) {
            return response()->json([
                'message' => 'You are not authorized to join the class'
            ], 401);
        }
        
        $trainee_class = GymClass::findOrFail($class_id);
        // return ["message"=>$class_id];     
        $no_trainees = UserClass::where('class_id', $request->class_id)->count();
        $exists = UserClass::where('user_id', auth::id())
            ->where('class_id', $class_id)
            ->exists();

        if ($trainee_class->max_trainee > $no_trainees) {
            if (!$exists) {
                $user_class = UserClass::create([
                    'user_id' => auth::id(),
                    'class_id' => $request->class_id
                ]);
            } else {
                return response()->json(['joined' => 'You already joined to this class'], 403);
            }
        } else {
            return response()->json(
                ['message' => 'You cannot join to this class, max number of trainees is exceeded'],403);
        }
        return response()->json([
            'message' => 'You joined to class successfully',
            'trainee_class' => new TraineeClassResource($trainee_class),
            // 'traineeData' => new TraineeResource($trainee),
        ], 201);

    }

    // Train show his joined classes

    public function showJoinedClasses(Request $request) //Request $request
    {
        try {
            $this->authorize('viewAny', UserClass::class);
        } catch (AuthorizationException $e) {
            return response()->json([
                'message' => 'You are not authorized to join the class'
            ], 403);
        }

        $user = User::find(Auth::id());

        if($user->role == 'trainee')
        {
            $joinedClasses = $user->gymClass;
        }
        else if($user->role == 'admin')
        {
            $trainee = User::find($request->trainee_id);
            $joinedClasses = $trainee->gymClass;
        }
        return response()->json([
            // 'traineeData' => $user,
            'joinedClasses' => TraineeClassResource::collection($joinedClasses),
        ]);
    }
    function indexJoinedClassesTrainers()
    {
        try {
            $this->authorize('view', UserClass::class);
        } catch (AuthorizationException $e) {
            return response()->json([
                'message' => 'You are not authorized to show trainers of classes'
            ], 403);
        }
        $user = User::findOrFail(Auth::id());

        if ($user->role == 'trainee') {
            $joinedClasses = $user->gymClass()->with('trainer')->get();
            $trainers = $joinedClasses->map(function ($class) {
                return $class->trainer;
            });

            return response()->json([
                'trainers' => TrainerResource::collection($trainers)
            ]);
        }
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
