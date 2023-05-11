<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Relationship;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RelationshipController extends Controller {



    public function update(Request $request) {

		$target = $request->input('target');
		$type = $request->input('type');
		$token = $request->input('token');
		$current_user = null;

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
		
		$target_user = User::findOrFail($target);

		$relationship = Relationship::firstOrCreate([
			'user_id' => $current_user->id,
			'target_user_id' => $target_user->id,
		]);

		// return new JsonResponse([$target_user->relationships]);

		if ($relationship->type == $type) {

			$relationship->delete();

		} else {

			$relationship->type = $type;
			$relationship->save();

		}

		return response()->json([
			'success' => true,
			'message' => 'Relationship updated.',
			'data' => array_merge($relationship->toArray(), ['following' => $current_user->relationships]),
		], 200);

    }



}
