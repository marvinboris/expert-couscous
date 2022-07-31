<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class TeamMemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $team_members = [
            [
                'name' => 'Leo Alexander',
                'job' => json_encode(['fr' => 'Marketing Ex.']),
                'photo' => 'team_image2.jpg',
            ],
            [
                'name' => 'Levi Hudson',
                'job' => json_encode(['fr' => 'Marketing Ex.']),
                'photo' => 'team_image4.jpg',
            ],
            [
                'name' => 'Charlie Harrison',
                'job' => json_encode(['fr' => 'Marketing Ex.']),
                'photo' => 'team_image3.jpg',
            ],
            [
                'name' => 'Max Harvey',
                'job' => json_encode(['fr' => 'Marketing Ex.']),
                'photo' => 'team_image1.jpg',
            ],
        ];

        foreach ($team_members as $team_member) {
            TeamMember::create($team_member);
        }
    }
}
