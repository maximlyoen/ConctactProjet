import { Header } from "../components";
import { TPersonne } from "../types";
import { useState, useEffect } from "react";
import { PersonneList } from "../components/PersonneList";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Personnes = () => {
  const [response, setResponse] = useState<TPersonne[] | null>(null);
  const [filteredResponse, setFilteredResponse] = useState<TPersonne[] | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("none");
  const [selectedOption2, setSelectedOption2] = useState<string>("Any");
  const [filteredData, setFilteredData] = useState<TPersonne[] | null>(null);
  const [filteredData2, setFilteredData2] = useState<TPersonne[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { token } = useAuth();
  const navigate = useNavigate();

  const downloadCSV = () => {
    if (filteredData2) {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        "Nom,Prénom,Email\n" +
        filteredData2
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
    }
  };

  useEffect(() => {
    if (!token) navigate("/");
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
    if (filteredData2) {
      const temp = filteredData2.filter((personne) =>
        personne.NOM.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResponse(temp);
    } else {
      setFilteredResponse(response);
    }
  }, [searchTerm, filteredData2]);

  useEffect(() => {
    if (!response) return;
    if (selectedOption === "taxe") {
      setFilteredData(response.filter((personne) => {
        if (personne.TAGS) {
          return personne.TAGS.includes("TAXE APPPRENTISSAGE");
        }
      }));
    } else if (selectedOption === "matinee") {
      setFilteredData(response.filter((personne) => {
        if (personne.TAGS) {
          return personne.TAGS.includes("MATINÉE INNOV");
        }
      })); } else if (selectedOption === "perf") {
      setFilteredData(response.filter((personne) => {
        if (personne.TAGS) {
          return personne.TAGS.includes("CONSEIL PERF");
        }
      })); } else if (selectedOption === "forum") {
      setFilteredData(response.filter((personne) => {
        if (personne.TAGS) {
          return personne.TAGS.includes("FORUM DES STAGE");
        }
      })); } else if (selectedOption === "tuteur") {
      setFilteredData(response.filter((personne) => {
        if (personne.TAGS) {
          return personne.TAGS.includes("TUTEUR");
        }
      })); } else if (selectedOption === "vacataire") {
      setFilteredData(response.filter((personne) => {
        if (personne.TAGS) {
          return personne.TAGS.includes("VACATAIRE");
        }
      }));
    } else if (selectedOption === "none") {
      setFilteredData(response);
    } else {
      setFilteredData(response);
    }
  }, [selectedOption, response, filteredData]);


  useEffect(() => {
    if (!filteredData) return;
    if (selectedOption2 === "2019") {
      setFilteredData2(filteredData.filter((personne) => {
        if (personne.ANNEE) {
          return personne.ANNEE.includes("2019");
        }
      })); } else if (selectedOption2 === "2020") {
      setFilteredData2(filteredData.filter((personne) => {
        if (personne.ANNEE) {
          return personne.ANNEE.includes("2020");
        }
      })); }
      else if (selectedOption2 === "2021") {
      setFilteredData2(filteredData.filter((personne) => {
        if (personne.ANNEE) {
          return personne.ANNEE.includes("2021");
        }
      })); }
      else if (selectedOption2 === "2022") {
      setFilteredData2(filteredData.filter((personne) => {
        if (personne.ANNEE) {
          return personne.ANNEE.includes("2022");
        }
      })); }
      else if (selectedOption2 === "2023") {
      setFilteredData2(filteredData.filter((personne) => {
        if (personne.ANNEE) {
          return personne.ANNEE.includes("2023");
        }
      }));
    } else if (selectedOption2 === "any") {
      setFilteredData2(filteredData);
    } else {
      setFilteredData2(filteredData);
    }
  }
  , [selectedOption2, filteredData, filteredData2]);

  const handlePersonnes = () => {
    navigate("/createcontact");
  }

  return (
    <div>
      <Header />
      <div className="p-3">
        <form action="">
          <label>
              Aucun filtre
              <input
                type="radio"
                name="options"
                value="none"
                checked={selectedOption === "none"}
                onChange={() => setSelectedOption("none")}
              />
            </label>
            <label>
              Taxe d'apprentissage
              <input
                type="radio"
                name="options"
                value="taxe"
                checked={selectedOption === "taxe"}
                onChange={() => setSelectedOption("taxe")}
              />
            </label>
            <label>
              Matinée Innovation
              <input
                type="radio"
                name="options"
                value="matinee"
                checked={selectedOption === "matinee"}
                onChange={() => setSelectedOption("matinee")}
              />
            </label>
            <label>
              Conseil Perf
              <input
                type="radio"
                name="options"
                value="perf"
                checked={selectedOption === "perf"}
                onChange={() => setSelectedOption("perf")}
              />
            </label>
            <label>
              Forum des stages
              <input
                type="radio"
                name="options"
                value="forum"
                checked={selectedOption === "forum"}
                onChange={() => setSelectedOption("forum")}
              />
            </label>
            <label>
              Tuteur
              <input
                type="radio"
                name="options"
                value="tuteur"
                checked={selectedOption === "tuteur"}
                onChange={() => setSelectedOption("tuteur")}
              />
            </label>
            <label>
              Vacataire
              <input
                type="radio"
                name="options"
                value="vacataire"
                checked={selectedOption === "vacataire"}
                onChange={() => setSelectedOption("vacataire")}
              />
            </label>
          </form>
          <form action="">
              <label>
                Any
                <input
                  type="radio"
                  name="options"
                  value="any"
                  checked={selectedOption2 === "any"}
                  onChange={() => setSelectedOption2("any")}
                />
              </label>
              <label>
                2019
                <input
                  type="radio"
                  name="options"
                  value="2019"
                  checked={selectedOption2 === "2019"}
                  onChange={() => setSelectedOption2("2019")}
                />
              </label>
              <label>
                2020
                <input
                  type="radio"
                  name="options"
                  value="2020"
                  checked={selectedOption2 === "2020"}
                  onChange={() => setSelectedOption2("2020")}
                />
              </label>
              <label>
                2021
                <input
                  type="radio"
                  name="options"
                  value="2021"
                  checked={selectedOption2 === "2021"}
                  onChange={() => setSelectedOption2("2021")}
                />
              </label>
              <label>
                2022
                <input
                  type="radio"
                  name="options"
                  value="2022"
                  checked={selectedOption2 === "2022"}
                  onChange={() => setSelectedOption2("2022")}
                />
              </label>
              <label>
                2023
                <input
                  type="radio"
                  name="options"
                  value="2023"
                  checked={selectedOption2 === "2023"}
                  onChange={() => setSelectedOption2("2023")}
                />
              </label>
          </form>
        <p>Nombres de résultats : {filteredResponse && filteredResponse.length}</p>
      </div>

      <div className="flex justify-end p-4">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={downloadCSV}
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Télécharger CSV
        </button>
        <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePersonnes}>Créer Contact</button>
      </div>

      {loading && <div>Loading...</div>}

      {error && <div>Error!</div>}

      <div className="flex justify-center">
        {filteredResponse && <PersonneList personnes={filteredResponse} />}
      </div>
    </div>
  );
};