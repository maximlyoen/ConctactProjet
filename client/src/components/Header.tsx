import { useAuth } from "../hooks/useAuth";
import { IoIosContacts } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";

export const Header = () => {
    const { token, login, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        // Assuming you get the JWT token from some authentication process
        const jwtToken = 'your_jwt_token_here';
        login(jwtToken);
    };

    const handleLogout = () => {
        logout();
    };

    const handleEntreprises = () => {
        if (token) navigate("/entreprises");
        if (!token) navigate("/");
    }

    const handlePersonnes = () => {
        if (token) navigate("/personnes");
        if (!token) navigate("/");
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
