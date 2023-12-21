import { useAuth } from "../hooks/useAuth";
import { IoIosContacts } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import * as dotenv from 'dotenv';

var jwt = require('jsonwebtoken');
dotenv.config();

export const Header = () => {
    const { token, login, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        // Assuming you get the JWT token from some authentication process

        // TODO : Gérer le CAS et récupérer l'utilisateur pour le passer en paramètre dans la fonction login
        
        login(); 
    };

    const handleLogout = () => {
        window.location.reload();
        logout();
    };

    const handleEntreprises = () => {
        jwt.verify(token, process.env.APP_SECRET, (err: any) => {
            if (err) {
                navigate("/");
            }
            else {
                navigate("/entreprises");
            }
        });

        // if (token) navigate("/entreprises");
        // if (!token) navigate("/");
    }

    const handlePersonnes = () => {
        jwt.verify(token, process.env.APP_SECRET, (err : any) => {
            if (err) {
                navigate("/");
            }
            else {
                navigate("/personnes");
            }
        });
        // if (token) navigate("/personnes");
        // if (!token) navigate("/");
    }

    return (
        <header className="bg-dark text-white py-8 px-16 h-[60px] flex justify-center items-center">
        <NavLink to="/">
            <IoIosContacts className="text-4xl" />
        </NavLink>
        <button className="font-bold text-navlink hover:text-white px-1" onClick={handleEntreprises}>Entreprises</button>
        <button className="font-bold text-navlink hover:text-white px-1" onClick={handlePersonnes}>Personnes</button>
        <div>
            {token ? 
            (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 m-2 rounded" onClick={handleLogout}>Logout</button>
            ) : 
            (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 m-2 rounded"onClick={handleLogin}>Login</button>
            )}
        </div>
    </header>
    )
}
