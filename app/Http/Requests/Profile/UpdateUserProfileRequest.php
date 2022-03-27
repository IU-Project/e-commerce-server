<?php

namespace App\Http\Requests\Profile;

use App\Http\Requests\CustomFormRequest;

class UpdateUserProfileRequest extends CustomFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return $this->requireAtLeastOne([
            'display_name' => 'string|max:50',
            'avatar_image' => 'string|min:32|max:32',
            'phone' => 'digits_between:10,11',
            'gender' => 'numeric|min:0|max:2',
            'date_of_birth' => 'date_format:m/d/Y',
        ]);
    }
}
