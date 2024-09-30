<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Trainee;
use App\Models\Trainer;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\Access\AuthorizationException;

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
            'rating'=>['required','min:0','max:5'],
            'comments'=> ['required','string'],
        ];

        $messages = [
            'rating.required' => 'rating mest be in range (0,5)',
            'comments.required' => 'comment is required',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        // dd($validator->errors());
        if ($validator->fails()) {
            return response()->json(["message"=>$validator->errors()], 403);
        }
        if(Auth::user()->role=="trainee"){
            $trainee = Auth::user()->id;
            $trainer = Trainer::where('user_id',$request->trainer_id)->first();
            $trainer = $trainer->user_id;

        }else{
            $trainer = Auth::user()->id;
            $trainee = Trainee::where('user_id',$request->trainee_id)->first();
            $trainee = $trainee->user_id;
        }

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
                'class_id' => $request->class_id,
                'trainee_id' => $trainee,
                'trainer_id' => $trainer
            ]);
            return response()->json(["message"=>$review]);
        }catch(AuthorizationException $e){
            return response()->json([
                'message' => "You are not user to show this"
            ], 403);
        }
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
