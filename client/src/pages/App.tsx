import { Header } from "../components";
import { useAuth } from "../hooks/useAuth";

export const App = () => {
  const { token, login } = useAuth();

  const handleLogin = () => {
    const jwtToken = 'your_jwt_token_here';
    login(jwtToken);
  }

  return (
    <>
      <div>
        <Header />

        <h1>
          Bienvenue sur la page d'accueil mon ga connecte toi stp sinon t'as le droit à rien
        </h1>
        {!token && 
          (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 m-2 rounded" onClick={handleLogin}>Se connecter</button>
          )
          }
      </div>
    </>
  );
};
