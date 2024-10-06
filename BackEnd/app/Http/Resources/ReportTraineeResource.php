<?php

namespace App\Http\Resources;

use App\Models\GymClass;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\Api\GymClassResource;



class ReportTraineeResource extends JsonResource
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
        $trainer_ = User::where("id", $trainer)->first();
        $exercises = $class->exercises;
        $equipments = $class->equipments;

        return[
            'Dataclass'=>[
                'class'=>new GymClassResource($class),
                // 'exercises'=>$exercises,
                // 'equipments'=>$equipments,
                'trainer'=>new UserResource($trainer_),
            ],
        ];
    }
}
