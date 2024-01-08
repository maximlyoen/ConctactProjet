import { Header } from "../components";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const App = () => {
  const { token, login } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const handleLogin = () => {
    const jwtToken = 'your_jwt_token_here';
    login(jwtToken);
  }

  useEffect(() => {
    if (!token) navigate("/");

    const fetchData = async () => {
      try {
        const res = await axios.get<any>(`http://185.212.227.8:3002/api/contacts/1`);  
        const data = res.data;
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
          {
            data && <pre>
              {JSON.stringify(data, null, 2)}
            </pre>
          }
      </div>
    </>
  );
};
