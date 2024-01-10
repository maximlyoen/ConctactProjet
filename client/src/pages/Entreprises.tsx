import { Header, EntrepriseList } from "../components";
import { TEntreprise } from "../types";
import { useState, useEffect } from 'react';
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

  if (!token) navigate("/");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://185.212.227.8:3002/api/entreprises/");
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

  return (
    <div>
      <Header />

      <div className="flex justify-end p-4">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      {loading && <div>Loading...</div>}

      {error && <div>Error!</div>}

      <div className="flex justify-center">
        {filteredResponse && <EntrepriseList entreprises={filteredResponse} />}
      </div>
    </div>
  );
};