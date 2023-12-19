type Entreprise = {
    id: number;
    name: string;
    logo: string;
}

export const EntrepriseCard = ({ entreprise }: { entreprise: Entreprise }) => {
    return (
      <div
      className="w-[100px] my-4 p-2 bg-zinc-100 overflow-hidden hover:overflow-auto rounded-md flex flex-col justify-between items-center cursor-pointer border border-gray-700 hover:border-indigo-500"
    >
        <p>{entreprise.name}</p>
      </div>
    );
};
