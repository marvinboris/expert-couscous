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
                'body' => json_encode(['fr' => 'Elle est un ensemble de mesures intégrées permettant de réduire ou d\'éliminer une infestation de nuisible (rongeurs, insectes, reptiles, oiseaux et acariens) chers des particuliers ou des entreprises. Nous proposons une gamme de solutions intégrées pour une lutte efficace (sensibilisation/formation, limitation des accès et divers autres moyens de lutte).<br /><br /><strong>Prestations</strong>: Sensibilisation et formation, désinsectisation, dératisation, déserpentilisation']),
                'icon' => 'bacteria',
            ],
            [
                'title' => json_encode(['fr' => 'Traitement phytosanitaire']),
                'body' => json_encode(['fr' => 'Traitements contre les organismes nuisibles des végétaux, des denrées et produits agricoles entreposés (plantations, magasins, entrepôts, containeurs, cales de navires, silos de stockage). Nous fournissons un service de précision fonction du type d\'ennemis à combattre, la zone de traitement et la nature du produit à traiter.<br /><br /><strong>Prestations</strong>: Sensibilisation et formation, fumigation, pulvérisation, traitement par chaleur']),
                'icon' => 'head-side-mask',
            ],
            [
                'title' => json_encode(['fr' => 'Espaces verts']),
                'body' => json_encode(['fr' => 'Entretien des espaces verts varient selon l\'envergure du projet à réaliser. Nos paysagistes proposent des prestations variées selon le travail à effectuer sur l\'entretien du gazon, sur la scarification, l\'aération de la pelouse, le désherbage et l\'application de traitements phytosanitaires sur les plantes.<br /><br /><strong>Prestations</strong>: Entretien des espaces verts, désherbage, entretien des terrains sportifs, traitement  phytosanitaire sur les plantes, jardinage.']),
                'icon' => 'tree',
            ],
            [
                'title' => json_encode(['fr' => 'Hygiène et assainissement']),
                'body' => json_encode(['fr' => 'Avec pour objectif de mettre en œuvre des moyens d\'hygiène pour promouvoir la santé par la prévention de tous contacts humains avec les risques liés aux déchets. Il peut s\'agir d\'une épuration, d\'une désinfection, d\'une asepsie, d\'une dépollution, d\'un drainage, d\'un nettoyage et d\'une purification.<br /><br /><strong>Prestations</strong>: Nettoyage professionnel, désinfection, vidange et traitement des fosses septiques, assainissement des eaux, drainage, curage des canalisations, audit.']),
                'icon' => 'soap',
            ],
            [
                'title' => json_encode(['fr' => 'Accompagnement technique']),
                'body' => json_encode(['fr' => 'Hosamine Sarl intervient auprès des organisations de tous les secteurs d\'activités. De ce fait, nous offrons 04 solutions majeurs: Audits & Conseils - Certifications des systèmes & personnes - Externalisation de la fonction qualité/HSE/QSE des entreprises -Formations continues aux  professionnelles du QHSE.<br /><br /><strong>Prestations</strong>: Audit, conseils, accompagnement à la certification des systèmes et des personnes, externalisation de la fonction QHSE.']),
                'icon' => 'user-friends',
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
