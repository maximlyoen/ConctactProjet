export type TEntreprise = {
    ID_ENTREPRISE: number;
    NOM: string;
    IMAGE: string;
  };

export type TPersonne = {
    ID_CONTACTS: number;
    NOM: string;
    PRENOM: string;
    NOM_ENTREPRISE: string;
    MAIL: string;
    entreprise: TEntreprise;
    RH: number;
    forumStages: string[];
    jobDating: string[];
    taxeApprentissage: string[];
    conseilPerf: string;
    tuteur: string[];
    vacataire: string[];
    matineeInnov: string[];
  };