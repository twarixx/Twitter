<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller {



	public function index() {

		return 'todo admin';

		// ALLEEN VOOR ADMIN

		/*$user = User::select('username', 'display_name', 'profile_picture', 'admin', 'verified')
					->whereNull('deactivated_on')
					->get();

		$user = User::all();

		if (count($user) > 0) {

			return response()->json([

				'success' => true,
				'message' => count($user) > 1 ? 'All users found.' : 'User found.',
				'data' => $user,

			], 200);

		} else {

			return response()->json([

				'success' => false,
				'message' => 'No users found.',
				'data' => null,

			], 404);

		}*/

	}



	public function store(Request $request) {

		$validatedData = Validator::make($request->all(), [

			'email' => 'required|email|unique:users',
			'password' => 'required|min:6',
			'confirm_password' => 'required|min:6',
			'username' => 'required|unique:users',

		]);

		if ($validatedData->fails() ) {

			return response()->json([

				'success' => false,
				'message' => $validatedData->errors()->first(),
				'data' => null,

			], 400);

		}

		if ($request->input('password') != $request->input('confirm_password')) {

			return response()->json([

				'success' => false,
				'message' => 'Password and confirm password do not match.',
				'data' => null,

			], 400);

		}

		$token = Str::random(60);
		$cookie = cookie('token', encrypt($token), time() + 315360000, '/', null, false, false);

		$user = new User();
		$user->email = $request->input('email');
		$user->password = bcrypt($request->input('password'));
		$user->username = $request->input('username');
		$user->display_name = ucfirst(strtolower($user->username));
		$user->api_token = $token;
		$user->save();

		return response()->json([

			'success' => true,
			'message' => 'User created.',
			'token' => $token,
			'data' => $user

		], 201)->withCookie($cookie);

	}



	// omzetten naar users/posts

	public function search(Request $request, $query, $token) {

		

		if ($token) {

			$current_user = User::where('api_token', decrypt($token))->first();

			if (!$current_user) {
			
				return response()->json([
	
					'success' => false,
					'author' => "Admin",
					'message' => 'Something went wrong.',
					'data' => null,
	
				], 400);

			}

		} else {
			
			return response()->json([

				'success' => false,
				'author' => "Mr. Patch the Penguin",
				'message' => 'Login maybe?',
				'data' => null,

			], 400);

		}

		$users = User::select('id', 'username', 'display_name', 'profile_picture', 'banner', 'verified_on', 'admin')
			->whereNull('deactivated_on')
			->whereNull('banned_on')
			->where(function ($q) use ($query) {
				$q->where('display_name', 'LIKE', '%'.$query.'%')
					->orWhere('username', 'LIKE', '%'.$query.'%');
			})
			->orderByRaw('CASE
				WHEN display_name = ? THEN 0
				WHEN display_name LIKE ? THEN 1
				WHEN display_name LIKE ? THEN 2
				ELSE 3
			END', [$query, $query.'%', '%'.$query.'%'])
			->orderByRaw('CASE
				WHEN username = ? THEN 0
				WHEN username LIKE ? THEN 1
				WHEN username LIKE ? THEN 2
				ELSE 3
			END', [$query, $query.'%', '%'.$query.'%'])
			->get();
		$result = [];

		if ($users->isEmpty()) {

			return response()->json([

				'success' => false,
				'message' => 'No users found.',
				'data' => null,

			], 404);

		}

		foreach ($users as $user) {

			if (!in_array($user, $result)) {

				$result[] = $user;

			}

		}

		return response()->json([

			'success' => true,
			'message' => 'User(s) found.',
			'data' => $result,

		], 200);

	}



	public function show($query, $token) {

		$user = User::where('id', $query)
					->orWhere('email', $query)
					->orWhere('username', $query)
					->first();

		if ($token) {

			$current_user = User::where('api_token', decrypt($token))->first();

			if ($current_user) {



			} else {
			
				return response()->json([
	
					'success' => false,
					'author' => "Mr. Patch the Penguin",
					'message' => 'Login maybe?',
					'data' => null,
	
				], 400);

			}

		} else {
			
			return response()->json([

				'success' => false,
				'author' => "Mr. Patch the Penguin",
				'message' => 'Login maybe?',
				'data' => null,

			], 400);

		}

		if ($user) {

			$data = [
				'id' => $user->id,
				'username' => $user->username,
				'display_name' => $user->display_name,
				'profile_picture' => $user->profile_picture,
				'banner' => $user->banner,
				'verified_on' => $user->verified_on,
				'admin' => $user->admin,
				'posts' => [],
			];
			
			// Get following user info
			$following_ids = $user->relationships->pluck('target_user_id');
			$following = User::select('id', 'username', 'display_name', 'profile_picture', 'banner', 'verified_on', 'admin')
							  ->whereIn('id', $following_ids)
							  ->get();
			$data['following'] = $following;
			
			// Get followers user info
			$followers_ids = $user->followers->pluck('user_id');
			$followers = User::select('id', 'username', 'display_name', 'profile_picture', 'banner', 'verified_on', 'admin')
							  ->whereIn('id', $followers_ids)
							  ->get();
			$data['followers'] = $followers;

			return response()->json([

				'success' => true,
				'message' => 'User found.',
				'data' => $data,
				/*'data' => array_merge(
					$user->toArray(),
					['following' => $user->relationships],
					['following_num' => $user->relationships->count()],
					['followers' => $user->followers],
					['followers_num' => $user->followers->count()],
				),*/

				// $users = User::select('id', 'username', 'display_name', 'profile_picture', 'banner', 'verified_on')
				/*'data' => array_merge(
					$user->toArray(),
					[
						'following' => $user->relationships->map(function($relationship) {
							$user_info = User::select('id', 'username', 'display_name', 'profile_picture', 'banner', 'verified_on')
								->where('id', $relationship->id_follows)
								->first();
							return array_merge($relationship->toArray(), ['user_info' => $user_info->toArray()]);
						}),
						'following_num' => $user->relationships->count(),
						'followers' => $user->followers->map(function($follower) {
							$user_info = User::select('id', 'username', 'display_name', 'profile_picture', 'banner', 'verified_on')
								->where('id', $follower->id_follower)
								->first();
							return array_merge($follower->toArray(), ['user_info' => $user_info->toArray()]);
						}),
						'followers_num' => $user->followers->count(),
					]
				),*/

			], 200);

		} else {

			return response()->json([

				'success' => false,
				'message' => 'No user found.',
				'data' => null,

			], 404);


		}

	}



	public function update(Request $request, $user) {

		//$token = $request->cookie('token');

		if ($request->input('token')) {

			$token = $request->input('token');

			$current_user = User::where('api_token', decrypt($token))->first();

			if ($current_user->id == $user || $current_user->admin == 1) {
	
				//if ($current_user->admin == 1) {
				//
				//}

			} else {
					
				return response()->json([

					'success' => false,
					'author' => "Mr. Patch the Penguin",
					'message' => 'Don\'t try to do this!',
					'data' => null,

				], 400);
	
			}

		} else {
			
			return response()->json([

				'success' => false,
				'author' => "Mr. Patch the Penguin",
				'message' => 'Login maybe?',
				'data' => null,

			], 400);

		}
		
		/*if (!$token) {

			return response()->json([

				'success' => false,
				'author' => "Mr. Patch the Penguin",
				'message' => 'Login maybe?',
				'data' => null,

			], 400);

		}

		$current_user = User::where('api_token', decrypt($token))->first();

		if ($current_user->id == $user || $current_user->admin == 1) {

			//if ($current_user->admin == 1) {
//
			//}




		} else {
				
				return response()->json([

					'success' => false,
					'author' => "Mr. Patch the Penguin",
					'message' => 'Don\'t try to do this!',
					'data' => null,

				], 400);

		}*/

		//$validatedData = $request->validate([
		$validatedData = Validator::make($request->all(), [

			'email' => 'sometimes|required|email|unique:users,email,' . $user,
			'old_password' => 'sometimes|required|min:6',
			'password' => 'sometimes|required|min:6',
			'confirm_password' => 'sometimes|required|min:6',
			'username' => 'sometimes|unique:users,username|max:18,' . $user,
			'display_name' => 'sometimes|nullable|string|max:18',
			'bio' => 'sometimes|nullable|string|max:255',
			'banner' => 'sometimes|nullable|string',
			'verified_on' => 'sometimes|nullable|string',
			'profile_picture' => 'sometimes|nullable|string',
			'admin' => 'sometimes|boolean',
			'banned_on' => 'sometimes|nullable|string',
			'deactivated_on' => 'sometimes|nullable|date_format:Y-m-d H:i:s',

		]);

		if ($validatedData->fails() ) {

			return response()->json([

				'success' => false,
				'message' => $validatedData->errors()->first(),
				'data' => null,

			], 400);

		}

		$userData = [];

		$checks = [
			'email', 'password', 'confirm_password', 'username', 'display_name', 'bio', 'banner', 'verified_on', 'profile_picture', 'admin', 'deactivated_on', 'banned_on', 'old_password'
		];

		foreach ($checks as $check) {

			/*if (array_key_exists($check, $validatedData)) {

				$userData[$check] = $validatedData[$check];

			}*/

			if ($request->has($check)) {

				if ($check == 'banned_on' && $request->input('banned_on') == 'now') {

					$userData['banned_on'] = date('Y-m-d H:i:s');

					continue;

				}

				$userData[$check] = $request->input($check);

			}

		}

		if (isset($userData['password'])) {

			if (isset($userData['old_password'])) {

				$user_data = User::where('id', $user)->first();

				if (Hash::check($userData['old_password'], $user_data->password)) {

					if (isset($userData['confirm_password']) && $userData['password'] == $userData['confirm_password']) {
		
						$userData['password'] = bcrypt($userData['password']);
		
					} else {
		
						return response()->json([
							'1' => $userData['password'],
							'2' => $userData['confirm_password'],
							'success' => false,
							'message' => 'Password and confirm password do not match.',
							'data' => null,
		
						], 400);
		
					}

				} else {

					return response()->json([

						'success' => false,
						'message' => 'Old password is incorrect.',
						'data' => null,

					], 400);

				}

			} else {
				
				return response()->json([

					'success' => false,
					'message' => 'Old password is required.',
					'data' => null,

				], 400);
			}

		}

		$user = User::where('email', $user)
			->orWhere('username', $user)
			->orWhere('id', $user)
			->firstOrFail();
		unset($userData['confirm_password']);
		unset($userData['old_password']);
		$user->update($userData);

		return response()->json([

			'success' => true,
			'message' => 'User updated.',
			'data' => $user,

		], 200);

	}



	public function destroy($user) {

		$user = User::where('email', $user)
					->orWhere('username', $user)
					->orWhere('id', $user)
					->firstOrFail();
		$user->deactivated_on = now();
		$user->save();

		return response()->json([

			'success' => true,
			'message' => 'User deactivated.',
			'data' => $user,

		], 200);

	}



	public function login(Request $request) {

		$validatedData = $request->validate([

			'login' => 'required',
			'password' => 'required|min:6',

		]);

		$user = User::where('email', $request->input('login'))
					->orWhere('username', $request->input('login'))
					->first();

		if (!$user || !Hash::check($request->input('password'), $user->password)) {

			return response()->json([

				'success' => false,
				'message' => 'Invalid credentials.',

			], 401);

		}

		$token = Str::random(60);
		$encrypted_token = encrypt($token);
		$cookie = cookie('token', $encrypted_token, time() + 315360000);

		$user->update([

			'api_token' => $token,

		]);

		return response()->json([

			'success' => true,
			'message' => 'User logged in.',
			'data' => array_merge(
				$user->toArray(),
				['following' => $user->relationships],
				['following_num' => $user->relationships->count()],
				['followers' => $user->followers],
				['followers_num' => $user->followers->count()],
				['token' => $encrypted_token],
			),

		], 200)->withCookie($cookie);



		/*$validatedData = Validator::make($request->all(), [

			'login' => 'required',
			'password' => 'required|min:6',

		]);

		if ($validatedData->fails()) {

			return response()->json([

				'success' => false,
				'message' => $validatedData->errors()->first(),
				'data' => null,

			], 400);

		}

		$user = User::where('email', $request->input('login'))
					->orWhere('username', $request->input('login'))
					->first();

		if (!$user || !Hash::check($request->input('password'), $user->password)) {

			return response()->json([

				'success' => false,
				'message' => 'Invalid credentials.',
				'data' => null,

			], 401);

		}

		if (!is_null($user->deactivated_on)) {

			$user->deactivated_on = null;
			$user->save();

		}

		$token = Str::random(60);
		$cookie = cookie('token', encrypt($token), time() + 315360000, '/', null, false, false);

		$user->update([

			'api_token' => $token,

		]);

		return response()->json([

			'success' => true,
			'message' => 'Login successful.',
			'token' => $token,
			'data' => array_merge($user->toArray(), ['following' => $user->relationships]),

		], 200)->withCookie($cookie);*/

	}



	public function logout(Request $request) {

		$cookie = cookie()->forget('token');

		return response()->json([

			'success' => true,
			'message' => 'Logged out successfully.',

		], 200)->withCookie($cookie);

	}



}
