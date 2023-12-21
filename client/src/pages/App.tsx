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
