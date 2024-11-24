import { useState } from "react";
import axios from "axios";
export const useUpdate = (initialValue, urlTemplate) => {
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const updateValue = async (newValue) => {
    try {
      const url = `${urlTemplate}${newValue.id}`;
      setLoading(true);
      setError(null);
      const response = await axios.put(url, newValue);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setData(response.data);
      setError(null);
    } catch (error) {
      const { error: serverError } = error.response.data;
      setError({ message: `${serverError} \n ${error.message}` });
    } finally {
      setLoading(false);
    }
  };
  return {
    data,
    updateValue,
    error,
    setError,
    loading,
  };
};
