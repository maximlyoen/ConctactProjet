import { Header, EntrepriseList } from "../components";
import { TEntreprise } from "../types";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Entreprises = () => {

    const [response, setResponse] = useState<TEntreprise[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();
    const navigate = useNavigate();

    if (!token) navigate("/");

    useEffect(() => {
        const fetchData = async () => {
            try {
              const res = await fetch('http://185.212.227.8:3002/api/entreprises/');
              const data: TEntreprise[] = await res.json();
              setResponse(data);
              setLoading(false);
            } catch (error) {
              setError('Error fetching data');
              setLoading(false);
            }
        };

    fetchData();
    }, []);

    return (
        <div>
        <Header />

        {loading && (
          <div>Loading...</div>
        )}

        {error && (
          <div>Error!</div>
        )}
        {
          <div className="flex justify-center">
            { response && <EntrepriseList entreprises={response} /> }
          </div>
        }
      </div>
    );
}
