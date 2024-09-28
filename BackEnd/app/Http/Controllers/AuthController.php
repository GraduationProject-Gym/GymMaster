<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Trainee;
use App\Models\Trainer;
use App\Models\Memberships;
use Illuminate\Auth\Events\Registered;
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
use Illuminate\Support\Facades\Validator;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Mail\VerifyEmail;
use Illuminate\Support\Facades\DB;
use App\Models\GymClass;

class AuthController extends Controller
{
    public function __construct()
    {
        // Apply the auth middleware only to methods logout
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
    // public function store(RegisterRequest $request)
    public function store(Request $request)
    {


        $rules = [
            'name' => ['required', 'string', 'max:255','min:5'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'], // confirmed
            'phone' => ['nullable', 'string', 'max:11'],
            'address' => ['nullable', 'string'],
            'age' => ['nullable', 'integer', 'min:15'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'gender' => 'required',
            'role' => 'required',
            'cv' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:10000', 'required_if:role,trainer'],
        ];

        $messages = [
            'name.required' => 'Name is required.',
            'email.required' => 'Email is required.',
            'email.email' => 'Email must be a valid email address.',
            'email.unique' => 'The email has already been taken.',
            'password.required' => 'Password is required.',
            'password.min' => 'Password must be at least 8 characters.',
            'password.confirmed' => 'Passwords do not match.',
            'phone.max' => 'Phone number may not be greater than 11 characters.',
            'age.min' => 'Age must be at least 15.',
            'image.image' => 'The file must be an image.',
            'image.mimes' => 'The image must be a file of type: jpeg, png, jpg.',
            'image.max' => 'The image may not be greater than 2048 kilobytes.',
            'gender.required' => 'Gender is required.',
            'role.required' => 'Role is required.',
        ];

        // Validate the request
        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(["message"=>$validator->errors()], 403);
        }
        // dd($this->checkEmailValidity($request->email));
        // if (!$this->checkEmailValidity($request->email)) {
        //     return response()->json(['message' => 'This email not real'],403);
        // }

        $imagePath = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('images', 'user_images');
        }
        $user = User::where('email', $request->email)->first();
        $user1 = User::where('phone', $request->phone)->first();
        if ($user) {
            return response()->json(['message' => 'this email are used'],403);
        }
        if ($user1) {
            return response()->json(['message' => 'this phone are used'],403);
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
            'token' => Str::random(60),
            'timer' => now(),
        ]);
        // return response()->json($request);

        if ($request->role === 'trainee') {
            Mail::to($user->email)->send(new VerifyEmail($user));
            $trainee = Trainee::create([
                'user_id' => $user->id,
            ]);
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
        if ($request->role === 'trainee') {
            return response()->json([
                'message' => 'User registered successfully check your mail to verifiy',
                'user' => new UserResource($user),
                'traineeData' => new TraineeResource($trainee),
            ], 201);
        } else if ($request->role === 'trainer') {
            return response()->json([
                'message' => 'User registered successfully check your mail to verifiy',
                'user' => new UserResource($user),
                'trainerData' => new TrainerResource($trainer),
            ], 201);
        }

    }
    public function verifyEmail(Request $request)
    {
        $user = User::where('token', $request->token)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Invalid verification token',
            ], 403);
        }

        // Check if the token is expired (1 hour = 60 minutes)
        // dd(now()->diffInMinutes($user->verification_token_created_at));
        if (now()->diffInMinutes($user->timer) < -60.0) {
            return response()->json([
                'message' => 'Verification token has expired. must be login to resend Verification ',
            ], 403);
        }

        // If the token is still valid, verify the user's email
        $user->email_verified_at = now();
        $user->token = null; // Clear the token
        $user->timer = null; // Clear the timestamp
        $user->save();

        return response()->json([
            'message' => 'Your email has been verified.',
            'redirect' => url('/login')
        ], 200);

    }

    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'email' => ['The provided credentials are incorrect.'],
            ], 403);
        }
        if (is_null($user->email_verified_at)) {
            if (now()->diffInMinutes($user->timer) < -60.0) {
                $user->token = Str::random(60);
                $user->timer = now();
                $user->save();

                // Resend the email
                Mail::to($user->email)->send(new VerifyEmail($user));
                return response()->json([
                    'message' => ['Verification token has expired. A new verification email has been sent.'],
                ], 403);
            }
            return response()->json([
                'message' => ['verify email.'],
            ], 403);

        }


        return response()->json([
            'token' => $user->createToken($request->device_name)->plainTextToken
        ]);
    }

    // Logout
    public function logout(Request $request)
    {
        $user = Auth::user();

        if ($user) {
            $currentToken = $user->currentAccessToken();
            if ($currentToken) {
                $currentToken->delete();
            }

            return response()->json([
                "message" => "Logged out successfully"
            ]);
        }

        return response()->json([
            "message" => "User not authenticated"
        ], 401);
    }


    public function sendResetLinkEmail(Request $request)
    {
        // Validate the email input
        $request->validate(['email' => 'required|email']);
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            // Return an error response if the email is not found
            return response()->json([
                "message" => "Email does not exist in our records."
            ]);
        }
        // Send password reset link
        $status = Password::sendResetLink(
            $request->only(keys: 'email')
        );

        // Return appropriate response based on the status
        if ($status === Password::RESET_LINK_SENT) {
            // return $this->sendResponse([], 'Password reset link sent!');
            return response()->json([
                "message" => "Password reset link sent!"
            ]);

        } elseif ($status === Password::RESET_THROTTLED) {
            // return $this->sendResponse([], 'Password reset link sent!');
            return response()->json([
                "message" => "Password reset link sent!"
            ]);
        } else {
            // return $this->sendError('Unable to send reset link to the provided email.', [], 400);
            return response()->json([
                "message" => "Unable to send reset link to the provided email."
            ]);

        }
    }
    public function resetPassword(Request $request)
    {
        // Validate the request data
        // dd(111);
        // Attempt to reset the password
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        $resetPassword = DB::table('password_reset_tokens')->where('email', $request->email)->first();
        if (Hash::check($request->token, $resetPassword->token) && $resetPassword) {
            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function ($user, $password) {
                    // Update user's password
                    $user->password = Hash::make($password);
                    $user->save();
                }
            );
        } else {
            return response()->json(['message' => 'Invalid token.'], 401);
        }


        // Return appropriate response based on the status
        if ($status === Password::PASSWORD_RESET) {
            // return $this->sendResponse([], 'Password reset successful!');
            return response()->json([
                "message" => "Password reset successful!"
            ]);
        } else {
            // return $this->sendError('Invalid token or email.', [], 400);
            return response()->json([
                "message" => "Invalid token or email."
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        //
        // return ['message'=>$request->id];

        $class = GymClass::where("id", $request->id)->first();
        if($class){
            return response()->json([
                "message" => $class,
            ]);
        }
        else{
            return response()->json([
                "message" => "This class not found.",
            ],403);
        }
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
    private function checkEmailValidity($email)
    {

        $client = new Client();
        $apiKey = 'ef414821037d462eb82234bfa2797332';  // Use the API key provided by the service you're using
        try {
            $response = $client->request('GET', 'https://emailvalidation.abstractapi.com/v1/', [
                'query' => [
                    'api_key' => $apiKey,
                    'email' => $email,
                ]
            ]);

            $data = json_decode($response->getBody(), true);

            // Check if the response indicates success or failure
            if (isset($data['error'])) {
                if ($data['error']['message'] == "Invalid API key") {
                    // Handle invalid API key case
                    \Log::error('Invalid Abstract API key.');
                    return response()->json(['error' => 'Invalid API key. Please contact the admin.'], 400);
                }

                if ($data['error']['message'] == "Account ran out of credits") {
                    // Handle no credits case
                    \Log::error('Abstract API account has run out of credits.');
                    return response()->json(['error' => 'Abstract API account ran out of credits.'], 400);
                }
            }

            // Check if the email is valid based on the Abstract API response
            if (isset($data['quality_score'])) {
                // dd(1111);
                $qualityScore = $data['quality_score'];
                // Define a threshold for what you consider a valid email
                $validThreshold = 0.7; // Adjust this threshold as needed
                return $qualityScore >= $validThreshold;
            }

            // If no quality score is found, return false
            return false;

        } catch (\Exception $e) {
            // Log and handle any other errors
            \Log::error('Abstract API request failed: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to validate email. Please try again later.'], 500);
        }
    }
}
