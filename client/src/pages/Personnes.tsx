import { Header } from "../components";
import { TPersonne } from "../types";
import { useState, useEffect } from "react";
import { PersonneList } from "../components/PersonneList";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Personnes = () => {
      const [response, setResponse] = useState<TPersonne[] | null>(null);
      const [filteredData, setFilteredData] = useState<TPersonne[] | null>(null);
      const [taxe, setTaxe] = useState<boolean>(false);
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);
      const { token } = useAuth();
      const navigate = useNavigate();

      if (!token) navigate("/");

      useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch('http://185.212.227.8:3002/api/contacts/');
            const data: TPersonne[] = await res.json();
            setResponse(data);
            setLoading(false);
          } catch (error) {
            setError('Error fetching data');
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

      useEffect(() => {
        if (response) {
          if (taxe) {
            setFilteredData(response.filter(personne => personne));
          } else {
            setFilteredData(response);
          }
        }
      }
      , [taxe]);

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
        {loading && (
          <div>Loading...</div>
        )}

        {error && (
          <div>Error!</div>
        )}
        {
            <div className="flex justify-center">
              { response && <PersonneList personnes={response} /> }
            </div>
        }
      </div>
    );
}
