import { useEffect, useState , useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const { userId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchTasks = useCallback(async () => {
    try {
      const url = userId
        ? `/api/tasks?userId=${userId}`
        : "/api/tasks";

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err.response?.data || err.message);
    }
  }, [token, userId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async () => {
    if (!title) return;

    try {
      await axios.post(
        "/api/tasks",
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log("ADD ERROR:", err.response?.data || err.message);
    }
  };

  const updateTask = async (id, oldTitle) => {
    const newTitle = prompt("Edit task", oldTitle);
    if (!newTitle) return;

    try {
      await axios.put(
        `/api/tasks/${id}`,
        { title: newTitle },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchTasks();
    } catch (err) {
      console.log("UPDATE ERROR:", err.response?.data || err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `/api/tasks/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchTasks();
    } catch (err) {
      console.log("DELETE ERROR:", err.response?.data || err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Dashboard</h2>

      <button onClick={logout} style={{ marginBottom: "20px" }}>
        Logout
      </button>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          tasks.map((task) => (
            <li key={task._id}>
              {task.title}

              <button
                onClick={() => updateTask(task._id, task.title)}
              >
                Edit
              </button>

              <button onClick={() => deleteTask(task._id)}>
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Dashboard;