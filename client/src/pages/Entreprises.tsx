import { useState, useEffect } from "react";
import { Header, EntrepriseList } from "../components";
import { TEntreprise } from "../types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Entreprises = () => {
  const [response, setResponse] = useState<TEntreprise[] | null>(null);
  const [filteredResponse, setFilteredResponse] = useState<TEntreprise[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/");
    const fetchData = async () => {
      try {
        const res = await fetch("http://185.212.227.8:3002/api/entreprises/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
          });
        const data: TEntreprise[] = await res.json();
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
      const filteredData = response.filter((entreprise) =>
        entreprise.NOM.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResponse(filteredData);
    }
  }, [searchTerm, response]);

  const handleCreateEntreprise = () => {
    navigate("/createentreprise");
  };

  return (
    <div>
      <Header />

      <div className="flex justify-end p-4">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(typeof e.target.value === 'string' ? e.target.value : '')}
          className="p-2 border border-gray-300 rounded-md"
        />
        <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCreateEntreprise}>Créer Contact</button>
      </div>

      {loading && <div>Loading...</div>}

      {error && <div>Error!</div>}

      <div className="flex justify-center">
        {filteredResponse && <EntrepriseList entreprises={filteredResponse} />}
      </div>
    </div>
  );
};
