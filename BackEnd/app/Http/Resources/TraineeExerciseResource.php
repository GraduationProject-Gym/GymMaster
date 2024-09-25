<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TraineeExerciseResource extends JsonResource
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
            'name' => $this->name,
            'category' => $this->category,
            'no_of_times' => $this->no_of_times,
            // 'class_id' => $this->class_id,
            // 'exercise_id'=>$this->exercise_id
            
        ];
        // return $this->map(function ($exercise) {
        //     return [
        //         'exercise_id' => $exercise->pivot->exercies_id, // Access pivot table column
        //         'name' => $exercise->name,
        //         'category' => $exercise->category,
        //         'no_of_times' => $exercise->no_of_times,
        //     ];
        // })->toArray();
  
}
}