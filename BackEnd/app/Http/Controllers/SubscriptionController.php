<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;
use App\Models\Trainee;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Illuminate\Auth\Access\AuthorizationException;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //only admin can show all subscribe
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

            try {
                // Create a new payment intent
                $paymentIntent = PaymentIntent::create([
                    'amount' => $request->amount,  // Amount in cents (e.g., 1000 for $10.00)
                    'currency' => 'usd',
                    // 'payment_method' => $request->payment_method,  // Use the payment method from the request
                    // 'confirmation_method' => 'manual',  // Optional: set to 'manual' if you want to confirm later
                    // 'confirm' => true,  // Automatically confirm the payment intent
                ]);
                // return response()->json([
                //     'client_secret' => $paymentIntent->client_secret,
                //     'payment_intent_id' => $paymentIntent->id,
                // ]);
                //trainee can subscribe to payment
                $user_id = Auth::user()->id;
                $trainee = Trainee::where('user_id', $user_id)->first();
                if(!$trainee){
                    return response()->json(['message' => 'Please Do Registe First'], 404);
                }
                // $user_id = Auth::user()->id;
                $trainee = Trainee::where('user_id', $user_id)->first();
                $trainee_ = Subscription::create([
                    // TraineeMembership
                    'user_id'=> $user_id,// $user_id
                    'payment_method'=> $request->payment_method,
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
                     404);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }


        } catch (AuthorizationException $e) {

            return response()->json([
                'message' => "You are not trainee"
            ], 403);  // Forbidden status

        }



    }
    public function confirmPayment(Request $request)
    {
    Stripe::setApiKey(config('stripe.stripe_sk'));

    try {
        // Retrieve the payment intent
            $paymentIntent = PaymentIntent::retrieve($request->payment_intent_id);

            // Confirm the payment intent with a payment method
            $paymentIntent->confirm([
                'payment_method' => $request->payment_method,  // Expecting a payment method ID
            ]);

            return response()->json([
                'status' => $paymentIntent->status,
                'payment_intent' => $paymentIntent,
            ]);
        }
        catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    /**
     * Display the specified resource.
     */
    public function show($subscription)
    {
        //
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
