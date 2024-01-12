import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header, LoadingImage } from "../components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { TEntreprise, TPersonne } from "../types";

export const SingleEntreprise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [entreprise, setEntreprise] = useState<TEntreprise | null>(null);
  const [personnes, setPersonnes] = useState<TPersonne[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [contactTags, setContactTags] = useState<any[] | null>(null);

  const handleBack = () => {
    navigate("/entreprises");
  };

  const handleClick = (id: number) => {
    navigate(`/personne/${id}`);
  };

  // Fonction pour anonymiser le nom et prénom
  const anonymizeName = (name: string): string => {
    // Ici, vous pouvez implémenter la logique de remplacement par une valeur anonyme
    name = "Anonyme name";
    return name;
  };

  // Fonction pour anonymiser le mail
  const anonymizeMail = (mail: string): string => {
    // Ici, vous pouvez implémenter la logique de remplacement par une valeur anonyme
    mail = "Anonyme email";
    return mail;
  };

  // Fonction pour anonymiser le nom de l'entreprise
  const anonymizeCompanyName = (companyName: string): string => {
    // Ici, vous pouvez implémenter la logique de remplacement par une valeur anonyme
    companyName = "Entreprise Anonyme";
    return companyName;
  };

  useEffect(() => {
    if (!token) navigate("/");

    const fetchData = async () => {
      try {
        // Fetch entreprise details
        const entr = await fetch(`http://185.212.227.8:3002/api/entreprises/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const entreprise: TEntreprise = await entr.json();
        setEntreprise(entreprise);

        // Fetch contacts of the entreprise
        const pers = await fetch(`http://185.212.227.8:3002/api/entreprises/${id}/contacts`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const personnes: TPersonne[] = await pers.json();
        setPersonnes(personnes);

        // Fetch tags for each contact
        const tagsPromises = personnes.map(async (personne) => {
          const tagsResponse = await fetch(`http://185.212.227.8:3002/api/contacts/${personne.ID_CONTACTS}/tags`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const tags = await tagsResponse.json();
          return { contactId: personne.ID_CONTACTS, tags };
        });

        const contactTags = await Promise.all(tagsPromises);
        setContactTags(contactTags);

        setLoading(false);
      } catch (error) {
        setError("Error fetching entreprise");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      {loading && <div>Loading...</div>}
      {error && <div>Error!</div>}
      {entreprise && (
        <div className="flex justify-between">
          <button
            className="w-25 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 m-2 rounded"
            onClick={handleBack}
          >
            Retour
          </button>
          <h1 className="text-5xl font-bold">{anonymizeCompanyName(entreprise.NOM)}</h1>
          <div className="w-28 h-28 m-2">
            <LoadingImage imageUrl={entreprise.IMAGE} />
          </div>
        </div>
      )}
      {personnes && (
        <div>
          <h2 className="text-3xl font-bold mb-5">Contacts:</h2>
          {personnes.map((personne) => (
            <div key={personne.ID_CONTACTS}>
              <div className="flex">
                <p className="font-bold mr-1">Nom : </p>
                <p onClick={() => handleClick(personne.ID_CONTACTS)}>
                  {anonymizeName(personne.NOM)} {anonymizeName(personne.PRENOM)}
                </p>
              </div>
              <div className="flex">
                <p className="font-bold mr-1">Email : </p>
                <p>{anonymizeMail(personne.MAIL)}</p>
              </div>
              {personne.MOBILE !== "null" && (
                <div className="flex">
                  <p className="font-bold mr-1">Téléphone : </p>
                  <p>{personne.MOBILE}</p>
                </div>
              )}

              {contactTags &&
                contactTags
                  .filter((tagInfo) => tagInfo.contactId === personne.ID_CONTACTS)
                  .map((tagInfo) => (
                    <div key={tagInfo.contactId} className="flex">
                      <div className="flex">
                        {tagInfo.tags.map((tag: any) => (
                          <div>
                            {tag.ID_TAG !== null && (
                              <div
                                key={tag.ID_TAG}
                                className="bg-gray-500 text-white font-bold py-2 m-2 h-auto rounded"
                              >
                                <p className="mr-2 ml-2">{tag.TAG_NOM_TAG}</p>
                                {tag.ID_TAG === 3 && tag.TAG_PRIX_TA !== null && (
                                  <p className="mr-2 ml-2">{tag.TAG_PRIX_TA} €</p>
                                )}
                                {tag.ANNEE !== 0 ? (
                                  <p className="mr-2 ml-2">{tag.ANNEE}</p>
                                ) : (
                                  <p className="mr-2 ml-2">Année inconnue</p>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              <hr className="my-2" />
            </div>
          ))}
          <h2 className="text-3xl font-bold mb-5">Evénements:</h2>
        </div>
      )}
    </div>
  );
};
