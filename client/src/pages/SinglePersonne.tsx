
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

  useEffect(() => {
    if (!token) navigate("/");

    const fetchData = async () => {
      try {
        const res = await axios.get<TPersonne>(`http://185.212.227.8:3002/api/contacts/${id}`);
        const personne: TPersonne = res.data;
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
      <style>{`
        .snowfall {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          width: 100%;
          height: 100%;
          z-index: 9999;
        }

        .snowflake {
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: #fff;
          border-radius: 50%;
          animation: fall linear infinite, drift linear infinite;
        }

        @keyframes fall {
          0% {
            transform: translateY(-10vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        @keyframes drift {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
          }
        }
      `}</style>

      <Header />
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {/* Ajouter la neige conditionnellement */}
      {id === '390' && (
        <div className="snowfall">
          {Array.from({ length: 50 }).map((_, index) => (
            <div className="snowflake" key={index} />
          ))}
        </div>
      )}

      <div className="flex justify-center">
        {personne && <PersonneProfil personne={personne} />}
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 m-2 rounded" onClick={() => navigate('/personnes')}>
        Back
      </button>
    </div>
  );
};