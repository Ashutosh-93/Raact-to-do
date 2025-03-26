import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/authSlice.js";
import axios from "axios";

const useFetchUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const loginUser = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      },{withCredentials:true});

      
      dispatch(setAuthUser(response.data.authUser));
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.log(err.response?.data?.message)
      
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
};

export default useFetchUser;
