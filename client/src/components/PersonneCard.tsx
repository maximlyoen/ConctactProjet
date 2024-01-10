import { TPersonne } from "../types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PersonneCard = ({ personne }: { personne: TPersonne }) => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const id = personne.ID_CONTACTS;

    const handleSinglePersonnes = () => {
        if (token) navigate(`/personne/${id}`);
        if (!token) navigate("/");
    }

    return (
      <div
      className="w-[100px] my-4 p-2 bg-zinc-100 overflow-hidden hover:overflow-auto rounded-md flex flex-col justify-between items-center cursor-pointer border border-gray-700 hover:border-indigo-500"
      onClick={handleSinglePersonnes}
      >
        <p>{personne.NOM}</p>
        <p>{personne.PRENOM}</p>
        <p>{personne.MAIL}</p>
      </div>
    );
};
