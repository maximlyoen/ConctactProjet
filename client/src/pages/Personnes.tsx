import { Header } from "../components";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Personnes = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) navigate("/");
    }, []);

    return (
        <div>
            <Header />
            <h1>Personnes</h1>
        </div>
    );
}