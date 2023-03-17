<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

	public function up() {

		Schema::create('users', function(Blueprint $table) {

			$table->id();
			$table->string('email')->unique();
			$table->string('password');
			$table->string('username');
			$table->string('display_name');
			$table->text('bio')->nullable();
			$table->text('banner')->nullable();
			$table->string('profile_picture')->nullable();
			$table->boolean('admin')->default(false);
			$table->boolean('active')->default(true);
			$table->timestamp('deactivated_on')->nullable();
			$table->timestamp('last_update_on');
			$table->timestamp('created_on');

		});

		Schema::create('posts', function(Blueprint $table) {

			$table->id();
			$table->unsignedBigInteger('user_id');
			$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
			$table->unsignedBigInteger('post_id')->nullable();  // if post is a reply
			$table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade')->nullOnDelete();
			$table->text('message');
			$table->string('image')->nullable();
			$table->boolean('deleted')->default(false);
			$table->timestamp('created_on');
			
		});

		Schema::create('likes', function(Blueprint $table) {

			$table->id();
			$table->unsignedBigInteger('user_id');
			$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
			$table->unsignedBigInteger('post_id');
			$table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
			$table->timestamp('created_on');

		});

		Schema::create('relationships', function(Blueprint $table) {

			$table->id();
			$table->unsignedBigInteger('user_id');
			$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
			$table->unsignedBigInteger('target_user_id');
			$table->foreign('target_user_id')->references('id')->on('users')->onDelete('cascade');
			$table->enum('type', ['friend', 'block', 'follow']);
			$table->timestamp('created_on');

		});

	}

	public function down() {

		Schema::dropIfExists('users');
		Schema::dropIfExists('posts');
		Schema::dropIfExists('likes');
		Schema::dropIfExists('relations');

	}

};
