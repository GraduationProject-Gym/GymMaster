<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMemberRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'type'=>['required','string','in:VIP,Normal'],
            'subscribe_type'=> ['required','string','in:weekly,Monthly,Yearly'],
            'amount'=>['required'],
        ];
    }

    public function messages()
    {
        return [
            'type.in' => 'The type must be either VIP or Normal.',
            'subscribe_type.in' => 'The subscribe_type must be either weekly, Monthly or Yearly.',
            'amount.required' =>'Price of Membership Are Require'
        ];
    }
}
