import { useState, useEffect } from 'react'
import { EntrepriseCard, Header } from '../components/';

export const  App = () => {
  type Entreprise = {
    id: number;
    name: string;
    logo: string;
  }

  type EntrepriseResponse = {
    entreprises: Entreprise[];
  }

  const [entreprises, setEntreprises] = useState<Entreprise[]>([]);

  const fetchData = async () => {
    const response = await fetch('http://localhost:3000/api/entreprises');
    const data: EntrepriseResponse = await response.json();
    setEntreprises(data.entreprises);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        < Header />
        <h1>Posts</h1>
        <ul>
          {entreprises.map(entreprise => (
            <EntrepriseCard key={entreprise.id} entreprise={entreprise} />
          ))}
        </ul>
      </div>
    </>
  )
}
