import { Header, EntrepriseCard } from '../components/';
import { useState, useEffect } from 'react';

export const App = () => {
  type Entreprise = {
    id: number;
    name: string;
    logo: string;
  };

  type ApiResponse = {
    entreprises: Entreprise[];
  };

  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/entreprises');
        const data = await res.json();
        setResponse(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <Header />
        <h1>Posts</h1>

        {loading && (
          <div>Loading...</div>
        )}

        {error && (
          <div>Error!</div>
        )}
        
        <ul>
          {response && response.entreprises.map((entreprise: Entreprise) => (
            <EntrepriseCard key={entreprise.id} entreprise={entreprise} />
          ))}
        </ul>
      </div>
    </>
  );
};
