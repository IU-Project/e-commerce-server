<?php

namespace App\Http\Controllers\Api\Account\Profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\UpdateUserProfileRequest;
use App\Models\User\Profile;
use Illuminate\Http\Request;

class UserProfileController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Show the user's profile.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(Request $request)
    {
        return response()->json([
            'data' => [
                ...$request->user()->toArray(),
                'profile' => auth()->user()->profile,
            ],
        ]);
    }

    /**
     * Update the user's profile.
     *
     * @param \App\Http\Requests\Profile\UpdateUserProfileRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateProfile(UpdateUserProfileRequest $request)
    {
        Profile::where('user_id', auth()->user()->id)
            ->update($request->validated());

        return response()->json([
            'status' => true,
            'message' => 'Profile has been updated!',
        ]);
    }
}
