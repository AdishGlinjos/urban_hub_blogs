<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserDetailsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AuthenticationController extends Controller
{

    public function authenticate(Request $request)
{

    
     try {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:user_details,user_name',
            'password'  => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'responseStatus'  => false,
                'responseMessage' => $validator->errors(),
                'responseCode'    => 422,
            ], 422);
        }

        $validated = $validator->validated();

        $user = UserDetailsModel::where('user_name', $validated['email'])->first();


        if (! $user) {
            return response()->json([
                'responseStatus'  => false,
                'responseMessage' => 'User not found',
                'responseData'    => [],
                'responseCode'    => 404,
            ], 404);
        }

         if (! Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'responseStatus'  => false,
                'responseMessage' => 'Invalid password',
                'responseData'    => [],
                'responseCode'    => 401,
            ], 401);
        }

        $token = $user->createToken('API Token')->plainTextToken;
        Log::info('Token created: ' . $token);

        return response()->json([
            'responseStatus'  => true,
            'responseMessage' => 'Login Successfully',
            'responseData'    => [
                'token' => $token,
                'user'  => [
                    'id'        => $user->id,
                    'name'      => $user->name,
                    'user_name' => $user->user_name,
                ],
            ],
            'responseCode'    => 200,
        ], 200);

    } catch (\Throwable $e) {
        return response()->json([
            'responseStatus'  => false,
            'responseMessage' => $e->getMessage(),
            'responseData'    => [],
            'responseCode'    => 500,
        ], 500);
    }
}

public function registration(Request $request)
{
Log::info('Registration attempt received:', $request->all());

    try {
        $validator = Validator::make($request->all(), [
            'name'      => 'required|string|max:255',
            'email' => 'required|string|max:50|unique:user_details,user_name',
            'password'  => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'responseStatus'  => false,
                'responseMessage' => $validator->errors(),
                'responseCode'    => 422,
            ], 422);
        }

        $validated = $validator->validated();

        $userDetails            = new UserDetailsModel();
        $userDetails->name      = $validated['name'];
        $userDetails->user_name = $validated['email'];
        $userDetails->password  = Hash::make($validated['password']);

        if ($userDetails->save()) {
            return response()->json([
                'responseStatus'  => true,
                'responseMessage' => 'User registered successfully',
                'responseCode'    => 200,
            ]);
        } else {
            return response()->json([
                'responseStatus'  => false,
                'responseMessage' => 'Something Went Wrong',
                'responseCode'    => 500,
            ], 500);
        }

    } catch (\Throwable $e) {
        return response()->json([
            'responseStatus'  => false,
            'responseMessage' => $e->getMessage(),
            'responseData'    => [],
            'responseCode'    => 500,
        ], 500);
    }
}

public function logout(Request $request)
{
    Log::info('logout called');

    if ($request->user()) {
        $request->user()->currentAccessToken()->delete();
    }

    Auth::logout();

    return response()->json([
        'responseStatus' => true,
        'responseMessage' => 'Logged out successfully'
    ]);
}


}
