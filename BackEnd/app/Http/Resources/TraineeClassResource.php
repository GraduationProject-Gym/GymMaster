<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TraineeClassResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        $trainee = User::findOrFail(auth::id());
        $schedules = $this->schedule ? TraineeScheduleResource::collection($this->schedule) : [];
        $trainer = $this->trainer ? new UserResource($this->trainer) : null;        // $exercises = $this->exercise ? TraineeExerciseResource::collection($this->exercise) : [];
        $user = $this->user ? new UserResource($this->user) : null;

        if($trainee){
            return [
                'id' => $this->id,
                'name' => $this->name,
                'description' => $this->description,
                'status' => $this->status,
                'total_no_of_session' => $this->total_no_of_session,
                'max_trainee' => $this->max_trainee,
                'trainerData' => $trainer,
                'scheduleData' => $schedules,
                'exerciseData' => $this->exercises ? $this->exercises->map(function ($exercise) {
                    return [
                        'exercise_id' => $exercise->pivot->exercies_id,
                        'name' => $exercise->name,
                        'category' => $exercise->category,
                        'no_of_times' => $exercise->no_of_times,
                    ];
                }) : [],
                'equipmentData' => $this->equipment ? $this->equipment->map(function ($equipment) {
                    return [
                        'equipment_id' => $equipment->pivot->equipment_id, // Adjust the pivot column name if needed
                        'name' => $equipment->name,
                        'used_weight' => $equipment->used_weight,
                        'number_of_equipments' => $equipment->number_of_equipments,
                    ];
                }) : [],

            ];
        }

        return [
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'total_no_of_session' => $this->total_no_of_session,
            'max_trainee' => $this->max_trainee,
            'traineesData' => $this->user ? $this->user->map(function ($user) {
                return new UserResource($user);
            }) : [],
            'trainerData' => $trainer,
            'scheduleData' => $schedules,
            'exerciseData' => $this->exercises ? $this->exercises->map(function ($exercise) {
                return [
                    'exercise_id' => $exercise->pivot->exercies_id,
                    'name' => $exercise->name,
                    'category' => $exercise->category,
                    'no_of_times' => $exercise->no_of_times,
                ];
            }) : [],
            'equipmentData' => $this->equipment ? $this->equipment->map(function ($equipment) {
                return [
                    'equipment_id' => $equipment->pivot->equipment_id, // Adjust the pivot column name if needed
                    'name' => $equipment->name,
                    'used_weight' => $equipment->used_weight,
                    'number_of_equipments' => $equipment->number_of_equipments,
                ];
            }) : [],

        ];
    }
}
