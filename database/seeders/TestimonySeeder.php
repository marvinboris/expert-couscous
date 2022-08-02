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
                'company' => json_encode([
                    'fr' => 'Banque HSBC',
                    'en' => 'HSBC Bank',
                ]),
                'title' => json_encode([
                    'fr' => 'Absolument parfait!',
                    'en' => 'Absolutely perfect!',
                ]),
                'body' => json_encode([
                    'fr' => 'Visualisez en toute transparence un capital intellectuel de qualité sans collaboration supérieure ni partage d\'idées. Pontifier de manière holistique les portails de bases installées.',
                    'en' => 'Seamlessly visualize quality intellectual capital without superior collaboration or idea sharing. Holistically pontificate installed base portals.',
                ]),
                'photo' => 'testimonial1.jpg'
            ],
            [
                'name' => 'Max Harvey',
                'company' => json_encode([
                    'fr' => 'Hôtel Berg',
                    'en' => 'Hotel Berg',
                ]),
                'title' => json_encode([
                    'fr' => 'La meilleure décision',
                    'en' => 'Best decision ever',
                ]),
                'body' => json_encode([
                    'fr' => 'Déployez rapidement des réseaux stratégiques avec un e-business convaincant. Pontifier de manière crédible des produits manufacturés hautement efficaces et des données activées.',
                    'en' => 'Rapidly deploy strategic networks with compelling e-business. Credibly pontificate highly efficient manufactured goods and data enabled.',
                ]),
                'photo' => 'testimonial5.jpg'
            ],
            [
                'name' => 'Kit Harington',
                'company' => json_encode([
                    'fr' => 'Startup Applauz',
                    'en' => 'Applauz Startup',
                ]),
                'title' => json_encode([
                    'fr' => 'Ils ont sauvé mon entreprise',
                    'en' => 'Saved my business',
                ]),
                'body' => json_encode([
                    'fr' => 'Ciblez dynamiquement un capital intellectuel à haut rendement pour des technologies personnalisées. Intégrer objectivement les communautés émergentes de compétences de base.',
                    'en' => 'Dynamically target high-return intellectual capital for custom technologies. Objectively integrate emerging communities of core competencies.',
                ]),
                'photo' => 'testimonial4.jpg'
            ],
            [
                'name' => 'Maria Marlin D',
                'company' => json_encode([
                    'fr' => 'Hôtel California',
                    'en' => 'Hotel California',
                ]),
                'title' => json_encode([
                    'fr' => 'Absolument parfait!',
                    'en' => 'Absolutely perfect!',
                ]),
                'body' => json_encode([
                    'fr' => 'Visualisez en toute transparence un capital intellectuel de qualité sans collaboration supérieure ni partage d\'idées. Pontifier de manière holistique les portails de bases installées.',
                    'en' => 'Seamlessly visualize quality intellectual capital without superior collaboration or idea sharing. Holistically pontificate installed base portals.',
                ]),
                'photo' => 'testimonial3.jpg'
            ],
            [
                'name' => 'Alfie Allen',
                'company' => json_encode([
                    'fr' => 'Estato',
                    'en' => 'Estato',
                ]),
                'title' => json_encode([
                    'fr' => 'La meilleure décision',
                    'en' => 'Best decision ever',
                ]),
                'body' => json_encode([
                    'fr' => 'Déployez rapidement des réseaux stratégiques avec un e-business convaincant. Pontifier de manière crédible des produits manufacturés hautement efficaces et des données activées.',
                    'en' => 'Rapidly deploy strategic networks with compelling e-business. Credibly pontificate highly efficient manufactured goods and data enabled.',
                ]),
                'photo' => 'testimonial2.jpg'
            ],
        ];

        foreach ($testimonies as $testimony) {
            Testimony::create($testimony);
        }
    }
}
