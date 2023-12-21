import { EntrepriseCard } from ".";
import { TEntreprise } from "../types";

interface EntrepriseListProps {
  entreprises: {
    entreprises: TEntreprise[];
  };
}

export const EntrepriseList: React.FC<EntrepriseListProps> = ({entreprises}) => {
  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 md:grid-rows-5 lg:grid-cols-5 lg:grid-rows-2">
      {entreprises.entreprises.map((entreprise: TEntreprise) => (
        <EntrepriseCard key={entreprise.id} entreprise={entreprise}/>
      ))}
    </div>
  );
}