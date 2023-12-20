import { PersonneCard } from "./PersonneCard";
import { TPersonne } from "../types";

interface PersonneListProps {
  personnes: {
    personnes: TPersonne[];
  }
}

export const PersonneList: React.FC<PersonneListProps> = ({ personnes }) => {
  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 md:grid-rows-5 lg:grid-cols-5 lg:grid-rows-2">
      {personnes.personnes.map((personne: TPersonne) => (
        <PersonneCard key={personne.id} personne={personne} />
      ))
      }
    </div>
  );
};
