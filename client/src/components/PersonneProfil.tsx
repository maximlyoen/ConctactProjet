import { TPersonne } from "../types";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export const PersonneProfil = ({ personne }: { personne: TPersonne }) => {
  const [tags, setTags] = useState<any | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      let id = personne.ID_CONTACTS;
      const pers = await fetch(`http://185.212.227.8:3002/api/contacts/${id}/tags`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const tags = await pers.json();
      setTags(tags);
    };

    fetchData();
  }, []);

  // Fonction pour anonymiser le nom et prénom
  const anonymizeName = (name: string): string => {
    // Ici, vous pouvez implémenter la logique de remplacement par une valeur anonyme
    name = "Anonyme name";
    return name;
  };

  // Fonction pour anonymiser le mail
  const anonymizeMail = (mail: string): string => {
    // Ici, vous pouvez implémenter la logique de remplacement par une valeur anonyme
    mail = "Anonyle email";
    return mail;
  };

  // Fonction pour anonymiser le nom de l'entreprise
  const anonymizeCompanyName = (companyName: string): string => {
    // Ici, vous pouvez implémenter la logique de remplacement par une valeur anonyme
    companyName = "Entreprise Anonyme";
    return companyName;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col bg-gray-200 rounded-lg shadow-lg p-6 m-4 min-w-[400px] w-1/3 items-center">
        <p>{anonymizeName(personne.NOM)} {anonymizeName(personne.PRENOM)}</p>
        <p>{anonymizeMail(personne.MAIL)}</p>
        <p>{anonymizeCompanyName(personne.NOM_ENTREPRISE)}</p>

        {personne.RH === 1 ? (
          <div className="bg-red-500 text-white font-bold px-4 py-2 m-2 h-10 rounded w-auto">
            Contact RH
          </div>
        ) : (
          <p></p>
        )}
      </div>

      <div className="flex flex-row">
        {tags &&
          tags.map((tag: any) => (
            <div>
              {tag.ID_TAG !== null && (
                <div className="bg-gray-500 text-white font-bold px-4 py-2 m-2 h-auto rounded">
                  {/* {JSON.stringify(tag)} */}
                  <p>{tag.TAG_NOM_TAG}</p>
                  {tag.ID_TAG == 3 && tag.TAG_PRIX_TA !== null && (
                    <p>{tag.TAG_PRIX_TA} €</p>
                  )}
                  {tag.ANNEE != 0 ? (
                    <p>{tag.ANNEE}</p>
                  ) : (
                    <p>Année inconnue</p>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
