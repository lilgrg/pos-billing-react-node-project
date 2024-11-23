import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null);        // Store fetched data
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);      // Track error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);  // Store the fetched data
      } catch (err) {
        setError(err.message);  // Handle errors
      } finally {
        setLoading(false);  // Once fetching is complete, set loading to false
      }
    };

    fetchData();  // Call fetchData on component mount

  }, [url]);  // Re-run the effect when URL changes

  return { data, loading, error };
};