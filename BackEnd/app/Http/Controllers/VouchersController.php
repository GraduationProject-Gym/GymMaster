<?php

namespace App\Http\Controllers;

use App\Http\Resources\TraineeResource;
use App\Http\Resources\UserResource;
use App\Models\Trainee;
use App\Models\Vouchers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;


class VouchersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }
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
    }

    /**
     * Display the specified resource.
     */
    public function show(Vouchers $vouchers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vouchers $vouchers)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    // admin update no_vouchers of trainee
    public function updateNoVouchers(Request $request)
{
    $trainee = Trainee::findOrFail($request->trainee_id);
    $user = User::findOrFail(Auth::id());
    try {
        $this->authorize('updateNoVouchersOfTrainee', $user);
    } catch (\Illuminate\Auth\Access\AuthorizationException $e) {
        return response()->json([
            'message' => 'You are not authorized to updateNoVouchers'
        ], 403);
    }

    try {
        $validatedData = $request->validate([
            'no_vouchers' => ['required', 'integer'],
            'trainee_id' => [
                'required',
                'exists:trainees,id',
                function ($attribute, $value, $fail) {
                    $trainee = Trainee::find($value);
                    if (!$trainee) {
                        return $fail('The selected trainee does not exist.');
                    }

                    $userId = $trainee->user_id;

                    if (!User::where('id', $userId)->exists()) {
                        return $fail('The user associated with the selected trainee does not exist.');
                    }
                },
            ],
        ]);
    } catch (ValidationException $e) {
        $errors = $e->validator->errors();
        $customMessages = [];

        foreach ($errors->all() as $error) {
            $customMessages[] = $error;
        }

        return response()->json([
            'message' => 'Validation failed',
            'errors' => $customMessages,
        ], 422);
    }

    // Update the trainee's no_of_vouchers field
    $trainee->update([
        'no_vouchers' => $request->no_vouchers,
    ]);

    return response()->json([
        'message' => 'no_vouchers of trainee updated successfully',
        'traineeData' => new TraineeResource($trainee),
    ]);
}



    public function update(Request $request, Vouchers $vouchers)
    {
        //
        
    
        // return new GymClassResource($gymClass);
        // }
        // $trainee_class = GymClass::findOrFail($class_id);
        // $exists = UserClass::where('user_id', auth::id())
        //     ->where('class_id', $class_id)
        //     ->exists();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vouchers $vouchers)
    {
        //
    }
}
