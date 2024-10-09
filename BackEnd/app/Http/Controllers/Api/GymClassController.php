<?php
namespace App\Http\Controllers\Api;
use App\Http\Resources\TrainerResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\TraineeClassesResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GymClass;
use App\Http\Resources\Api\GymClassResource;
use App\Models\Trainer;
use App\Models\Trainee;
use App\Models\Schedule;
use App\Models\User;
use App\Models\ClassEquipment;
use Illuminate\Auth\Access\AuthorizationException;
use App\Http\Resources\MembershipResource;
use App\Http\Resources\EquipmentResource;
use App\Http\Resources\TrainerClassResource;
use App\Http\Resources\Api\ExerciseResource;
use App\Models\Equipment;
use App\Models\Exercise;
use Carbon\Carbon;

use Illuminate\Validation\ValidationException;
use Exception;


class GymClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', GymClass::class);
        $gymClasses = GymClass::get();
        $user = Auth::user();
        $trainee = Trainee::where('user_id', $user->id)->first();
        // return ["message"=>$trainee];
        if ($user->role === 'trainee')
            if (!$gymClasses) {
                return response()->json([
                    'message' => 'There are not classes'
                ], 403);
            }
        if ($user->role === 'trainee') {
            if (!$trainee->TraineeMembership) {
                return response()->json([
                    'message' => 'You are not subscribe, please subscribe and try again'
                ], 403);
            }
            return response()->json([
                'membershipData' => new MembershipResource($trainee->TraineeMembership),
                'gymclassData' => GymClassResource::collection($gymClasses)
            ], 200);
        }
        return response()->json([
            'gymclassData' => GymClassResource::collection($gymClasses)
        ], 200);


    }

    /**
     * Store a newly created resource in storage.
     */

     public function getClassTrainer(){
         try {
            $this->authorize('viewClass', GymClass::class);
            $user = auth()->user();
            $class = GymClass::where('trainer_id', $user->id)->first();
            return response()->json([
                'class' => new GymClassResource($class),
            ], 200);

        } catch (AuthorizationException $e) {
            return response()->json([
                'message' => "You are not trainer to show this"
            ], 403);  // Forbidden status
        }

    }

    public function store(Request $request)
    {
        $this->authorize('create', GymClass::class);

        $rules = [
            'name'=>['required','string','max:255'],
            'description'=> 'nullable|string',
            'status'=>['required'],
            'total_no_of_session'=>'required|integer|min:1',
            'max_trainee'=>'required'
        ];

        $messages = [
            'name.required' => 'name of class required',
            'description.required' => 'description of class required',
            'total_no_of_session.required' =>'Enter number of sessions',
            'max_trainee.required' =>'Enter number of trainees'
        ];

        // Validate the request
        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(["message"=> $validator->errors()], 403);
        }
        try {
            // return ["message"=>$request->name];
            $class = GymClass::create([
                'name'=>$request->name,
                'description'=> $request->description,
                'status'=> $request->status,
                'total_no_of_session'=> $request->total_no_of_session,
                'max_trainee'=> $request->max_trainee,
                'trainer_id'=> $request->trainer_id,
            ]);
            if ($request->has('selectedEquipment')) {
                $class->equipments()->sync($request->input('selectedEquipment'));
            }

            if ($request->has('selectedExercises')) {
                $class->exercises()->sync($request->input('selectedExercises'));
            }
            $num = $request->total_no_of_session;
            $day=0;
            for( $i = 0; $i < $num; $i++ ){
                foreach ($request->groups as $group) {
                    $start = Carbon::createFromFormat('H:i:s', $group['startHour']);
                    $end = Carbon::createFromFormat('H:i:s', $group['endHour']);
                    $duration = $start->diff($end);
                    // Get the difference in hours and minutes
                    $hours = $duration->h; // Number of hours
                    $minutes = $duration->i; // Number of minutes

                    $totalMinutes = ($hours * 60) + $minutes;

                    $hours = floor($totalMinutes / 60); // Get whole hours
                    $remainingMinutes = $totalMinutes % 60;
                    $formattedDuration = sprintf('%d.%02d', $hours, $remainingMinutes);
                    // return ["message"=>number_format($formattedDuration, 2)];
                    $group['date']=Carbon::parse($group['date'])->addDays($day);
                    Schedule::create([
                        'nameDay' => $group['day'], // Day of the week
                        'session_start' => $group['startHour'], // Store as a Carbon instance
                        'session_end' => $group['endHour'], // Store as a Carbon instance
                        'date_day' => $group['date'], // Formatted date
                        'session_duration' => number_format($formattedDuration, 2), // Format duration as HH:MM:SS
                        'class_id' => $class->id, // Class ID
                    ]);
                    $i++;
                    if($i==$num)break;
                }
                $i--;
                $day+=7;
            }
           return $class;
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
    }
    // protected function calculateDuration($startHour, $endHour)
    // {
    //     // Convert time strings to DateTime objects
    //     $start = Carbon::createFromFormat('H:i', $startHour);
    //     $end = Carbon::createFromFormat('H:i', $endHour);
    //     // Calculate duration in minutes
    //     return $end->diffInMinutes($start);
    // }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            // $gymClass = GymClass::with(['equipments', 'exercises'])->findOrFail($id);
            // $gymClass = GymClass::get()->find($id);
            $gymClass = GymClass::with('equipments')->find($id);
            if ($gymClass->trashed()) {
                return response()->json(['message' => 'Gym class not found or has been deleted'], 404);
            }
            if (!$gymClass) {
                return response()->json(['message' => 'Gym class not found'], 404);
            }
            $this->authorize('view', $gymClass);
            return new GymClassResource($gymClass);
        } catch (AuthorizationException $e) {
            return response()->json(['message' => 'Unauthorized'], 403);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Gym class not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $gymClass = GymClass::findOrFail($id);
            if (!$gymClass) {
                return response()->json(['message' => 'Gym class not found'], 404);
            }
            $this->authorize('update', $gymClass);

            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'status' => 'required|boolean',
                'total_no_of_session' => 'required|integer|min:1',
                'max_trainee' => 'required|integer|min:1',
                'trainer_id' => [
                        'required',
                        'exists:trainers,id',
                        function ($attribute, $value, $fail) {
                            $trainer = Trainer::find($value);
                            if (!$trainer) {
                                return $fail('The selected trainer does not exist.');
                            }


                            $userId = $trainer->user_id;

                            if (!User::where('id', $userId)->exists()) {
                                return $fail('The user associated with the selected trainer does not exist.');
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

        $gymClass->update($validatedData);

        return new GymClassResource($gymClass);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $gymClass = GymClass::find($id);
        if (!$gymClass) {
            return response()->json(['message' => 'Gym class not found'], 404);
        }
        $this->authorize('delete', $gymClass);
        $gymClass->delete();

        return response()->json(['message' => 'Gym class deleted successfully']);
    }
    public function restore(string $id)
    {
        $gymClass = GymClass::withTrashed()->find($id);

        if (!$gymClass) {
            return response()->json(['message' => 'Gym class not found'], 404);
        }

        $gymClass->restore();

        return response()->json(['message' => 'Gym class restored successfully']);
    }

    public function ComponentAddClass(){
        try{
            $this->authorize('addClass', GymClass::class);
            $equpments = Equipment::get();
            $exercises = Exercise::get();
            $trainers = Trainer::get();

            if(empty($equpments)){
                return response()->json(["equpments"=>"First add equipment"]);
            }
            if(empty($exercises)){
                return response()->json(["equpments"=>"First add exercise"]);
            }
            return response()->json([
                "equpments"=>EquipmentResource::collection($equpments),
                "exercises"=>ExerciseResource::collection($exercises),
                'trainers'=>TrainerClassResource::collection($trainers)
            ], 200);  // Forbidden status
        }catch (AuthorizationException $e) {
            return response()->json([
                'message' => "You are not user to show this"
            ], 403);  // Forbidden status
        }
    }

}
