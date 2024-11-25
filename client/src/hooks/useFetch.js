import { useState, useEffect } from "react";
import axios from "axios";
export const useFetch = (
  url,
  defaultData = [],
  errorMessage = "Error fetching data",
) => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);

        const json = await response.data;
        await new Promise((resolve) => setTimeout(resolve, 500));
        setData(json);

        setError(null);
      } catch (error) {
        setError({ message: `${error.message} \n ${errorMessage}` });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, errorMessage, triggerRefresh]);

  return { data, loading, error, setData,setTriggerRefresh, setError };
};
