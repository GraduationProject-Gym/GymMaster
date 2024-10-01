<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Trainee;
use App\Models\Memberships;

class TraineeClassesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $trainee = Trainee::where('user_id', $this->id)->first();
        $member = $trainee->TraineeMembership;
        return[
            'user_id'=>$this->id,
            'name'=>$this->name,
            'image' => $this->image ? asset('images/users/' . $this->image) : null,
            // 'membership'=>$member->type,
            'membershipData'=>new MembershipResource($member),
        ];
    }
}
