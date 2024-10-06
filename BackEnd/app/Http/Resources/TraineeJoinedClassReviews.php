<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TraineeJoinedClassReviews extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        $trainer = $this->trainer ? new UserResource($this->trainer) : null;
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'total_no_of_session' => $this->total_no_of_session,
            'max_trainee' => $this->max_trainee,
            'trainerData' => $trainer,
            // 'reviews' => new ReviewResource($this->review)
        ];

    }
}
