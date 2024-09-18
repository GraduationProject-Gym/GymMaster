<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\TraineeResource;


class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request); 'no_vouchers','expiration_date','membership_id'
        return 
        [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'age' => $this->age,
            'image' => $this->image ? asset('images/users/' . $this->image) : null,
            'gender' => $this->gender,
            'role' => $this->role,
            // 'traineeData' => $this-> new TraineeResource($this-> trainee),
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
        
        if ($this->role === 'trainee' && $this->trainee) {
            $data['traineeData'] = new TraineeResource($this->trainee); 
        }
        else if ($this->role === 'trainer' && $this->trainer) {
            $data['trainerData'] = new TrainerResource($this->trainer); 
        }

        return $data;
    }
}
