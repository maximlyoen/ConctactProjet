import { Header } from "../components"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TEntreprise, TPersonne } from "../types";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

export const EditPersonne = () => {

    type FormDataEdirPersonne = {
        ID_ENTREPRISE: number | undefined;
        NOM: string | undefined;
        PRENOM: string | undefined;
        MAIL: string | undefined;
        MOBILE: string | undefined;
        DESCRIPTION: string | undefined;
        RH: number | undefined;
    };

    const [personne, setPersonne] = useState<TPersonne>();
    const [entreprises, setEntreprises] = useState<TEntreprise[]>([]);
    const [idEntreprise, setIdEntreprise] = useState<number>();

    const [error, setError] = useState<string | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState("");
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const filteredEntreprises = entreprises.filter((entreprise) =>
        entreprise.NOM.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [formData, setFormData] = useState<FormDataEdirPersonne>({
        ID_ENTREPRISE: 0,
        MAIL: "",
        MOBILE: "",
        NOM: "",
        PRENOM: "",
        DESCRIPTION: "",
        RH: 0,
    });

    useEffect(() => {
        if (!id) {
            navigate("/");
        }
        if (isNaN(Number(id))) {
            navigate("/");
        }
    }, [id]);

    useEffect(() => {
        if (!token) navigate("/");

        const fetchData = async () => {
            try {
                const res = await axios.get<TPersonne>(`http://185.212.227.8:3002/api/contacts/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
                const personne: TPersonne = res.data;
                console.log(personne)
                setPersonne(personne);
                formData.DESCRIPTION = personne.DESCRIPTION;
                formData.MAIL = personne.MAIL;
                formData.MOBILE = personne.MOBILE;
                formData.NOM = personne.NOM;
                formData.PRENOM = personne.PRENOM;
                formData.RH = personne.RH;

            } catch (error) {
                setError("Error fetching data");
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchEntreprises = async () => {
            try {
                const response = await fetch("http://185.212.227.8:3002/api/entreprises", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                })
                const data: TEntreprise[] = await response.json();
                setEntreprises(data);
            } catch (error) {
                console.error("Error fetching entreprises:", error);
            }
        };

        fetchEntreprises();
    }, []);

    // useEffect(() => {
    //     const fetchEntrepriseId = async () => {
    //         try {
    //             const response = await fetch(`http://185.212.227.8:3002/api/entreprises/id/2`, {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer ${token}`,
    //                 },

    //             })
    //             const data: TEntreprise = await response.json();
    //             // setIdEntreprise(data.ID_ENTREPRISE);
    //             console.log("id entreprise")
    //             console.log(data.NOM)
    //             // formData.ID_ENTREPRISE = data.ID_ENTREPRISE;
    //         } catch (error) {
    //             console.error("Error fetching entreprises:", error);
    //         }
    //     };
    //     fetchEntrepriseId();
    // }, []);

    

    console.log(formData)

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



    return (
        <div>
            <Header />

            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Informations du contact</h2>
                {
                    <>
                        <div className="mb-4 p-4 border border-gray-300 rounded-md flex justify-around">
                            <p className="text-2xl font-bold text-gray-600">
                                {personne?.NOM} {personne?.PRENOM}
                            </p>
                            <p className="text-sm font-bold text-gray-600 m-2">{personne?.MAIL}</p>
                            <p className="text-sm font-bold text-gray-600 m-2">{personne?.MOBILE === "null" ? "telephone inconnu" : personne?.MOBILE}</p>
                            <p className="text-sm font-bold text-gray-600 m-2">{personne?.NOM_ENTREPRISE}</p>
                            <div className="bg-green-200 flex items-center rounded-md">
                                <p className="text-sm font-bold text-gray-600 m-2">{personne?.RH == 0 ? "utilisateur" : "administrateur"}</p>
                            </div>
                        </div>
                        <div className="mb-4 p-4 border border-gray-300 rounded-md flex flex-col">
                            <p className="text-xl font-bold text-gray-600">Description</p>
                            <p className=" text-gray-600">{personne?.DESCRIPTION === "null" ? "Pas de description" : personne?.DESCRIPTION}</p>
                        </div>
                    </>
                }
                <h2 className="text-2xl font-bold mb-4" id="ajouterUtilisateur">Modifier</h2>
                <form className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nom:</label>
                        <input
                            type="text"
                            name="NOM"
                            value={formData.NOM}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-gray-800"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Prénom:</label>
                        <input
                            type="text"
                            name="PRENOM"
                            value={formData.PRENOM}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-gray-800"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="MAIL"
                            value={formData.MAIL}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-gray-800"
                            required
                        />
                    </div>
                    {/* Ajoutez d'autres champs ici en fonction de vos besoins */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                        <input
                            type="phone"
                            name="MOBILE"
                            value={formData.MOBILE}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-gray-800"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Entreprise:</label>
                        <input
                            type="text"
                            placeholder="Rechercher une entreprise..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-gray-800"
                        />
                        <select
                            name="ID_ENTREPRISE"
                            value={formData.ID_ENTREPRISE}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-gray-800"
                        >
                            <option value="">Sélectionnez une entreprise</option>
                            {filteredEntreprises.map((entreprise: TEntreprise) => (
                                <option key={entreprise.ID_ENTREPRISE} value={entreprise.ID_ENTREPRISE}>
                                    {entreprise.NOM}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <input
                            type="text"
                            name="description"
                            //   value={formData.pwd}
                            //   onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-gray-800"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Admin:</label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input
                                type="checkbox"
                                name="role"
                                id="toggleAdmin"
                            // className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer ${
                            //   formData.role === "admin" ? "border-blue-500 bg-blue-500" : "border-gray-300"
                            // }`}
                            // onChange={handleToggleAdmin}
                            />
                            <label
                                htmlFor="toggleAdmin"
                            // className={`toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer 
                            // ${ formData.role === "admin" ? "bg-blue-500" : ""
                            // }`}
                            ></label>
                        </div>
                        {/* {formData.role === "admin" ? "Activé" : "Désactivé"} */}
                    </div>
                    <button
                        type="button"
                        // onClick={handleModifierUtilisateur}
                        className="col-span-2 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Modifier le contact
                    </button>
                </form>
            </div>
        </div>
    );
};