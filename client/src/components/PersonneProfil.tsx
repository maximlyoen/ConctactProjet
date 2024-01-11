import { TPersonne } from "../types"
import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth";

export const PersonneProfil = ({ personne } : {personne: TPersonne}) => {

    const [tags, setTags] = useState<any | null>(null);

    const { token} = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            let id = personne.ID_CONTACTS;
            const pers = await fetch(`http://185.212.227.8:3002/api/contacts/${id}/tags`, { 
                method: "get",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const tags = await pers.json();
            setTags(tags);
        }

        fetchData();
    }
    , [])

    return (    
        <div className="flex flex-col items-center">
            <div className="flex flex-col bg-gray-200 rounded-lg shadow-lg p-6 m-4 min-w-[400px] overflow-scroll w-1/3 items-center">
                <p>{personne.NOM} {personne.PRENOM}</p>
                <p>{personne.MAIL}</p>
                <p>{personne.NOM_ENTREPRISE}</p>
            
                {personne.RH === 1 ? (
                    <div className="bg-red-500 text-white font-bold px-4 py-2 m-2 h-10 rounded w-auto">
                        Contact RH
                    </div>): (<p></p>)}
            </div>
            
            <div className="flex flex-row">
                {tags && tags.map((tag: any) => (
                    <div className="bg-gray-500 text-white font-bold px-4 py-2 m-2 h-auto rounded">
                        {/* {JSON.stringify(tag)} */}
                        <p>{tag.TAG_NOM_TAG}</p>
                        {tag.ID_TAG == 3 ? (
                            <p>{tag.TAG_PRIX_TA} €</p>) : (<p></p>)}
                        {tag.ANNEE != 0 ? (
                            <p>{tag.ANNEE}</p>): (<p>Année inconnue</p>)}
                    </div>))}
            </div>
        </div> 
    )
}
