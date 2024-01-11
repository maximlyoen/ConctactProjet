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

    const handleBack = () => {
        navigate("/entreprises");
    }
    
    useEffect(() => {
        if (!token) navigate("/");
    
        const fetchData = async () => {
          try {
            const entr = await fetch(`http://185.212.227.8:3002/api/entreprises/${id}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    },
                  });
            const entreprise: TEntreprise = await entr.json();
            setEntreprise(entreprise);
            const pers = await fetch(`http://185.212.227.8:3002/api/entreprises/${id}/contacts`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    },
                  });
            const personnes: TPersonne[] = await pers.json();
            setPersonnes(personnes);
            console.log(personnes)
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
            <Header/>
            {loading && (
                <div>Loading...</div>
            )}

            {error && (
                <div>Error!</div>
            )}
            {entreprise &&
                (<div className="flex justify-between">
                    <button className="w-25 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 m-2 rounded" onClick={handleBack}>Retour</button>
                    <h1 className="text-5xl font-bold">{entreprise.NOM}</h1>
                    <div className="m-2">
                        <LoadingImage imageUrl={entreprise.IMAGE} />
                    </div>
                </div>)
            }
            {
                personnes && (
                    <div>
                      <h2 className="text-3xl font-bold mb-5">Contacts:</h2>
                      {personnes.map((personne) => (
                        <div key={personne.ID_CONTACTS}>
                            <div className="flex">
                                <p className="font-bold mr-1">Nom : </p>
                                <p>{personne.NOM} {personne.PRENOM}</p>
                            </div>
                            <div className="flex">
                                <p className="font-bold mr-1">Email : </p>
                                <p>{personne.MAIL}</p>
                            </div>
                            {personne.MOBILE != "null" &&
                                <div className="flex">
                                    <p className="font-bold mr-1">Téléphone : </p>
                                    <p>{personne.MOBILE}</p>
                                </div>
                            }
                          <hr className="my-2" />
                        </div>
                      ))}
                    </div>
                  )
            }
        </div>
    );
}