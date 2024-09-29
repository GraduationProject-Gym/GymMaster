<?php

// namespace App\Http\Resources;
namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\EquipmentResource;
use App\Http\Resources\Api\ScheduleResource;

class GymClassResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $equipment =$this->equipments;
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'total_no_of_sessions' => $this->total_no_of_session,
            'max_trainee' => $this->max_trainee,
            'equipments' => EquipmentResource::collection($equipment),
            'scheduals' => ScheduleResource::collection($this->schedule),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
