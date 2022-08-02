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
                'title' => json_encode([
                    'fr' => 'Lutte anti-vectorielle',
                    'en' => 'Vector control',
                ]),
                'body' => json_encode([
                    'fr' => 'Elle est un ensemble de mesures intégrées permettant de réduire ou d\'éliminer une infestation de nuisible (rongeurs, insectes, reptiles, oiseaux et acariens) chers des particuliers ou des entreprises. Nous proposons une gamme de solutions intégrées pour une lutte efficace (sensibilisation/formation, limitation des accès et divers autres moyens de lutte).<br /><br /><strong>Prestations</strong>: Sensibilisation et formation, désinsectisation, dératisation, déserpentilisation',
                    'en' => 'It is a set of integrated measures to reduce or eliminate an infestation of pests (rodents, insects, reptiles, birds and mites) dear to individuals or businesses. We offer a range of integrated solutions for effective control (awareness/training, access limitation and various other means of control).<br /><br /><strong>Services</strong>: Awareness and training, disinsectization, deratization, deserpentilization',
                ]),
                'icon' => 'bacteria',
            ],
            [
                'title' => json_encode([
                    'fr' => 'Traitement phytosanitaire',
                    'en' => 'Phytosanitary treatment',
                ]),
                'body' => json_encode([
                    'fr' => 'Traitements contre les organismes nuisibles des végétaux, des denrées et produits agricoles entreposés (plantations, magasins, entrepôts, containeurs, cales de navires, silos de stockage). Nous fournissons un service de précision fonction du type d\'ennemis à combattre, la zone de traitement et la nature du produit à traiter.<br /><br /><strong>Prestations</strong>: Sensibilisation et formation, fumigation, pulvérisation, traitement par chaleur',
                    'en' => 'Treatments against harmful organisms of plants, foodstuffs and stored agricultural products (plantations, stores, warehouses, containers, ship holds, storage silos). We provide a precision service depending on the type of enemies to be fought, the treatment area and the nature of the product to be treated.<br /><br /><strong>Services</strong>: Awareness and training, fumigation , spraying, heat treatment',
                ]),
                'icon' => 'head-side-mask',
            ],
            [
                'title' => json_encode([
                    'fr' => 'Espaces verts',
                    'en' => 'Green spaces',
            ]),
                'body' => json_encode([
                    'fr' => 'Entretien des espaces verts varient selon l\'envergure du projet à réaliser. Nos paysagistes proposent des prestations variées selon le travail à effectuer sur l\'entretien du gazon, sur la scarification, l\'aération de la pelouse, le désherbage et l\'application de traitements phytosanitaires sur les plantes.<br /><br /><strong>Prestations</strong>: Entretien des espaces verts, désherbage, entretien des terrains sportifs, traitement  phytosanitaire sur les plantes, jardinage.',
                    'en' => 'Maintenance of green spaces vary according to the scope of the project to be carried out. Our landscapers offer a variety of services depending on the work to be done on lawn maintenance, scarification, lawn aeration, weeding and the application of phytosanitary treatments to plants.<br />< br /><strong>Services</strong>: Maintenance of green spaces, weeding, maintenance of sports grounds, phytosanitary treatment of plants, gardening.',
                ]),
                'icon' => 'tree',
            ],
            [
                'title' => json_encode([
                    'fr' => 'Hygiène et assainissement',
                    'en' => 'Hygiene and sanitation',
            ]),
                'body' => json_encode([
                    'fr' => 'Avec pour objectif de mettre en œuvre des moyens d\'hygiène pour promouvoir la santé par la prévention de tous contacts humains avec les risques liés aux déchets. Il peut s\'agir d\'une épuration, d\'une désinfection, d\'une asepsie, d\'une dépollution, d\'un drainage, d\'un nettoyage et d\'une purification.<br /><br /><strong>Prestations</strong>: Nettoyage professionnel, désinfection, vidange et traitement des fosses septiques, assainissement des eaux, drainage, curage des canalisations, audit.',
                    'en' => 'With the objective of implementing hygiene means to promote health by preventing all human contact with the risks associated with waste. It can be purification, disinfection, asepsis, depollution, drainage, cleaning and purification.<br /><br /><strong>Services</strong>: Professional cleaning, disinfection, emptying and treatment of septic tanks, water purification, drainage, cleaning of pipes, audit.',
                ]),
                'icon' => 'soap',
            ],
            [
                'title' => json_encode([
                    'fr' => 'Accompagnement technique',
                    'en' => 'Technical support',
                ]),
                'body' => json_encode([
                    'fr' => 'Hosamine SARL intervient auprès des organisations de tous les secteurs d\'activités. De ce fait, nous offrons 04 solutions majeurs: Audits & Conseils - Certifications des systèmes & personnes - Externalisation de la fonction qualité/HSE/QSE des entreprises -Formations continues aux  professionnelles du QHSE.<br /><br /><strong>Prestations</strong>: Audit, conseils, accompagnement à la certification des systèmes et des personnes, externalisation de la fonction QHSE.',
                    'en' => 'Hosamine SARL works with organizations in all sectors of activity. As a result, we offer 04 major solutions: Audits & Advice - Certification of systems & people - Outsourcing of the quality / HSE / QSE function of companies - Continuous training for QHSE professionals.<br /><br /><strong> Services</strong>: Audit, advice, support for the certification of systems and people, outsourcing of the QHSE function.',
                ]),
                'icon' => 'user-friends',
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
