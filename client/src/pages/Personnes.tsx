import { Header } from "../components";
import { TPersonne } from "../types";
import { useState, useEffect } from "react";
import { PersonneList } from "../components/PersonneList";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Personnes = () => {
  const [response, setResponse] = useState<TPersonne[] | null>(null);
  const [filteredResponse, setFilteredResponse] = useState<TPersonne[] | null>(null);
  const  [taxe, setTaxe] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<TPersonne[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { token } = useAuth();
  const navigate = useNavigate();

  if (!token) navigate("/");

  const downloadCSV = () => {
    if (filteredResponse) {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        "Nom,Prénom,Email\n" +
        filteredResponse
          .map(
            (personne) =>
              `${personne.NOM},${personne.PRENOM},${personne.MAIL}`
          )
          .join("\n");

      const encodedURI = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedURI);
      link.setAttribute("download", "personnes.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      filteredData && console.log(filteredData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://185.212.227.8:3002/api/contacts/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
          });
        const data: TPersonne[] = await res.json();
        setResponse(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (response) {
      const filteredData = response.filter((personne) =>
        personne.NOM.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResponse(filteredData);
    }
  }, [searchTerm, response]);

  useEffect(() => {
    if (response) {
      if (taxe) {
        setFilteredData(response.filter(personne => personne));
      } else {
        setFilteredData(response);
      }
    }
  } , [taxe]);
  
  const handlePersonnes = () => {
    navigate("/createcontact");
  }

  return (
    <div>
      <Header />

      <div>
        <label>
          Taxe d'apprentissage
          <input type="checkbox" checked={taxe} onChange={() => setTaxe(!taxe)} />
        </label>
        <label>
          Show Female
          <input type="checkbox" onChange={() => console.log("a")} />
        </label>
      </div>

      <div className="flex justify-end p-4">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-md m-5 h-8 p-3 bg-slate-100 border border-blue-500"
        />
        <button
          onClick={downloadCSV}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5 mt-3"
        >
          Télécharger CSV
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5 mt-3" onClick={handlePersonnes}>Créer Contact</button>
      </div>


      {loading && <div>Loading...</div>}

      {error && <div>Error!</div>}

      <div className="flex justify-center">
        {filteredResponse && <PersonneList personnes={filteredResponse} />}
      </div>
    </div>
  );
};