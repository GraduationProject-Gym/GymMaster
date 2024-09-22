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
use Illuminate\Support\Facades\Password;
class AuthController extends Controller
{
    public function __construct()
    {
        // Apply the auth middleware only to certain methods, e.g., logout
        $this->middleware('auth:sanctum')->only(['logout']);
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
    public function store(RegisterRequest $request)
    {
        //
        $imagePath = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('images', 'user_images');
        }
        // Create a new user
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
        // return response()->json($request);


        if ($request->role === 'trainee') {
            $trainee = Trainee::create([
                'user_id' => $user->id,
                'membership_id' => 1,
            ]);
            $membership = Memberships::findOrFail($request->membership_id);
        }
        if ($request->role === 'trainer') {
            $cvPath = null;

            if ($request->hasFile('cv')) {
                $cv = $request->file('cv');
                $cvPath = $cv->store('cvs', 'user_cvs');
            }
            $trainer = Trainer::create([
                'cv' => $cvPath,
                'user_id' => $user->id,
            ]);

        }
        if($request->role === 'trainee'){
            return response()->json([
                'message' => 'User registered successfully',
                'user' => new UserResource($user),
                'traineeData' => new TraineeResource($trainee),
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

    public function sendResetLinkEmail(Request $request)
    {
        // Validate the email input
        $request->validate(['email' => 'required|email']);
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            // Return an error response if the email is not found
            return response()->json([
                "message"=>"Email does not exist in our records."
            ]);
        }
        // Send password reset link
        $status = Password::sendResetLink(
            $request->only('email')
        );
        // Return appropriate response based on the status
        if ($status === Password::RESET_LINK_SENT) {
            // return $this->sendResponse([], 'Password reset link sent!');
            return response()->json([
                "message"=>"Password reset link sent!"
            ]);

        } elseif ($status === Password::RESET_THROTTLED) {
            // return $this->sendResponse([], 'Password reset link sent!');
            return response()->json([
                "message"=>"Password reset link sent!"
            ]);
        } else {
            // return $this->sendError('Unable to send reset link to the provided email.', [], 400);
            return response()->json([
                "message"=>"Unable to send reset link to the provided email."
            ]);

        }
    }
    public function resetPassword(Request $request)
    {
        // Validate the request data
        // dd(111);
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        // Attempt to reset the password
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                // Update user's password
                $user->password = Hash::make($password);
                $user->save();
            }
        );

        // Return appropriate response based on the status
        if ($status === Password::PASSWORD_RESET) {
            // return $this->sendResponse([], 'Password reset successful!');
            return response()->json([
                "message"=>"Password reset successful!"
            ]);
        } else {
            // return $this->sendError('Invalid token or email.', [], 400);
            return response()->json([
                "message"=>"Invalid token or email."
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
