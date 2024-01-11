import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { useNavigate, Link } from "react-router-dom";
import { TUtilisateur } from "../types";
import { useAuth } from "../hooks/useAuth";


export const Utilisateurs = () => {

  const navigate = useNavigate();
  
  const { token, login } = useAuth();

  if (!token) navigate("/");

  const [utilisateurs, setUtilisateurs] = useState<TUtilisateur[]>([]);
  const [filteredResponse, setFilteredResponse] = useState<TUtilisateur[] | null>([]);

  const [formData, setFormData] = useState({
    nom:"", prenom:"", email:"", role:"utilisateur", pwd:""
  });

  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/users/", {
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
                },
            });
        const data: TUtilisateur[] = await response.json();
        setUtilisateurs(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUtilisateurs();
  }, []);

  useEffect(() => {
    if (utilisateurs) {
      const filteredData = utilisateurs.filter((utilisateur) =>
        utilisateur.nom.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResponse(filteredData);
    }
  }, [searchTerm, utilisateurs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggleAdmin = () => {
    setFormData({ ...formData, role: formData.role === "utilisateur" ? "admin": "utilisateur" });
  };


  const handleAjouterUtilisateur = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/users/add", {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Erreur lors de l'ajout du contact");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const supprimerUtilisateur = async (id : number) => {
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/users/del/${id}`, {
          method: "delete",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
            window.location.reload();
        } else {
          console.error("Erreur lors de la suppression du contact");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

  return (
    <div>
      <Header />
      <div className="flex justify-between">
        <a href="#ajouterUtilisateur">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5 mt-3">
              Ajouter un utilisateur
          </button>
        </a>
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-md m-5 h-8 p-3 bg-slate-100 border border-blue-500"
        />
      </div>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Liste des utilisateurs</h2>
        { 
            filteredResponse.map((utilisateur, key) => (
                <div key={key} className="mb-4 p-4 border border-gray-300 rounded-md">
                  <div className="flex justify-between">
                    <div className="flex justify-between">
                        <div className="mr-5">
                            <p className="text-xl font-bold text-gray-600">
                                {utilisateur.nom} {utilisateur.prenom}
                            </p>
                            <p className="text-gray-600">{utilisateur.email}</p>
                        </div>
                        <div className="bg-green-200 flex items-center rounded-md">
                            <p className="text-sm font-bold text-gray-600 m-2">{utilisateur.role}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => navigate(`/utilisateurs/${utilisateur.id}`, { state: { utilisateur } })}
                      >
                        Modifier
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => supprimerUtilisateur(utilisateur.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))
              
        }
        <h2 className="text-2xl font-bold mb-4" id="ajouterUtilisateur">Ajouter un utilisateur</h2>
        <form className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nom:</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-gray-800"
            />
          </div>
          {/* Ajoutez d'autres champs ici en fonction de vos besoins */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Prénom:</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mot de passe:</label>
            <input
              type="password"
              name="pwd"
              value={formData.pwd}
              onChange={handleChange}
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
                className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer ${
                  formData.role === "admin" ? "border-blue-500 bg-blue-500" : "border-gray-300"
                }`}
                onChange={handleToggleAdmin}
              />
              <label
                htmlFor="toggleAdmin"
                className={`toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer ${
                  formData.role === "admin" ? "bg-blue-500" : ""
                }`}
              ></label>
            </div>
            {formData.role === "admin" ? "Activé" : "Désactivé"}
          </div>
          <button
            type="button"
            onClick={handleAjouterUtilisateur}
            className="col-span-2 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ajouter Utilisateur
          </button>
          
        </form>
      </div>
    </div>
  );
};