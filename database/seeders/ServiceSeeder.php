<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $services = [
            [
                'title' => json_encode(['fr' => 'Lutte anti-vectorielle']),
                'body' => json_encode(['fr' => 'Elle inclut la lutte chimique, la lutte biologique, l\'action sur l\'environnement, l\'éducation sanitaire, la mobilisation sociale et l\'évaluation permanente de toutes ces méthodes.']),
                'icon' => 'bacteria',
            ],
            [
                'title' => json_encode(['fr' => 'Désinfection']),
                'body' => json_encode(['fr' => 'Elle consiste à utiliser des produits chimiques pour tuer les germes sur les surfaces, ce qui aide à prévenir la propagation des infections.']),
                'icon' => 'virus',
            ],
            [
                'title' => json_encode(['fr' => 'Désinsectisation']),
                'body' => json_encode(['fr' => 'Destruction d\'insectes susceptibles de transmettre des germes pathogènes.']),
                'icon' => 'spider',
            ],
            [
                'title' => json_encode(['fr' => 'Dératisation']),
                'body' => json_encode(['fr' => 'Destruction des rats et autres rongeurs qui se trouvent dans un local.']),
                'icon' => 'cat',
            ],
            [
                'title' => json_encode(['fr' => 'Déreptilisation']),
                'body' => json_encode(['fr' => 'Traitement pour lutter contre les serpents, lézards, scorpions et tous types de nuisibles qui peuvent être venimeux.']),
                'icon' => 'dragon',
            ],
            [
                'title' => json_encode(['fr' => 'Traitement phytosanitaire']),
                'body' => json_encode(['fr' => 'Traitement des cultures dans le but de réduire le développement des maladies et des parasites.']),
                'icon' => 'head-side-mask',
            ],
            [
                'title' => json_encode(['fr' => 'Nettoyage industriel et domestique']),
                'body' => json_encode(['fr' => 'C\'est l\'ensemble des prestations d\'entretien de locaux.']),
                'icon' => 'house-damage',
            ],
            [
                'title' => json_encode(['fr' => 'Curage des caniveaux']),
                'body' => json_encode(['fr' => 'Entretenir et nettoyer les canalisations d\'assainissement et les ouvrages qui s\'y rapportent (regards des branchements, siphons, caniveaux, etc).']),
                'icon' => 'road',
            ],
            [
                'title' => json_encode(['fr' => 'Désherbage chimique et mécanique']),
                'body' => json_encode(['fr' => 'C\'est la lutte contre les adventices (plantes qui poussent dans un endroit sans y avoir été intentionnellement installée).']),
                'icon' => 'seedling',
            ],
            [
                'title' => json_encode(['fr' => 'Offre Shipchandler']),
                'body' => json_encode(['fr' => 'Vente de produits divers: accastillage, outillage & moteur, matériel électrique, produits chimiques, huiles & graisses, produits de nettoyage, literie etc.']),
                'icon' => 'th',
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
