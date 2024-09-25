<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\User;

class TrainerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = $this->user ? new UserResource($this->user) : null;        // $exercises = $this->exercise ? TraineeExerciseResource::collection($this->exercise) : [];

        return [
            'id' => $this->id,
            'cv' => $this-> cv ? asset('cvs/users/' . $this->cv) : null,
            'moreTrainerData' => $user,
        ];
    }
}
