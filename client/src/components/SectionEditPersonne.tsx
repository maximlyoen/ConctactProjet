import { TPersonne } from "../types";

interface SectionEditPersonneProps {
    personne: TPersonne;
    nom: string;
    setNom: (nom: string) => void;
    prenom: string;
    setPrenom: (prenom: string) => void;
    description: string;
    setDescription: (description: string) => void;
    mail: string;
    setMail: (mail: string) => void;
    mobile: string;
    setMobile: (mobile: string) => void;
    entreprise: string;
    setEntreprise: (entreprise: string) => void;
    rh: number;
    setRh: (rh: number) => void;
}

export const SectionEditPersonne: React.FC<SectionEditPersonneProps> = ({
    personne,
    nom,
    setNom,
    prenom,
    setPrenom,
    description,
    setDescription,
    mail,
    setMail,
    mobile,
    setMobile,
    entreprise,
    setEntreprise,
    rh,
    setRh,
    }) => {
    return (
        <div>
        <div className="flex flex-col">
            <div className="flex flex-row">
            <div className="flex flex-col">
                <label htmlFor="nom">Nom</label>
                <input
                className="text-md font-bold text-gray-700 dark:text-slate-300"
                value={nom}
                onChange={(e) => {
                    setNom(e.target.value);
                }}
                placeholder={personne?.NOM}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="prenom">Prenom</label>
                <input
                className="text-md font-bold text-gray-700 dark:text-slate-300"
                value={prenom}
                onChange={(e) => {
                    setPrenom(e.target.value);
                }}
                placeholder={personne?.PRENOM}
                />
            </div>
            </div>
            <div className="flex flex-row">
            <div className="flex flex-col">
                <label htmlFor="description">Description</label>
                <input
                className="text-md font-bold text-gray-700 dark:text-slate-300"
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
                placeholder={personne?.DESCRIPTION}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="mail">Mail</label>
                <input
                className="text-md font-bold text-gray-700 dark:text-slate-300"
                value={mail}
                onChange={(e) => {
                    setMail(e.target.value);
                }}
                placeholder={personne?.MAIL}
                />
            </div>
            </div>
            <div className="flex flex-row">
            <div className="flex flex-col">
                <label htmlFor="mobile">Mobile</label>
                <input
                className="text-md font-bold text-gray-700 dark:text-slate-300"
                value={mobile}
                onChange={(e) => {
                    setMobile(e.target.value);
                }}
                placeholder={personne?.MOBILE}
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="entreprise">Entreprise</label>
                <input
                className="text-md font-bold text-gray-700 dark:text-slate-300"
                value={entreprise}
                onChange={(e) => {
                    setEntreprise(e.target.value);
                }}
                placeholder={personne?.NOM_ENTREPRISE}
                />
            </div>
            </div>
            <div className="flex flex-row">
            <div className="flex flex-col">
                <label htmlFor="rh">RH</label>
                <input
                className="text-md font-bold text-gray-700 dark:text-slate-300"
                value={rh}
                onChange={(e) => {
                    setRh(Number(e.target.value));
                }}
                placeholder={personne?.RH.toString()}
                />
            </div>
            </div>
        </div>
        </div>
    );

}

