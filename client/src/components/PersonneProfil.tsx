import { TPersonne } from "../types"

export const PersonneProfil = ({ personne } : {personne: TPersonne}) => {
    return (    
        <div className="flex justify-center">
            <p>{personne.NOM}</p>
            <p>{personne.PRENOM}</p>
            <p>{personne.MAIL}</p>
            <pre>
                {JSON.stringify(personne.entreprise, null, 2)}
            </pre>
            <p>{personne.RH}</p>
        </div> 
    )
}