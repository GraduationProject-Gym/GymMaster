<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Trainee;
use App\Models\Memberships;
use App\Models\Review;
use App\Http\Resources\ReviewResource;;

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
        $reviews = Review::where("trainee_id", $trainee->user_id)
        ->where("class_id", $this->pivot->class_id)
        ->get();
        return[
            'user_id'=>$this->id,
            'gender'=>$this->gender,
            'name'=>$this->name,
            'image' => $this->image ? asset('images/users/' . $this->image) : null,
            'membership'=>$member->type,
            'showReview'=>false,
            'review'=>ReviewResource::collection($reviews),

        ];
    }
}
// 'created_at' => Carbon::parse($this->created_at)->format('Y-m-d'), // Only date
// 'comments' => $this->comments,
// 'rating' => $this->rating,
