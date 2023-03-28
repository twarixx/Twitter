<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller {



	public function index() {

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

		}

	}



	public function store(Request $request) {

		$validatedData = Validator::make($request->all(), [

			'email' => 'required|email|unique:users',
			'password' => 'required|min:6',

		]);

		if ($validatedData->fails()) {

			return response()->json([

				'success' => false,
				'message' => $validatedData->errors()->first(),
				'data' => null,

			], 400);

		}

		$user = new User();
		$user->email = $request->input('email');
		$user->password = bcrypt($request->input('password'));
		$user->save();

		return response()->json([

			'success' => true,
			'message' => 'User created.',
			'data' => $user

		], 201);

	}



	public function show($query) {

		$user = User::where('id', $query)
					->orWhere('email', $query)
					->orWhere('username', $query)
					->first();

		if ($user) {

			return response()->json([

				'success' => true,
				'message' => 'User found.',
				'data' => $user,

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

		$validatedData = $request->validate([

			'email' => 'sometimes|required|email|unique:users,email,' . $user,
			'password' => 'sometimes|required|min:8',
			'username' => 'sometimes|required|unique:users,username,' . $user,
			'display_name' => 'sometimes|required',
			'bio' => 'sometimes|required',
			'banner' => 'sometimes|required',
			'profile_picture' => 'sometimes|required',
			'admin' => 'sometimes|required|boolean',
			'deactivated_on' => 'sometimes|required|date_format:Y-m-d H:i:s',

		]);

		$userData = [];

		if (isset($validatedData['email'])) { $userData['email'] = $validatedData['email']; }
		if (isset($validatedData['password'])) { $userData['password'] = bcrypt($validatedData['password']); }
		if (isset($validatedData['username'])) { $userData['username'] = $validatedData['username']; }
		if (isset($validatedData['display_name'])) { $userData['display_name'] = $validatedData['display_name']; }
		if (isset($validatedData['bio'])) { $userData['bio'] = $validatedData['bio']; }
		if (isset($validatedData['banner'])) { $userData['banner'] = $validatedData['banner']; }
		if (isset($validatedData['profile_picture'])) { $userData['profile_picture'] = $validatedData['profile_picture']; }
		if (isset($validatedData['admin'])) { $userData['admin'] = $validatedData['admin']; }
		if (isset($validatedData['deactivated_on'])) { $userData['deactivated_on'] = $validatedData['deactivated_on']; }

		$user = User::where('email', $user)
			->orWhere('username', $user)
			->orWhere('id', $user)
			->firstOrFail();
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

		$validatedData = Validator::make($request->all(), [

			'email' => 'required_without:username|email',
			'username' => 'required_without:email',
			'password' => 'required|min:6',

		]);

		if ($validatedData->fails()) {

			return response()->json([

				'success' => false,
				'message' => $validatedData->errors()->first(),
				'data' => null,

			], 400);

		}

		$user = User::where('email', $request->input('email'))
					->orWhere('username', $request->input('username'))
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

		return response()->json([

			'success' => true,
			'message' => 'Login successful.',
			'data' => $user,

		], 200);

	}



}
