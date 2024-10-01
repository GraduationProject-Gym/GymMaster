<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
class ReviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'created_at' => Carbon::parse($this->created_at)->format('Y-m-d'), // Only date
            'comments' => $this->comments,
            'rating' => $this->rating,
        ];

    }
}
