type Entreprise = {
    id: number;
    name: string;
    logo: string;
}

export const EntrepriseCard = ({ entreprise }: { entreprise: Entreprise }) => {
    return (
      <div>
        <p>{entreprise.name}</p>
        {/* You can access other properties of 'entreprise' here */}
      </div>
    );
};
