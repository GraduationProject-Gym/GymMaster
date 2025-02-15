<?php

namespace App\Http\Resources\Api;
use App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EquipmentsResource extends JsonResource
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
            'name' => $this->name,
            'used_weight' => $this->used_weight,
            'number_of_equipments' => $this->number_of_equipments,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
