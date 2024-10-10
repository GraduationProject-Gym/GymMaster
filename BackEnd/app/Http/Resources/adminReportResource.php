<?php

namespace App\Http\Resources;
use App\Models\GymClass;
use App\Models\User;
use App\Models\Review;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\ReviewResource;
use App\Http\Resources\Api\GymClassResource;
class adminReportResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        $class = GymClass::where("id", $this->class_id)->first();
        $trainer = $class->trainer_id;
        $trainee = User::where( "id", $this->user_id)->first();
        $trainer_ = User::where("id", $trainer)->first();
        $reviews = Review::where("trainee_id", $this->user_id)
            ->where("class_id", $this->class_id)
            ->get();
        $recommend = Report::where("trainee_id", $this->user_id)
            ->where("trainer_id", $trainer)
            ->where("class_id", $this->class_id)
            ->first();
        return[
                'trainee'=>new UserResource($trainee),
                'class'=>new GymClassResource($class),
                'trainer'=>new UserResource($trainer_),
                'reviews'=>ReviewResource::collection($reviews),
                'recommend'=>$recommend,
        ];
    }
}
