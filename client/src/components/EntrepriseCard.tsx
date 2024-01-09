import { useNavigate } from "react-router-dom";
import { TEntreprise } from "../types";
import { LoadingImage } from ".";

export const EntrepriseCard = ({ entreprise }: { entreprise: TEntreprise }) => {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/entreprise/${id}`);
  };

  return (
    <div
      className="w-[100px] my-4 p-2 bg-zinc-100 overflow-hidden hover:overflow-auto rounded-md flex flex-col justify-between items-center cursor-pointer border border-gray-700 hover:border-indigo-500"
      onClick={() => handleClick(entreprise.ID_ENTREPRISE)}
    >
      <p>{entreprise.NOM}</p>
      <LoadingImage imageUrl={entreprise.IMAGE} />
    </div>
  );
};
