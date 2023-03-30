<?php

// soft delete adden

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Run the migrations.
	 */
	public function up(): void
	{
		Schema::create('users', function (Blueprint $table) {
			$table->id();
			$table->string('email')->unique();
			$table->string('password');
			$table->string('username')->nullable();;
			$table->string('display_name')->nullable();;
			$table->text('bio')->nullable();
			$table->text('banner')->nullable();
			$table->string('profile_picture')->nullable();
			$table->boolean('admin')->default(false);
			$table->boolean('verified')->default(false);
			$table->timestamp('verified_on')->nullable();
			$table->timestamp('deactivated_on')->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('users');
	}
};
