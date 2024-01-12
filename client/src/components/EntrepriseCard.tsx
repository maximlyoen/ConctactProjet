import { useNavigate } from "react-router-dom";
import { TEntreprise } from "../types";
import { LoadingImage } from ".";

export const EntrepriseCard = ({ entreprise }: { entreprise: TEntreprise }) => {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/entreprise/${id}`);
  };

  // Fonction pour anonymiser le nom de l'entreprise
  const anonymizeName = (name: string): string => {
    // Ici, vous pouvez implémenter la logique de remplacement par une valeur anonyme
      name = "Anonyme";
    return name;
  };

  return (
    <div
      className="w-[100%] my-4 p-2 bg-zinc-100 overflow-hidden hover:overflow-auto rounded-md flex flex-col justify-between items-center cursor-pointer border border-gray-700 hover:border-indigo-500"
      onClick={() => handleClick(entreprise.ID_ENTREPRISE)}
    >
      <p>{anonymizeName(entreprise.NOM)}</p>
      <div className="h-40 w-40 rounded-md">
        <LoadingImage imageUrl={entreprise.IMAGE} />
      </div>
    </div>
  );
};
