<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\TraineeResource;
use App\Models\Trainee;

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
        $trainee = Trainee::where('user_id', $this->id)->first();
        if($this->role==='trainee')$membership = $trainee->TraineeMembership;
        else $membership = '';
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
            'membership'=>$membership,
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
