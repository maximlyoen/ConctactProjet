import { Header } from '../components/';
import useFetch from '../hooks/useFetch';

export const App = () => {
  type Entreprise = {
    id: number;
    name: string;
    logo: string;
  }

  type Response = {
    entreprises: Entreprise[]
  }

  type ApiResponse = {
    response: Response | null;
    loading: boolean;
    error: Error | null;
  };

  const { response, loading, error }: ApiResponse = useFetch('http://localhost:3000/api/entreprises');

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <>
      <div>
        <Header />
        <h1>Posts</h1>
        <ul>
          {/*entreprises.map((entreprise: Entreprise) => (
            <EntrepriseCard key={entreprise.id} entreprise={entreprise} />
          ))*/}
          <pre>
            {JSON.stringify(response, null, 2)}
          </pre>
        </ul>
      </div>
    </>
  );
};
