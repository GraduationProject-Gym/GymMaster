<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TraineeScheduleResource extends JsonResource
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
            'session_start' => $this->session_start,
            'session_end' => $this->session_end,
            'session_duration' => $this->session_duration,
            'nameDay' => $this->nameDay,
        ];
    }
}
