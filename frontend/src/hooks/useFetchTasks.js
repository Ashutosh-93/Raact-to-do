import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setTasks, setLoading, setError } from "../redux/taskSlice";

const useFetchTasks = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    const fetchTasks = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get("http://localhost:3000/api/tasks", { withCredentials: true });
        dispatch(setTasks(response.data)); // Dispatch action to update Redux state
      } catch (err) {
        dispatch(setError(err.response?.data?.message || "Error fetching tasks"));
      }
    };

    fetchTasks();
  }, [dispatch]);

  return { tasks, loading, error };
};

export default useFetchTasks;
