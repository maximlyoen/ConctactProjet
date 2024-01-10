export type TEntreprise = {
    ID_ENTREPRISE: number;
    NOM: string;
    IMAGE: string;
  };

export type TPersonne = {
    ID_CONTACTS: number;
    NOM: string;
    PRENOM: string;
    MAIL: string;
    NOM_ENTREPRISE: string;
    RH: boolean;
    forumStages: string[];
    jobDating: string[];
    taxeApprentissage: string[];
    conseilPerf: string;
    tuteur: string[];
    vacataire: string[];
    matineeInnov: string[];
  };

export type TTags = {
    ID_TAGS: number;
    NOM: string;
    PRIX_TA?: number;
    ANNEE?: number;
  };