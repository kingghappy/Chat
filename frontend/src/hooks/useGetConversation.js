import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConverstions = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data)
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    getConverstions();
  }, []);

  return { conversations, loading };
};

export default useGetConversation;
