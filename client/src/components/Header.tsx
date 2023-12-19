import { useAuth } from "../hooks/useAuth";

export const Header = () => {
    const { token, login, logout } = useAuth();

    const handleLogin = () => {
        // Assuming you get the JWT token from some authentication process
        const jwtToken = 'your_jwt_token_here';
        login(jwtToken);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="bg-dark text-white p-4 flex justify-between items-center">
        <div id="logo">
            <img src="icon.png" alt="Logo" className="h-8"/>
        </div>
        <nav className="flex">
            <a href="#" className="text-white hover:bg-gray-600 px-4 py-2">Contact</a>
            <a href="#" className="text-white hover:bg-gray-600 px-4 py-2">Entreprise</a>
            <a href="#" className="text-white hover:bg-gray-600 px-4 py-2">Récupération de mail</a>
            <a href="#" className="text-white hover:bg-gray-600 px-4 py-2">Nouvel Entreprise</a>
            <a href="#" className="text-white hover:bg-gray-600 px-4 py-2">Nouvel Contact</a>
        </nav>
        {token ? (
        <p>User is logged in. Token: {token}</p>
            ) : (
            <p>User is not logged in</p>
        )}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"onClick={handleLogin}>Login</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
    </header>
    )
}