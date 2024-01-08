import { Header, PersonneProfil } from "../components/";
import { useParams } from "react-router-dom";
import { TPersonne } from "../types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

export const SinglePersonne = () => {
  const [personne, setPersonne] = useState<TPersonne | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  type ApiResponse = {
    result: TPersonne;
  };

  useEffect(() => {
    if (!token) navigate("/");

    const fetchData = async () => {
      try {
        const res = await axios.get<ApiResponse>(`http://localhost:3000/api/personnes/${id}`);
        const data = res.data;
        const personne: TPersonne = data.result;
        setPersonne(personne);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
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
          <div>{error}</div>
        )}
          <div className="flex justify-center">
              {personne && <PersonneProfil personne={personne} />}
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 m-2 rounded" onClick={() => navigate('/personnes')}>Back</button>
      </div>
  );
};
