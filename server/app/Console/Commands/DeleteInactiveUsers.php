<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Console\Command;

class DeleteInactiveUsers extends Command {

	protected $signature = 'delete:inactive-users';

	protected $description = 'Delete users after X amount of time';

	public function handle() {

		$users = User::whereNotNull('deactivated_on')
					->where('deactivated_on', '<=', Carbon::now()->subHour())
					->get();

		foreach ($users as $user) {
			
			$user->delete();

		}

	}

}
