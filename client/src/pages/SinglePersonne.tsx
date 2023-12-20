import { useParams } from "react-router-dom";

export const SinglePersonne = () => {
  // Extract the id parameter from the URL
  const { id } = useParams();

  return (
    <div>
      <h1>SinglePersonne</h1>
      <p>ID: {id}</p>
    </div>
  );
};
