import { Header, SectionEditPersonne } from "../components"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TPersonne } from "../types";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

export const EditPersonne = () => {
    const [personne, setPersonne] = useState<TPersonne | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [nom, setNom] = useState<string>("");
    const [prenom, setPrenom] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [mail, setMail] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
    const [entreprise, setEntreprise] = useState<string>("");
    const [rh, setRh] = useState<number>(0);


    const [editMode, setEditMode] = useState<boolean>(false);
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            navigate("/");
        }
        if(isNaN(Number(id))) {
            navigate("/");
        }
    }, [id]);

    useEffect(() => {
        if (!token) navigate("/");
    
        const fetchData = async () => {
          try {
            const res = await axios.get<TPersonne>(`http://185.212.227.8:3002/api/contacts/${id}`);
            const personne: TPersonne = res.data;
            // console.log(personne)
            setPersonne(personne);
          } catch (error) {
            setError("Error fetching data");
          }
        };
    
        fetchData();
      }, []);

    return (
        <div>
            <Header />
            <h1>Edit Personne</h1>
            <p>{id}</p>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setEditMode(!editMode)}
            >
                Edit
            </button>

            {
                error && (
                    <p>{error}</p>
                )
            }
            
            {
                personne && (
                    <p>{JSON.stringify(personne)}</p>
                )
            }

        </div>
    )
}