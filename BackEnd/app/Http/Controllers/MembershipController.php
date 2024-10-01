<?php

namespace App\Http\Controllers;

use App\Models\Memberships;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Http\Resources\MembershipResource;
use App\Http\Requests\StoreMemberRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Access\AuthorizationException;




class MembershipController extends Controller
{


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //all user will show all memberships
        //only admin can update and delete and create memberships
        // dd(111);
        // return ["message"=>'done'];
        try {
            $this->authorize('viewAny', Memberships::class);
            $memberships = Memberships::all();
            return response()->json([
                'Memberships' => MembershipResource::collection($memberships),
            ]);

        } catch (AuthorizationException $e) {
            return response()->json([
                'message' => "You are not user to show this"
            ], 403);  // Forbidden status
        }
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
        $rules = [
            'type'=>['required','string','in:VIP,Normal'],
            'subscribe_type'=> ['required','string','in:weekly,Monthly,Yearly'],
            'amount'=>['required']
        ];

        $messages = [
            'type.in' => 'The type must be either VIP or Normal.',
            'subscribe_type.in' => 'The subscribe_type must be either weekly, Monthly or Yearly.',
            'amount.required' =>'Enter Price of Membership'
        ];

        // Validate the request
        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(["message"=> $validator->errors()], 403);
        }

        try {
            $this->authorize('create', Memberships::class);
            $membership = Memberships::create([
                'type' => $request->type,
                'subscribe_type'=> $request->subscribe_type,
                'amount'=> $request->amount
            ]);
            return response()->json([
                'Membership' => new MembershipResource($membership),
            ]);

            // Continue with the process if authorized
        } catch (AuthorizationException $e) {
            return response()->json([
                'message' => "You are not allowed"
            ], 403);  // Forbidden status
        }


    }


    /**
     * Display the specified resource.
     */
    public function show($memberships)
    {
        //all user can show membership
        $membership = Memberships::find($memberships);
        if (!$membership) {
            return response()->json([
                'message' => 'Membership not found',
            ], 403);
        }

        try {
            $this->authorize('view', [Memberships::class, $membership]);
            return response()->json([
                'Membership' => new MembershipResource($membership),
            ]);
            // Continue with the process if authorized
        }
        catch (AuthorizationException $e) {
            return response()->json([
                'Membership' => "You are not allowed"
            ], 403);  // Forbidden status
        }


    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Memberships $memberships)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $memberships)
    {
        // only admin can edit membership
        $rules = [
            'type'=>['required','string','in:VIP,Normal'],
            'subscribe_type'=> ['required','string','in:weekly,Monthly,Yearly'],
            'amount'=>['required']
        ];

        $messages = [
            'type.in' => 'The type must be either VIP or Normal.',
            'subscribe_type.in' => 'The subscribe_type must be either weekly, Monthly or Yearly.',
            'amount.required' =>'Price of Membership Are Require'
        ];

        // Validate the request
        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(["message"=> $validator->errors()], 403);
        }
        try {
            $this->authorize('update', Memberships::class);
            $data = $request->all();
            $membership_ = Memberships::find($memberships);
            if($membership_){
                $membership_->update($data);
                return response()->json([
                    "membership"=> new MembershipResource($membership_),
                ]);
            }
            else{
                return response()->json([
                    "message"=> "This membership not exit",
                ]);
            }

            // Continue with the process if authorized
        } catch (AuthorizationException $e) {
            return response()->json([
                'message' => "You are not allowed"
            ], 403);  // Forbidden status
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($memberships)
    {
        //

        try {

            $this->authorize('delete', [Memberships::class,$memberships]);
            $membership_ = Memberships::find($memberships);
            if($membership_){
                $membership_->delete();
                return response()->json([
                    "membership"=> "deleted Done!",
                ]);
            }
            else{
                return response()->json([
                    "membership"=> "This membership not exit to delete it",
                ]);
            }

        } catch (AuthorizationException $e) {

            return response()->json([
                'message' => "You are not admin"
            ], 403);  // Forbidden status

        }


    }
}
