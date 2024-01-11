import { Header } from "../components";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const App = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  }


  return (
    <>
      <div>
        <Header />
        <h1 className="font-bold text-4xl text-center">salu boss</h1>
        {!token && 
          (<>
            <h1>
              Page d'accueil connecte toi stp
            </h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 m-2 rounded" onClick={handleLogin}>Se connecter</button>
          </>
          )
          }
      </div>
    </>
  );
};
