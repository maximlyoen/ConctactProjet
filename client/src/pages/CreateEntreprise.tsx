import React, { useState} from "react";
import { Header } from "../components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const CreateContact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    NOM: "",
    IMAGE: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {token} = useAuth();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleAddEntreprise = async () => {
    try {
      const response = await fetch("http://185.212.227.8:3002/api/entreprise/add", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Entreprise ajouté avec succès!");
        // Rediriger vers la page des contacts après l'ajout
        navigate("/personnes");
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
        <h2 className="text-2xl font-bold mb-4">Ajouter un Entreprise</h2>
        <form className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nom:</label>
            <input
              type="text"
              name="NOM"
              value={formData.NOM}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-gray-800"
            />
          </div>
          {/* Ajoutez d'autres champs ici en fonction de vos besoins */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image en ligne .csv:</label>
            <input
              type="text"
              name="Code"
              value={formData.IMAGE}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-gray-800"
            />
          </div>
          <button
            type="button"
            onClick={handleAddEntreprise}
            className="col-span-2 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ajouter Contact
          </button>
          {successMessage && (
            <div className="col-span-2 mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
