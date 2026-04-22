import { useState } from "react";
import axios from "axios";
import { Link , useNavigate } from "react-router-dom";


function Signup() {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Signup Successful ✅");
      navigate("/login");
    } catch (err) {
      alert("Error ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Signup</h1>
       
      <form onSubmit={handleSignup}>
        <input name="name" placeholder="Name" onChange={handleChange} /><br />
        <input name="email" placeholder="Email" onChange={handleChange} /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />

        <select name="role" onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select><br />

        <button type="submit">Signup</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;