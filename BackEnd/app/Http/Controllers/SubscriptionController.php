<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use App\Models\Memberships;
use Illuminate\Http\Request;
use App\Models\Trainee;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //only admin can show all subscribe
        // $subscription = Subscription::all();
        // return response()->json([
        //     'message' => $subscription],
        //      404);
        try {
            $this->authorize('viewAny', Subscription::class);
            $subscription = Subscription::all();
            return response()->json([
                'message' => $subscription],
                403);

        } catch (AuthorizationException $e) {
            return response()->json([
                'message' => "You are not admin"
            ], 403);  // Forbidden status

        }

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function subscribe_User($user_id)
    {
        // admin can show all subscribtion for one user w
        // $subscription = Subscription::where('user_id', $user_id)->get();
        // return response()->json([
        //     'message' => $subscription],
        //      404);
        // admin can show all subscribtion for one user
        // admin can show this

        try {

            $this->authorize('viewOnlyUser', Subscription::class);
            $subscription = Subscription::where('user_id', $user_id)->get();
            return response()->json([
                'message' => $subscription],
                403);

        } catch (AuthorizationException $e) {

            return response()->json([
                'message' => "You are not admin or Owner"
            ], 403);  // Forbidden status

        }

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //payment
        try {

            $this->authorize('create', Subscription::class);
            Stripe::setApiKey(config('stripe.stripe_sk'));

            $membership = Memberships::find($request->id);
            if($membership){
                $amount = $membership->amount; // Stripe requires the amount in cents
            }
            else{
                return response()->json(['success' => false, 'error' => 'Membership not found'], 403);
            }

            $member = $membership->name;
            $session = Session::create([
                'line_items' => [
                    [
                        'price_data' => [
                            'currency' => 'USD',
                            'product_data' => [
                                'name' => $member,
                            ],
                            'unit_amount' => $amount,  // Price is already in cents
                        ],
                        'quantity' => 1,
                    ],
                ],
                'mode' => 'payment',
                'success_url' => route('success'),
                'cancel_url' => route('cancel'),
            ]);
            return response()->json(['url' => $session->url]);

        } catch (Exception $e) {
            // Handle any errors that occur during payment processing
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 403);
        }

    }
    public function success($payment_method){
        try{
            $user_id = Auth::user()->id;
            $trainee = Trainee::where('user_id', $user_id)->first();
            if(!$trainee){
                return response()->json(['message' => 'Please Do Registe First'], 404);
            }
            // $user_id = Auth::user()->id;
            $trainee = Trainee::where('user_id', $user_id)->first();
            // $trainee = Trainee::where('user_id', $user_id)->first();

            $trainee_ = Subscription::create([
                // TraineeMembership
                'user_id'=> $user_id,// $user_id
                'payment_method'=> $payment_method,
                'amount' => $trainee->TraineeMembership->amount,
            ]);
            $NO_days = 0;
            if($trainee->TraineeMembership->subscribe_type == 'weekly'){
                $NO_days = 7;
            }
            else if($trainee->TraineeMembership->subscribe_type == 'Monthly'){
                $NO_days = 30;
            }
            else if($trainee->TraineeMembership->subscribe_type == 'Yearly'){
                $NO_days = 365;

            }
            $trainee->expiration_date = Carbon::now()->addDays($NO_days);
            $trainee->save();
            return response()->json([
                'message' => $trainee_],
                    403);
            }
            catch (Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }

    }

    public function cancel(){
        return response()->json([
            'message' => "Fail Payment"
        ], 403);
    }

    /**
     * Display the specified resource.
     */
    public function show($subscription)
    {
        try {
            $subscription = Subscription::where('id', $subscription)->first();
            $this->authorize('view', [Subscription::class,$subscription]);
            return response()->json([
                'message' => $subscription],
                403);

        } catch (AuthorizationException $e) {
            return response()->json([
                'message' => "You are not admin, trainee or not owner for this subscribe "
            ], 403);  // Forbidden status

        }
    }

    public function subscribe_Own_User()
    {
        // show all own subscription for user-login
        try {

            $this->authorize('viewTrainee', Subscription::class);
            $user_id = Auth::user()->id;
            // $user_id =1;// for test
            $subscription = Subscription::where('user_id', $user_id)->get();
            return response()->json([
                'message' => $subscription],
                 404);

        } catch (AuthorizationException $e) {
            return response()->json([
                'message' => "You are not trainee"
            ], 403);  // Forbidden status

        }
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subscription $subscription)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subscription $subscription)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subscription $subscription)
    {
        //
    }
}


