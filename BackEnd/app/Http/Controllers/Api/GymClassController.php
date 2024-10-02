<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GymClass;
use App\Http\Resources\Api\GymClassResource;
use App\Models\Trainer; 
use App\Models\User; 
use App\Models\ClassEquipment;
use Illuminate\Auth\Access\AuthorizationException;
use App\Models\Equipment;
use Illuminate\Validation\ValidationException;
use Exception;


class GymClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return["message"=>"at backend"];
        $this->authorize('viewAny', GymClass::class);
        $gymClasses = GymClass::with(['equipments', 'exercises','trainer.user', 'schedule'])->get();
        return response()->json($gymClasses, 200);
    }

    /**
     * Store a newly created resource in storage.
     */


     public function store(Request $request)
     {
        $this->authorize('create', GymClass::class);

        try {
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
'equipment_ids' => 'nullable|array',  
'equipment_ids.*' => 'exists:equipments,id',
'exercise_ids' => 'nullable|array',  
'exercise_ids.*' => 'exists:exercises,id',
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
     
         
         $gymClass = GymClass::create($validatedData);
if ($request->has('equipment_ids')) {
    $gymClass->equipments()->sync($request->input('equipment_ids'));
}

if ($request->has('exercise_ids')) {
    $gymClass->exercises()->sync($request->input('exercise_ids'));
}
         return new GymClassResource($gymClass);
     }
     
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
                        $trainer =Trainer::find($value);
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

}
