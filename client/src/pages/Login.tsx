import { Header } from "../components"
import { useState } from "react";  
import { useAuth } from "../hooks/useAuth";


import { useNavigate } from "react-router-dom";


export const Login = () => {

    const { token, login } = useAuth();

    const [email, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleUserEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    

    const handleLogin = () => {


        const fetchToken = async () => {
            try {
            const res = await fetch('http://127.0.0.1:3000/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "email":email, "password":password }),
            
                });
                const data = await res.json();
                login(data.token);
                if (data.token != "" && data.token != undefined ) {
                    navigate("/");
                }

            } catch (error) {
                console.log(error);
            }
            
        };

        fetchToken();

    }


    return (
        <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Connexion</h2>
                <form>
                    <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1" htmlFor="email">
                        Email:
                    </label>
                    <input
                    type="text"
                    id="email"  
                    onChange={handleUserEmailChange}
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1" htmlFor="password">
                            Mot de passe:
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={handlePasswordChange}
                            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                        />
                    </div>
                    <button type="button" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    onClick={handleLogin}
                    >
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}