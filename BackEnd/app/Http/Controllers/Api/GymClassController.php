<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GymClass;
use App\Http\Resources\Api\GymClassResource;

class GymClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', GymClass::class);
        $gymClasses = GymClass::with(['equipments', 'exercises'])->get();
        return response()->json($gymClasses, 200);
    }

   
}
