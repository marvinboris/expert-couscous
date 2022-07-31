<?php

namespace Database\Seeders;

use App\Models\Testimony;
use Illuminate\Database\Seeder;

class TestimonySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $testimonies = [
            [
                'name' => 'Charlie Harrison',
                'company' => json_encode(['fr' => 'HSBC Bank']),
                'title' => json_encode(['fr' => 'Absolument parfait!']),
                'body' => json_encode(['fr' => 'Visualisez en toute transparence un capital intellectuel de qualité sans collaboration supérieure ni partage d\'idées. Pontifier de manière holistique les portails de bases installées.']),
                'photo' => 'testimonial1.jpg'
            ],
            [
                'name' => 'Max Harvey',
                'company' => json_encode(['fr' => 'Hotel Berg']),
                'title' => json_encode(['fr' => 'La meilleure décision']),
                'body' => json_encode(['fr' => 'Déployez rapidement des réseaux stratégiques avec un e-business convaincant. Pontifier de manière crédible des produits manufacturés hautement efficaces et des données activées.']),
                'photo' => 'testimonial5.jpg'
            ],
            [
                'name' => 'Kit Harington',
                'company' => json_encode(['fr' => 'Applauz Startup']),
                'title' => json_encode(['fr' => 'Ils ont sauvé mon entreprise']),
                'body' => json_encode(['fr' => 'Ciblez dynamiquement un capital intellectuel à haut rendement pour des technologies personnalisées. Intégrer objectivement les communautés émergentes de compétences de base.']),
                'photo' => 'testimonial4.jpg'
            ],
            [
                'name' => 'Maria Marlin D',
                'company' => json_encode(['fr' => 'Hotel California']),
                'title' => json_encode(['fr' => 'Absolument parfait!']),
                'body' => json_encode(['fr' => 'Visualisez en toute transparence un capital intellectuel de qualité sans collaboration supérieure ni partage d\'idées. Pontifier de manière holistique les portails de bases installées.']),
                'photo' => 'testimonial3.jpg'
            ],
            [
                'name' => 'Alfie Allen',
                'company' => json_encode(['fr' => 'Estato']),
                'title' => json_encode(['fr' => 'La meilleure décision']),
                'body' => json_encode(['fr' => 'Déployez rapidement des réseaux stratégiques avec un e-business convaincant. Pontifier de manière crédible des produits manufacturés hautement efficaces et des données activées.']),
                'photo' => 'testimonial2.jpg'
            ],
        ];

        foreach ($testimonies as $testimony) {
            Testimony::create($testimony);
        }
    }
}
