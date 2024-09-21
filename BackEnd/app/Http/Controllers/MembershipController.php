<?php

namespace App\Http\Controllers;

use App\Models\Memberships;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Http\Resources\MembershipResource;
use App\Http\Requests\StoreMemberRequest;



class MembershipController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //all user will show all memberships
        //only admin can update and delete and create memberships
        $memberships = Memberships::all();
        return response()->json([
            'Memberships' => MembershipResource::collection($memberships),
        ]);

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
    public function store(StoreMemberRequest $request)
    {
         // only admin can add or store membership
        // return response()->json($request->all());
        $membership = Memberships::create([
            'type' => $request->type,
            'subscribe_type'=> $request->subscribe_type,
            'amount'=> $request->amount
        ]);
        return response()->json([
            'Membership' => new MembershipResource($membership),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($memberships)
    {
        //all user can show membership
        $membership = Memberships::find($memberships);
        return response()->json([
            'Membership' => new MembershipResource($membership),
        ]);
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
                "membership"=> "This membership not exit",
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($memberships)
    {
        //
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

    }
}
