<?php

// namespace App\Http\Resources;
namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GymClassResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'total_no_of_sessions' => $this->total_no_of_session,
            'max_trainee' => $this->max_trainee,
            'equipments' => $this->equipments,
            'exercises' => $this->exercises,
            'trainer' => [
                'id' => $this->trainer->id, 
                'name' => $this->trainer->user->name, 
                'email' => $this->trainer->user->email, 
                'phone' => $this->trainer->user->phone, 
                'address' => $this->trainer->user->address, 
                'age' => $this->trainer->user->age,  
            ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
