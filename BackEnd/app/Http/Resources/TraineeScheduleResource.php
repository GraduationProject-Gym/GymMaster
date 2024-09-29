<?php

namespace App\Http\Resources;

use App\Models\GymClass;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\TraineeClassResource;


class TraineeScheduleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $gymClass = GymClass::find($this->class_id);

        return [
            'session_start' => $this->session_start,
            'session_end' => $this->session_end,
            'session_duration' => $this->session_duration,
            'nameDay' => $this->nameDay,
            // 'class_id'=>$this->class_id,
            // 'classData' => $gymClass ? new TraineeClassResource($gymClass) : null
            'classData' => $gymClass,
        ];
    }
}
