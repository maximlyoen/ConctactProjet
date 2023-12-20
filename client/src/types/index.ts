export type TEntreprise = {
    id: number;
    name: string;
    logo: string;
    salaries: TPersonne[];
  };

export type TPersonne = {
    id: number;
    name: string;
    firstname: string;
    email: string;
    entreprise: TEntreprise;
    forumStages: string[];
    jobDating: string[];
    taxeApprentissage: string[];
    conseilPerf: string;
    tuteur: string[];
    vacataire: string[];
    matineeInnov: string[];
    RH: boolean;
  };