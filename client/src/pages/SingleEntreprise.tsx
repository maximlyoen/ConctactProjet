import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header, LoadingImage } from "../components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { TEntreprise } from "../types";

export const SingleEntreprise = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    type ApiResponse = {
        entreprise: TEntreprise;
    };

    const handleBack = () => {
        navigate("/entreprises");
    }

    useEffect(() => {
        if (!token) navigate("/");
    
        const fetchData = async () => {
          try {
            const res = await fetch(`http://185.212.227.8:3002/api/entreprises/${id}/contacts`);
            const data: ApiResponse = await res.json();
            setData(data.entreprise);
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
            <Header/>
            {loading && (
                <div>Loading...</div>
            )}

            {error && (
                <div>Error!</div>
            )}
            {data &&
                (<div className="flex justify-center">
                    <h1 className="text-5xl font-bold">{data.name}</h1>
                    <LoadingImage imageUrl={data.logo} />
                </div>)
            }
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 m-2 rounded" onClick={handleBack}>Back</button>
        </div>
    );
}
