export type TEntreprise = {
    ID_ENTREPRISE: number;
    NOM: string;
    IMAGE: string;
    salaries: TPersonne[];
  };

export type TPersonne = {
    id: number;
    name: string;
    firstname: string;
    email: string;
    entreprise: TEntreprise;
    RH: boolean;
    forumStages: string[];
    jobDating: string[];
    taxeApprentissage: string[];
    conseilPerf: string;
    tuteur: string[];
    vacataire: string[];
    matineeInnov: string[];
  };