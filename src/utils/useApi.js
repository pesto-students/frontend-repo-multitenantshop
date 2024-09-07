import axios from "axios";
import { useState } from "react";
import { notifyError, notifySuccess } from "./utils";

const useApi = (method) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const executeApiCall = async (url, body = null, headers = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        method,
        url,
        data: body,
        headers: headers,
      });
      setData(response?.data?.data);
      return response?.data?.data;
    } catch (err) {
      notifyError(
        err?.response?.data?.message || "Unable to reach to the server"
      );
      setError(err?.response?.data?.message || "Unable to reach to the server");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, executeApiCall };
};

export default useApi;
