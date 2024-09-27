<?php

namespace App\Http\Resources\Api;
use App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'session_start' => $this->session_start,
            'session_end' => $this->session_end,
            'session_duration' => $this->session_duration,
            'nameDay' => $this->nameDay,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'class' => new GymClassResource($this->gymClass), 
            // 'class' => new GymClassResource($this->whenLoaded('gymClass')),
        ];
    }
}
