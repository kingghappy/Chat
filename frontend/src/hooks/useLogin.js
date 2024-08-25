import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (userName, password) => {
    const success = handleInputErrors(userName, password);
      if (!success) return;

    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("authUser", JSON.stringify(data));
      setAuthUser(data);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;

function handleInputErrors(userName, password) {
    if (!userName || !password ) {
      toast.error("Please fill all fields");
      return false;
    }
  
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
  
    return true;
  }
  
