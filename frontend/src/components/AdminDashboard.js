import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(res.data);
      } catch (err) {
        console.log("ADMIN ERROR:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const openUserDashboard = (userId) => {
    navigate(`/dashboard/${userId}`);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Admin Panel</h2>

      <button onClick={logout}>Logout</button>

      <h3>All Users</h3>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user) => (
          <div key={user._id}>
            <button onClick={() => openUserDashboard(user._id)}>
              {user.name} ({user.email})
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;