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
                    'fr' => 'Groupe Expert',
                    'en' => 'Expert Group',
                ]),
                'title' => json_encode([
                    'fr' => 'Absolument parfait!',
                    'en' => 'Absolutely perfect!',
                ]),
                'body' => json_encode([
                    'fr' => 'Nos locaux ont été débarrassés de tous les nuisibles présents.',
                    'en' => 'Our premises have been cleared of all pests present.',
                ]),
                'photo' => 'image1.png'
            ],
            [
                'name' => 'Max Harvey',
                'company' => json_encode([
                    'fr' => 'Sygalyn TV Sat',
                    'en' => 'Sygalyn TV Sat',
                ]),
                'title' => json_encode([
                    'fr' => 'La meilleure décision',
                    'en' => 'Best decision ever',
                ]),
                'body' => json_encode([
                    'fr' => 'Le personnel de notre entreprise s\'est brillamment formé à la gestion des nuisibles.',
                    'en' => 'The personnel of our company are brilliantly trained in pest management.',
                ]),
                'photo' => 'image2.png'
            ],
            [
                'name' => 'Kit Harington',
                'company' => json_encode([
                    'fr' => 'Padre Pio Maternité et Hôpital Médical Inc',
                    'en' => 'Padre Pio Maternity and Medial Hospital Inc',
                ]),
                'title' => json_encode([
                    'fr' => 'Ils ont sauvé mon entreprise',
                    'en' => 'Saved my business',
                ]),
                'body' => json_encode([
                    'fr' => 'Efficace est l\'adjectif que nous pouvons utiliser pour qualifier leurs services. Notre hôpital est régulièrement désinfecté par leurs experts.',
                    'en' => 'Efficient is the adjective we can use to qualify their services. Our hospital is regularly disinfected by their experts.',
                ]),
                'photo' => 'image3.jpg'
            ],
            [
                'name' => 'Maria Marlin D',
                'company' => json_encode([
                    'fr' => 'Institut Supérieur de Technologie Médicale',
                    'en' => 'Higher Institute of Medical Technology',
                ]),
                'title' => json_encode([
                    'fr' => 'Absolument parfait!',
                    'en' => 'Absolutely perfect!',
                ]),
                'body' => json_encode([
                    'fr' => 'Nous avons été conseillé, formé et accompagné par l\'équipe d\'Hosamine.',
                    'en' => 'We have been advised, trained and supported by the Hosamine team.',
                ]),
                'photo' => 'image4.jpg'
            ],
            [
                'name' => 'Alfie Allen',
                'company' => json_encode([
                    'fr' => 'Port Autonome de Douala',
                    'en' => 'Port Authority of Douala',
                ]),
                'title' => json_encode([
                    'fr' => 'La meilleure décision',
                    'en' => 'Best decision ever',
                ]),
                'body' => json_encode([
                    'fr' => 'Ils sont notre partenaire et prestataire pour les questions d\'hygiène et d\'assainissement.',
                    'en' => 'They are our partner and service provider for hygiene and sanitation issues.',
                ]),
                'photo' => 'image5.png'
            ],
            [
                'name' => 'Alfie Allen',
                'company' => json_encode([
                    'fr' => 'NOV',
                    'en' => 'NOV',
                ]),
                'title' => json_encode([
                    'fr' => 'La meilleure décision',
                    'en' => 'Best decision ever',
                ]),
                'body' => json_encode([
                    'fr' => 'Ils sont incontournables.',
                    'en' => 'They are essential.',
                ]),
                'photo' => 'image6.png'
            ],
            [
                'name' => 'Alfie Allen',
                'company' => json_encode([
                    'fr' => 'GTS Alarm',
                    'en' => 'GTS Alarm',
                ]),
                'title' => json_encode([
                    'fr' => 'La meilleure décision',
                    'en' => 'Best decision ever',
                ]),
                'body' => json_encode([
                    'fr' => 'Après leur intervention au sein de notre entreprise, un suivi personnalisé a été fait pour nous.',
                    'en' => 'After their intervention within our company, a personalized follow-up was done for us.',
                ]),
                'photo' => 'image7.jpg'
            ],
            [
                'name' => 'Alfie Allen',
                'company' => json_encode([
                    'fr' => 'Groupe AMS',
                    'en' => 'AMS Group',
                ]),
                'title' => json_encode([
                    'fr' => 'La meilleure décision',
                    'en' => 'Best decision ever',
                ]),
                'body' => json_encode([
                    'fr' => 'Nous avons sollicité Hosamine car ils sont des prestataires de choix pour les questions de traitement phytosanitaire.',
                    'en' => 'We contacted Hosamine because they are the service providers of choice for questions of phytosanitary treatment.',
                ]),
                'photo' => 'image8.png'
            ],
        ];

        foreach ($testimonies as $testimony) {
            Testimony::create($testimony);
        }
    }
}
