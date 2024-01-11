import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { TUtilisateur } from "../types";
import { useAuth } from "../hooks/useAuth";

import { useLocation } from 'react-router-dom';


export const SingleUtilisateur = () => {
  
  const location = useLocation();
  const userid = location.pathname.split("/")[2];
  const userId = parseInt(userid);

  const { token, login } = useAuth();

  const [utilisateur, setUtilisateur] = useState<TUtilisateur>({id: userId, nom:"", prenom:"", email:"",  pwd:"", role:"utilisateur"});
  const [formData, setFormData] = useState({
    email:utilisateur.email, role:utilisateur.role, pwd:utilisateur.pwd
  });


  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/api/users/${utilisateur.id}`, {
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
                },
            });
        const data: TUtilisateur = await response.json();
        setUtilisateur(data[0] as TUtilisateur);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUtilisateurs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggleAdmin = () => {
    setFormData({ ...formData, role: formData.role === "utilisateur" ? "admin": "utilisateur" });
  };


  const handleModifierUtilisateur = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/users/mod/${utilisateur.id}`, {
        method: "PATCH",
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

  

  return (
    <div>
      <Header />
      
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Informations de l'utilisateur</h2>
        { 
                <div className="mb-4 p-4 border border-gray-300 rounded-md">
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
                  </div>
                </div>
              
        }
        <h2 className="text-2xl font-bold mb-4" id="ajouterUtilisateur">Modifier</h2>
        <form className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-gray-800"
              required
            />
          </div>
          {/* Ajoutez d'autres champs ici en fonction de vos besoins */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mot de Passe:</label>
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
            onClick={handleModifierUtilisateur}
            className="col-span-2 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Modifier l'utilisateur
          </button>
        </form>
      </div>
    </div>
  );
};