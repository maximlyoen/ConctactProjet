import { Header } from "../components/Header";
import { useParams } from "react-router-dom";
import { TPersonne } from "../types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const SinglePersonne = () => {
  // Extract the id parameter from the URL
  const { id } = useParams();
  // Fetch the data from the API


  type ApiResponse = {
    personne: TPersonne;
  };

  const [personne, setPersonne] = useState<TPersonne | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/");

    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/personnes/${id}`);
        const data: ApiResponse = await res.json();
        setPersonne(data.personne);
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
          <div>Error!</div>
        )}
        {
            <div className="flex justify-center">
              {personne && 
              ( <>
                  <p className="text-7xl">{personne.name} {personne.firstname}</p>
                  <p>{personne.email}</p>
                </>
              )
              }
            </div>
        }
      </div>
  );
};
