import { useState, useEffect } from "react";
import useConversation from "../zustand/useConversation.js";
import { toast } from "react-hot-toast";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const getMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/message/${selectedConversation._id}`);
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setMessages(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages };
};

export default useGetMessage;
