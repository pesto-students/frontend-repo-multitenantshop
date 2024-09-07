import { Bounce, toast } from "react-toastify";

export const notifyError = (message) => {
  toast.error(message, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    theme: "dark",
    transition: Bounce,
  });
};

export const notifySuccess = (message) => {
  toast.success(message, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    theme: "dark",
    transition: Bounce,
  });
};
