import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { useNavigate } from "react-router-dom";
import { TEntreprise } from "../types";
import { useAuth } from "../hooks/useAuth";

export const CreateContact = () => {
  const navigate = useNavigate();

  const [entreprises, setEntreprises] = useState<TEntreprise[]>([]);
  const [formData, setFormData] = useState({
    ID_ENTREPRISE: "",
    MAIL: "",
    MOBILE: "",
    NOM: "",
    PRENOM: "",
    DESCRIPTION: "",
    RH: 0,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {token} = useAuth();

  useEffect(() => {
    const fetchEntreprises = async () => {
      try {
        const response = await fetch("http://185.212.227.8:3002/api/entreprises", {
          method: "get",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggleRH = () => {
    setFormData({ ...formData, RH: formData.RH === 1 ? 0 : 1 });
  };

  const filteredEntreprises = entreprises.filter((entreprise) =>
    entreprise.NOM.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddContact = async () => {
    try {
      const response = await fetch("http://185.212.227.8:3002/api/contacts/add", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Contact ajouté avec succès!");
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
        <h2 className="text-2xl font-bold mb-4">Ajouter un Contact</h2>
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
            <label className="block text-sm font-medium text-gray-700">Prénom:</label>
            <input
              type="text"
              name="PRENOM"
              value={formData.PRENOM}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mobile:</label>
            <input
              type="text"
              name="MOBILE"
              value={formData.MOBILE}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mail:</label>
            <input
              type="text"
              name="MAIL"
              value={formData.MAIL}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description:</label>
            <input
              type="text"
              name="DESCRIPTION"
              value={formData.DESCRIPTION}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">RH:</label>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="RH"
                id="toggleRH"
                className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer ${
                  formData.RH === 1 ? "border-blue-500 bg-blue-500" : "border-gray-300"
                }`}
                onChange={handleToggleRH}
              />
              <label
                htmlFor="toggleRH"
                className={`toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer ${
                  formData.RH === 1 ? "bg-blue-500" : ""
                }`}
              ></label>
            </div>
            {formData.RH === 1 ? "Activé" : "Désactivé"}
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
          <button
            type="button"
            onClick={handleAddContact}
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
        {/* Démarrage pour le titre et le bouton Excel */}
        <div className="mt-8 border-b-2 pb-4">
            <h2 className="text-xl font-bold mb-4">Ajouter des contacts à partir d'un fichier Excel</h2>
            <div className="flex items-center space-x-4">
                <p>Téléchargez le modèle Excel ici :</p>
                <a
                href="/excel.ods"
                download
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                >
                Télécharger Excel
                </a>
            </div>
        </div>
      </div>
    </div>
  );
};
