import { useAuth } from "../hooks/useAuth";
import { IoIosContacts } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export const Header = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        window.location.reload();
        logout();
    };

    const handleEntreprises = () => {
        if (token) {
            navigate("/entreprises")
        }
        if (!token) {
            navigate("/")
            toast.error("Veuillez vous connecter pour accéder à cette page");
        }
    }

    const handlePersonnes = () => {
        if (token) {
            navigate("/personnes")
        }
        if (!token) {
            navigate("/")
            toast.error("Veuillez vous connecter pour accéder à cette page");
        }
    }

    const handleUtilisateurs = () => {
        if (token) {
            navigate("/utilisateurs")
        }
        if (!token) {
            navigate("/")
            toast.error("Veuillez vous connecter pour accéder à cette page");
        }
    }

    return (
        <header className="bg-dark text-white py-8 px-16 h-[60px] flex justify-center items-center">
        <NavLink to="/">
            <IoIosContacts className="text-4xl" />
        </NavLink>
        <button className="font-bold text-navlink hover:text-white px-1" onClick={handleEntreprises}>Entreprises</button>
        <button className="font-bold text-navlink hover:text-white px-1" onClick={handlePersonnes}>Personnes</button>
        <button className="font-bold text-navlink hover:text-white px-1" onClick={handleUtilisateurs}>Utilisateurs</button>

        <div>
            {token ? 
            (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 m-2 rounded" onClick={handleLogout}>Logout</button>
            ) : 
            (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 m-2 rounded"onClick={handleLogin}>Login</button>
            )}
        </div>
        <Toaster position="bottom-right"/>
    </header>
    )
}