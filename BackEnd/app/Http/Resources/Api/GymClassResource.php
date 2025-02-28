<?php

// namespace App\Http\Resources;
namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\EquipmentResource;
use App\Http\Resources\Api\ScheduleResource;
use App\Http\Resources\Api\ExerciseResource;
use App\Models\UserClass;
use App\Models\User;

use Illuminate\Support\Facades\Auth;

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
        $user = Auth::user();
        $class = UserClass::where('user_id',$user->id)
        ->where('class_id', $this->id)->first();
        $trainer = User::where('id',$this->trainer_id)->first();
        $checkJoin = false;
        if($class)
        {
            $checkJoin = true;
        }
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'total_no_of_sessions' => $this->total_no_of_session,
            'max_trainee' => $this->max_trainee,
            'equipments' => EquipmentResource::collection($equipment),
            'schedule' => ScheduleResource::collection($this->schedule),
            'exercises'=> ExerciseResource::collection($this->exercises),
            'trainer'=>$trainer,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'checkJoin' => $checkJoin
        ];
    }
}
