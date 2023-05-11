<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller {



	public function index() {

        $posts = Post::where('deleted', 0)->get();

        return response()->json([

            'success' => true,
            'message' => 'Posts retrieved successfully.',
            'data' => $posts,

        ]);

	}



	public function index_by_user(string $id) {

		$posts = Post::where('user_id', $id)
						->where('deleted', 0)
						->get();

        return response()->json([
            'success' => true,
            'message' => 'Posts retrieved successfully.',
            'data' => $posts
        ]);

	}



	public function store(Request $request) {

		$validatedData = $request->validate([

			'user_id' => 'required|integer',
			'message' => 'required|string',

		]);

		$post = new Post;
		$post->user_id = $validatedData['user_id'];
		$post->message = $validatedData['message'];
		$post->save();

		$newPost = Post::find($post->id);
		
		return response()->json([

			'success' => true,
			'message' => 'Post created successfully.',
			'data' => $newPost,

		]);

	}



	public function upload_image(Request $request) {

		$validatedData = $request->validate([
			'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
		]);
	
		$image = $request->file('image');
		$filename = time() . '_' . $image->getClientOriginalName();
		$image->storeAs('public/images', $filename);
		$imagePath = 'images/' . $filename;
	
		$imageUrl = url($imagePath, [], true);
	
		return response()->json([
			'success' => true,
			'message' => 'Image uploaded successfully.',
			'data' => [
				'image_url' => $imageUrl,
			],
		]);


	}



	public function show(string $id) {

        $post = Post::find($id);

        if (!$post) {

            return response()->json([

                'success' => false,
                'message' => 'Post not found.',
                'data' => null

            ], 404);

        }

        return response()->json([

            'success' => true,
            'message' => 'Post retrieved successfully.',
            'data' => $post

        ]);

	}



	public function update(Request $request, string $id) {

		$post = Post::findOrFail($id);

		$validatedData = $request->validate([
			'user_id' => 'nullable|integer',
			'message' => 'nullable|string',
			'deleted' => 'nullable|boolean'
		]);
	
		if (array_key_exists('user_id', $validatedData)) {
			$post->user_id = $validatedData['user_id'];
		}
	
		if (array_key_exists('message', $validatedData)) {
			$post->message = $validatedData['message'];
		}
	
		if (array_key_exists('deleted', $validatedData)) {
			$post->deleted = $validatedData['deleted'];
		}
	
		$post->save();
	
		return response()->json([
			'success' => true,
			'message' => 'Post updated successfully.',
			'data' => $post
		]);

	}



	public function destroy(Request $request, $id) {

		$post = Post::find($id);

		if (!$post) {

			return response()->json([

				'success' => false,
				'message' => 'Post not found.'

			], 404);

		}
	
		$post->deleted = 1;
		$post->save();
	
		return response()->json([

			'success' => true,
			'message' => 'Post deleted successfully.'

		]);

	}



}
