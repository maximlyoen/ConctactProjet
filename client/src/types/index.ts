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
    RH: boolean;
    DESCRIPTION?: string;
    MOBILE?: string;
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
    RH: boolean;
  };

  export type TUtilisateur = {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    role: string;
    pwd: string;
  };

  export type TToken = {
    token: string;
    message: string;
  };