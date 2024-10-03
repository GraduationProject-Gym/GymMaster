<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\GymClass;
use App\Models\User;

class ReportController extends Controller
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
            'recommend'=>['required','string'],
            'over_all_comment'=> ['required','string'],
        ];

        $messages = [
            'recommend.required' => 'please enter your commmend.',
            'over_all_comment.required' => 'please enter your over_all_comment',
        ];

        // Validate the request
        $validator = Validator::make($request->all(), $rules, $messages);
        // return ['message'=>$request->all()];

        if ($validator->fails()) {
            return response()->json(["message"=> $validator->errors()], 403);
        }
        // check exsist trainee or not
        $trainee = User::where('id', $request->trainee_id)->first();
        if (!$trainee) {
            return response()->json([
                'message'=> "trainee not exist",
            ], 403);
        }
        $user = Auth::user();
        $class = GymClass::where('trainer_id', $user->id)->first();
        $oldReport=Report::where("trainee_id", $request->trainee_id)
        ->where("class_id", $class->id)
        ->where('trainer_id',$user->id)
        ->first();
        if($oldReport){
            $oldReport->recommend = $request->recommend;
            $oldReport->over_all_comment = $request->over_all_comment;
            $oldReport->save();
            return response()->json([
                'message'=> $oldReport,
            ], 200);
        }else{
            $report = Report::create([
                'recommend'=>$request->recommend,
                'over_all_comment'=>$request->over_all_comment,
                'class_id'=> $class->id,
                'trainee_id'=>$request->trainee_id,
                'trainer_id'=>$user->id,
            ]);
            return response()->json([
                'message'=> $report,
            ], 200);
        }


    }

    /**
     * Display the specified resource.
     */
    public function show(Report $report)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Report $report)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Report $report)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        //
    }
}
