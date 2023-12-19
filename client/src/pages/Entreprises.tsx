import { Header } from "../components";
import { TEntreprise } from "../types";
import { useState, useEffect } from 'react';
import { EntrepriseCard } from "../components/";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Entreprises = () => {
    type ApiResponse = {
        entreprises: TEntreprise[];
      };
    
      const [response, setResponse] = useState<ApiResponse | null>(null);
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);
      const { token } = useAuth();
      const navigate = useNavigate();
    
      useEffect(() => {
        if (!token) navigate("/");

        const fetchData = async () => {
          try {
            const res = await fetch('http://localhost:3000/api/entreprises');
            const data = await res.json();
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

          {response && response.entreprises.map((entreprise: TEntreprise) => (
            <EntrepriseCard key={entreprise.id} entreprise={entreprise} />
          ))}
      </div>
    );
}