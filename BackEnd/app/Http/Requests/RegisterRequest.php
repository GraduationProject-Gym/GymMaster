<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'phone' => ['nullable', 'string', 'max:11'],
            'address' => ['nullable', 'string'],
            'age' => ['nullable', 'integer', 'min:15'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'gender' => 'required',
            'role' => 'required',
            // 'goals' => ['nullable', 'string', 'max:500', 'required_if:role,trainee'],
            // 'no_vouchers' => ['nullable', 'integer', 'min:0', 'required_if:role,trainee'],  // Default 0
            // 'expiration_date' => ['nullable', 'date', 'required_if:role,trainee'],
            'cv' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:10000', 'required_if:role,trainer'],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Name is required.',
            'email.required' => 'Email is required.',
            'email.email' => 'Email must be a valid email address.',
            'email.unique' => 'The email has already been taken.',
            'password.required' => 'Password is required.',
            'password.min' => 'Password must be at least 8 characters.',
            'password.confirmed' => 'Passwords do not match.',
            'phone.max' => 'Phone number may not be greater than 11 characters.',
            'age.min' => 'Age must be at least 15.',
            'image.image' => 'The file must be an image.',
            'image.mimes' => 'The image must be a file of type: jpeg, png, jpg.',
            'image.max' => 'The image may not be greater than 2048 kilobytes.',
            'gender.required' => 'Gender is required.',
            'role.required' => 'Role is required.',
        ];
    }
}
