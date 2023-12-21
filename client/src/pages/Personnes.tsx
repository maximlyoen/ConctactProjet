import { Header } from "../components";
import { TPersonne } from "../types";
import { useState, useEffect } from "react";
import { PersonneList } from "../components/PersonneList";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Personnes = () => {

    type ApiResponse = {
        personnes: TPersonne[];
      };
    
      const [response, setResponse] = useState<ApiResponse | null>(null);
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);
      const { token } = useAuth();
      const navigate = useNavigate();


      if (!token) navigate("/");

      useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch('http://localhost:3000/api/personnes');
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
        {
            <div className="flex justify-center">
              { response && <PersonneList personnes={response} /> }
            </div>
        }
      </div>
    );
}