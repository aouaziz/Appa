// app/data/programsData.ts

export interface Program {
  name: string;
  slug: string; // URL-friendly identifier
  imageSrc: string;
  imageAlt: string;
  pageTitle: string;
  description: string;
  accessLevel: string[];
  diplomaType: string;
  trainingDuration: string;
  professionalOutlets: string[];
  // Card-specific data (can be derived or separate)
  cardCondition: string;
  cardDuration: string;
}

export const programsData: Program[] = [
  {
    name: "Infirmier (e) Polyvalent (e)",
    slug: "infirmier-polyvalent",
    imageSrc: "/program-nurse-1.webp", // The image for the detail page
    imageAlt: "Infirmier polyvalent professionnel.",
    pageTitle: "INFIRMIER POLYVALENT",
    description: "L&apos;Infirmier Polyvalent est la personne qui donne des soins infirmiers sur prescription ou conseil médical, ou en application du rôle propre qui lui est dévolu. L&apos;infirmière ou l&apos;infirmier participe à différentes actions en matière de prévention, d&apos;éducation de la santé et de formation ou d&apos;encadrement.",
    accessLevel: [
      "baccalauréat (toutes branches)",
      "Ou être titulaire d&apos;un diplôme de Technicien Infirmier auxiliaire"
    ],
    diplomaType: "Technicien Spécialisé Infirmier Polyvalent.",
    trainingDuration: "3 ans de formation, et 1800 heures de stages.",
    professionalOutlets: [
      "les hôpitaux publics et privés",
      "les cliniques privées",
      "les centres de santé",
      "les établissements de soins",
      "les centres de réadaptation",
    ],
    cardCondition: "Baccalauréat", // Simplified for the card
    cardDuration: "3 ans de formation", // Simplified for the card
  },
  {
    name: "Infirmier (e) Auxiliaire",
    slug: "infirmier-auxiliaire",
    imageSrc: "/program-nurse-2.webp",
    imageAlt: "Infirmière auxiliaire professionnelle.",
    pageTitle: "INFIRMIER AUXILIAIRE",
    description: "L&apos;infirmier auxiliaire assiste l&apos;infirmier polyvalent dans les soins aux patients. Il est un maillon essentiel de l&apos;équipe soignante, assurant le confort, l&apos;hygiène et le bien-être des patients.",
    accessLevel: ["Niveau Baccalauréat", "Ou diplôme de qualification professionnelle"],
    diplomaType: "Technicien Infirmier Auxiliaire.",
    trainingDuration: "2 ans de formation, et 1200 heures de stages.",
    professionalOutlets: [
      "Soins à domicile",
      "Maisons de retraite",
      "Centres pour personnes handicapées",
      "Cliniques et hôpitaux",
    ],
    cardCondition: "Niveau Bac",
    cardDuration: "2 ans de formation",
  },
  {
    name: "Aide-Soignant (e)",
    slug: "aide-soignant",
    imageSrc: "/program-nurse-3.webp",
    imageAlt: "Aide-soignante professionnelle.",
    pageTitle: "AIDE-SOIGNANT",
    description: "L&apos;aide-soignant(e) collabore aux soins infirmiers pour maintenir et restaurer la santé des patients. Il/elle joue un rôle crucial dans l&apos;accompagnement quotidien des personnes malades ou dépendantes.",
    accessLevel: ["3ème Année collège complétée"],
    diplomaType: "Aide-Soignant qualifié.",
    trainingDuration: "1 an de formation, et 600 heures de stages.",
    professionalOutlets: [
        "Centres hospitaliers",
        "Établissements d&apos;hébergement pour personnes âgées dépendantes (EHPAD)",
        "Services de soins infirmiers à domicile (SSIAD)",
        "Structures pour personnes en situation de handicap",
    ],
    cardCondition: "3ème Année collège",
    cardDuration: "1 an de formation",
  },
];