<?php

namespace App\Http\Resources;

use App\Models\GymClass;
use App\Models\Trainer;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $trainer = Trainer::where("user_id", $this->trainer_id)->first();
        $class = GymClass::where("id", $this->id)->first();

        return [
            'class'=>$class,
            'trainer'=>$trainer->user,
            'equipments'=>$this->equipments,
            'exercises'=>$this->exercises,
        ];
    }
}
