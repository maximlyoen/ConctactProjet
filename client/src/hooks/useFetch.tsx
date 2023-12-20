import { useState, useEffect } from "react";

const useFetch = (url: string) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      type NewType = any;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setResponse(data);
      } catch (err: NewType) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { response, loading, error };
};

export default useFetch;