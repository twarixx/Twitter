<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model {
	
    use HasFactory;

	protected $fillable = [

		'email',
		'password',
		'username',
		'display_name',
		'bio',
		'banner',
		'profile_picture',
		'admin',
		'deactivated_on',

	];

	protected $hidden = [

		'password',

	];
	
}
