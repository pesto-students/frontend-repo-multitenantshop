import useApi from "./useApi";

export const useGet = () => {
  return useApi("GET");
};

export const usePost = () => {
  return useApi("POST");
};

export const usePut = () => {
  return useApi("PUT");
};

export const useDelete = () => {
  return useApi("DELETE");
};
