<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Http\Resources\TraineeClassResource;
use App\Models\GymClass;
use App\Models\Review;
use App\Models\Trainee;
use App\Models\Trainer;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\Access\AuthorizationException;
use App\Models\Schedule;
use App\Models\UserClass;
use App\Http\Resources\ReportResource;
use App\Http\Resources\ReviewResource;
use App\Http\Resources\ReportTraineeResource;
use App\Http\Resources\TraineeJoinedClassReviews;

class ReviewController extends Controller
{
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
        $rules = [
            'rating'=>['required','min:1','max:5','numeric'],
            'comments'=> ['required','string'],
        ];

        $messages = [
            'rating.required' => 'rating mest be in range (1,5)',
            'comments.required' => 'comment is required',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json(["message"=>$validator->errors()], 403);
        }
        if(Auth::user()->role=="trainee"){
            $trainee = Auth::user()->id;
            $trainer = Trainer::where('user_id',$request->user_id)->first();
            $trainer = $trainer->user_id;
            $class = GymClass::where('trainer_id',$trainer)->first();

        }else{
            $trainer = Auth::user()->id;
            $trainee = Trainee::where('user_id',$request->user_id)->first();
            $trainee = $trainee->user_id;
            $class = GymClass::where('trainer_id',$trainer)->first();
        }

        // return ["message"=>$trainer->class_id];
        if (!$trainee) {
            return response()->json(["message"=>"this trainee not found"], 403);
        }
        if (!$trainer) {
            return response()->json(["message"=>"this trainer not found"], 404);
        }
        // Validate the request

        try {
            $this->authorize("create", Review::class);
            $review = Review::create([
                'rating' => $request->rating,
                'comments' => $request->comments,
                'class_id' => $class->id,
                'trainee_id' => $trainee,
                'trainer_id' => $trainer
            ]);
            return response()->json(["message"=>"done"]);
        }catch(AuthorizationException $e){
            return response()->json([
                'message' => "You are not user to show this"
            ], 403);
        }
    }
    public function report(Request $request){

        try {
            $this->authorize("report", Review::class);
            $user = Auth::user();// trainer
            $trainee = User::where("id",$request->trainee_id)->first();
            $class = GymClass::where("trainer_id",$user->id)->first();
            $reviews = Review::where("trainee_id", $request->trainee_id)
                    ->where("class_id", $class->id)
                    ->get();
            return response()->json([
                'class' => new ReportResource($class),
                'review'=> ReviewResource::collection($reviews),
                'trainee'=>new UserResource($trainee),
            ], 200);
        }catch(AuthorizationException $e){
            return response()->json([
                'message' => "You are not trainer owner to show this"
            ], 403);
        }


    }

    public function reportTrainee(Request $request){
        try {

            $this->authorize("traineeReports", Review::class);
            $trainee = Auth::user();
            $gymClasses = $trainee->ClassesTrainees;
            return response()->json([
                'trainee' => new UserResource($trainee),
                'data'=>ReportTraineeResource::collection($gymClasses),
            ], 200);
        }catch(AuthorizationException $e){
            return response()->json([
                'message' => "You are not owner to show this"
            ], 403);
        }


    }

    // index all auth trainee reviews
    public function indexTraineeReviews()
    {
        try {
            $this->authorize("traineeReports", Review::class);
        } catch (AuthorizationException $e) {
            return response()->json([
                'message' => 'You are not authorized to show these reviews'
            ], 403);
        }
        $trainee = Auth::user();
        $joinedClasses = $trainee->gymClass()
            ->with(['classTrainer.user','review'])
            ->get();
        return response()->json([
            // 'message' => $joinedClasses
            'joinedClasses' => TraineeJoinedClassReviews::collection($joinedClasses)
        ]);
    }
    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        //
    }
}
