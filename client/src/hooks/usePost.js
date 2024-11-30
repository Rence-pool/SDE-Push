import { useState } from "react";
import axios from "axios";

export const usePost = (url, defaultData = []) => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (newData) => {
    try {
      setLoading(true);
      const response = await axios.post(url, newData);
  await new Promise((resolve) => setTimeout(resolve, 500));
      setData(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log("Error", error);
      const { message, error: serverError } = error.response.data;
      setError({ message: `${serverError} \n ${message}` });
      setLoading(false);
    }
  };
  return {
    data,
    loading,
    error,
    postData,
  };
};
