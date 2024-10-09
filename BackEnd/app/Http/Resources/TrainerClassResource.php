<?php

namespace App\Http\Resources;

use App\Models\GymClass;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
class TrainerClassResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $class = GymClass::where("trainer_id", $this->user_id)->first();
        if(!$class){

            $user = $this->user ? new UserResource($this->user) : null;        // $exercises = $this->exercise ? TraineeExerciseResource::collection($this->exercise) : [];
            return [
                 'name'=>$user->name,
                 'id'=>$user->id
            ];
        }
            return ['name'=>null];
    }
}
