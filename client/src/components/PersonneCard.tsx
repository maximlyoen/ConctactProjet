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

    const isRhEmployee = personne.RH === 1; // Vérifiez si rh est égal à 1

    return (
        <div
            className={`relative w-[100%] my-4 p-2 bg-zinc-100 overflow-hidden hover:overflow-auto rounded-md flex flex-col justify-between items-center cursor-pointer border border-grey-700 hover:border-indigo-500`}
            onClick={handleSinglePersonnes}
        >
            {isRhEmployee && (
                <div className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full"></div>
            )}
            <p>{personne.NOM}</p>
            <p>{personne.PRENOM}</p>
            <p>{personne.NOM_ENTREPRISE}</p>
        </div>
    );
};
