<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TraineeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'goals' => $this-> goals,
            'no_vouchers' => $this-> no_vouchers,
            'expiration_date' => $this->expiration_date ? $this->expiration_date: null,
            // 'membership_id' => $this-> membership_id
            $request['membership_id'] => new MembershipResource($this->membership),
        ];
        
    }
}
