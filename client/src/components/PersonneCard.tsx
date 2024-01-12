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

    const isRhEmployee = personne.RH === 1;

    // Fonction pour anonymiser le nom et prénom
    const anonymizeName = (name: string): string => {
        // Ici, vous pouvez implémenter la logique de remplacement par une valeur anonyme
        name = "Anonyme name";
        return name;
    };

    // Fonction pour anonymiser le nom de l'entreprise
    const anonymizeCompanyName = (companyName: string): string => {
        // Ici, vous pouvez implémenter la logique de remplacement par une valeur anonyme
        companyName = "Entreprise Anonyme";
        return companyName;
    };

    return (
        <div
            className={`relative w-[100%] my-4 p-2 bg-zinc-100 overflow-hidden hover:overflow-auto rounded-md flex flex-col justify-between items-center cursor-pointer border border-grey-700 hover:border-indigo-500`}
            onClick={handleSinglePersonnes}
        >
            {isRhEmployee && (
                <div className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full"></div>
            )}
            <p>{anonymizeName(personne.NOM)}</p>
            <p>{anonymizeName(personne.PRENOM)}</p>
            <p>{anonymizeCompanyName(personne.NOM_ENTREPRISE)}</p>
        </div>
    );
};
