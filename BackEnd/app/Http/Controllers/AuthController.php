<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Trainee;
use App\Models\Trainer;
use App\Models\Memberships;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Http\Resources\TraineeResource;
use App\Http\Resources\TrainerResource;
use App\Http\Resources\MembershipResource;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
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
    public function store(RegisterRequest $request)
    {
        //
        $imagePath = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('images', 'user_images');
        }
        // Create a new user
        $user = User::where('email', $request->email)->first();
        $user1 = User::where('phone', $request->phone)->first();
        if($user){
            return response()->json(['message' => 'this email are used'], 404);
        }
        if($user1){
            return response()->json(['message' => 'this phone are used'], 404);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'address' => $request->address,
            'age' => $request->age,
            'image' => $imagePath,
            'gender' => $request->gender,
            'role' => $request->role,
        ]);

        // return response()->json($user->id);

        if ($request->role === 'trainee') {
            $trainee = Trainee::create([
                'goals' => $request->goals,
                'no_vouchers' => $request->no_vouchers,
                'expiration_date' => $request->expiration_date,
                'membership_id' => $request->membership_id,
                'user_id' => $user->id,
            ]);
            $membership = Memberships::findOrFail($request->membership_id);
        }
        if ($request->role === 'trainer') {
            $cvPath = null;
            if ($request->hasFile('cv')) {
                $cv = $request->file('cv');
                $cvPath = $cv->store('cvs', 'user_cvs');
            }
            $userId =   $user->id;

            $trainer = Trainer::create([
                'cv' => $cvPath,
                'user_id' => $userId
            ]);

        }
        if($request->role === 'trainee'){
            return response()->json([
                'message' => 'User registered successfully',
                'user' => new UserResource($user),
                'traineeData' => new TraineeResource($trainee),
                'traineeMembership' => new MembershipResource($membership),
            ], 201);
        }
        else if($request->role === 'trainer'){
            return response()->json([
                'message' => 'User registered successfully',
                'user' => new UserResource($user),
                'trainerData' => new TrainerResource($trainer),
            ], 201);
        }

    }

    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'email' => ['The provided credentials are incorrect.'],
            ], 401);
        }

        if ($user->tokens()->count() > 3) {
            return response()->json([
                "error" => "You have exceeded the number of allowed logged in accounts. Please logout from one of them and try again."
            ], 403);
        }
        return response()->json([
            'token' => $user->createToken($request->device_name)->plainTextToken
        ]);
    }

    // Logout
    public function logout(Request $request){
        $user = Auth::user();
        if($user){
            // $user->tokens()->delete(); // logout from all devo=ices
            $user->currentAccessToken()->delete();
            return response()->json([
                "message"=>"Logged out"
            ]);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
