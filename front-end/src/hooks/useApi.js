import { useState } from "react";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export function useApi(apiFn, { enableToast = false } = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const request = async (...args) => {
    setIsLoading(true);

    try {
      const response = await apiFn(...args);
      setData(response);
      if (enableToast) toast.success("Operation successful");
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  return { request, isLoading, data };
}
