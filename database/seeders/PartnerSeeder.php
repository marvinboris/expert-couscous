<?php

namespace Database\Seeders;

use App\Models\Partner;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $partners = [
            [
                'name' => '',
                'photo' => 'logo-minsante.png',
            ],
            [
                'name' => '',
                'photo' => 'HPP_A.png',
            ],
            [
                'name' => '',
                'photo' => 'Arysta-LifeScience-Logo-1024x278-1.png',
            ],
            [
                'name' => '',
                'photo' => 'Logo-minader-1.jpg',
            ],
            [
                'name' => '',
                'photo' => 'logo-solevo.png',
            ],
        ];

        foreach ($partners as $partner) {
            Partner::create($partner);
        }
    }
}
