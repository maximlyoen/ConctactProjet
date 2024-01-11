import { Header, PersonneProfil } from "../components/";
import { useParams } from "react-router-dom";
import { TPersonne } from "../types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const SinglePersonne = () => {
  const [personne, setPersonne] = useState<TPersonne | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/");

    const fetchData = async () => {
      try {
        const res = await fetch(`http://185.212.227.8:3002/api/contacts/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const personne: TPersonne = await res.json();
        setPersonne(personne);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token, navigate]);

  return (
    <div>
      <Header />
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <div className="flex justify-center">
        {personne && <PersonneProfil personne={personne} />}
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 m-2 rounded" onClick={() => navigate('/personnes')}>
        Back
      </button>
    </div>
  );
};