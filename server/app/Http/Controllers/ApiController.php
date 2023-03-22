<?php

// 200: ok
// 201: created
// 204: no content
// 400: bad request
// 401: unauthorized
// 403: forbidden
// 404: not found
// 500: error

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Post;

class ApiController extends Controller {

	//! POSTS
	public function post_post($query) {

		$post = Post::find($query);

		if ($post) {

			return response()->json([
				'success' => true,
				'code' => 200,
				'message' => 'Post created.',
				'data' => $post,
			]);

		} else {

			return response()->json([
				'success' => false,
				'code' => 400,
				'message' => 'No post found.',
				'data' => $post,
			]);

		}

	}

	

	//! USERS
	public function get_user($query) {

		$user = DB::table('user')
			->where('id', $query)
			->orWhere('username', $query)
			->first();

		if ($user) {

			return response()->json([
				'success' => true,
				'code' => 200,
				'message' => 'User found.',
				'data' => $user,
			]);

		} else {

			return response()->json([
				'success' => false,
				'code' => 400,
				'message' => 'No user(s) found.',
				'data' => $user,
			]);

		}

	}

}
