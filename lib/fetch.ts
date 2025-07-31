import { useState, useEffect, useCallback } from "react";

export const fetchAPI = async (
  url: string,
  options?: RequestInit,
  userId?: string
) => {
  try {
    // Add user ID to headers if provided
    const headers = {
      ...options?.headers,
      ...(userId && { "x-user-id": userId }),
    };

    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if response is JSON before parsing
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      // If not JSON, return the text content
      const text = await response.text();
      throw new Error(`Expected JSON but got: ${text.substring(0, 100)}...`);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    // Don't fetch if URL is empty
    if (!url || url.trim() === "") {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetchAPI(url, options);
      setData(result.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
