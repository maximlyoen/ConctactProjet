import { TPersonne } from "../types"

export const PersonneProfil = ({ personne } : {personne: TPersonne}) => {
    return (    
        <div className="flex justify-center">
            <p>{personne.name}</p>
            <p>{personne.firstname}</p>
            <p>{personne.email}</p>
            <pre>
                {JSON.stringify(personne.entreprise, null, 2)}
            </pre>
            <p>{personne.RH}</p>
        </div> 
    )
}