import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import type { RequestOptions } from "../types/api.types";
import { API_BASE_URL } from "../utils/constants";

interface UseApiReturn {
  request: <T>(url: string, options?: RequestOptions) => Promise<T>;
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useApi = (): UseApiReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}${url}`, {
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
          ...options,
        });

        const data = await response.json();

        if (!response.ok) {
          const errorMessage = data.message || "Something went wrong";
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }

        return data as T;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { request, loading, error, setError };
};
