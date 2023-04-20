<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class User extends Model {
	
    use HasFactory;
	use HasApiTokens;

	protected $fillable = [

		'email',
		'password',
		'confirm_password',
		'username',
		'display_name',
		'bio',
		'banner',
		'profile_picture',
		'admin',
		'deactivated_on',
		'verified_on',
		'api_token',
		'banned_on',

	];

	protected $hidden = [

		'password',
		'api_token',
		'deactivated_on',

	];

	public function Followers(): HasMany {
		
		return $this->hasMany(Relationship::class, 'target_user_id');

	}
	
	public function Relationships(): HasMany {

		return $this->hasMany(Relationship::class);

	}
	
	/*public function Relationships(string $type = null): HasMany {

		$query = $this->hasMany(Relationship::class);

		if ($type === 'following') {

			$query->where('user_id', $this->id);

		} elseif ($type === 'followers') {

			$query->where('target_user_id', $this->id);

		} else {
			dd();
		}

		echo $query->toSql();

		return $query;

	}*/
}
