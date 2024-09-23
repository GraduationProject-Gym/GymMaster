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
        // $exercises = $this->exercise ? TraineeExerciseResource::collection($this->exercise) : [];

        return [
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'total_no_of_session' => $this->total_no_of_session,
            'max_trainee' => $this->max_trainee,
            'traineeData' => new TraineeResource($trainee),
            'scheduleData' => $schedules,
            // 'exerciseData' => $exercises,
            // 'exerciseData' =>new TraineeExerciseResource($exercies),
            // 'exerciseData' => new TraineeExerciseResource($this->exercie),
            //
            // 'exerciseData' => $this->exercises->map(function ($exercise) {
            //     return [
            //         'exercise_id' => $exercise->pivot->exercise_id,  // Access pivot table column
            //         'name' => $exercise->name,
            //         'category' => $exercise->category,
            //         'no_of_times' => $exercise->no_of_times,
            //     ];
            // }),

            'exerciseData' => $this->exercises ? $this->exercises->map(function ($exercise) {
                return [
                    'exercise_id' => $exercise->pivot->exercies_id, // Adjust the pivot column name if needed
                    'name' => $exercise->name,
                    'category' => $exercise->category,
                    'no_of_times' => $exercise->no_of_times,
                ];
            }) : [],
            //'equipmentData' => new TraineeEquipmentResource($trainee)
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
