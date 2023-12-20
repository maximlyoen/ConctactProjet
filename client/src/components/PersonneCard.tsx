import { TEntreprise } from "../types";

type Personne = {
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

export const PersonneCard = ({ personne }: { personne: Personne }) => {
    return (
      <div
      className="w-[100px] my-4 p-2 bg-zinc-100 overflow-hidden hover:overflow-auto rounded-md flex flex-col justify-between items-center cursor-pointer border border-gray-700 hover:border-indigo-500"
    >
        <p>{personne.name}</p>
        <p>{personne.firstname}</p>
        <p>{personne.email}</p>
        <p>{personne.entreprise.name}</p>

      </div>
    );
};
