import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();  

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      form
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    alert("Login Successful ✅");
    console.log( res.data.role );
    if (res.data.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }

  } catch (err) {
    alert("Invalid credentials ❌");
  }
};

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>

      <p>
        New user? <Link to="/">Signup</Link>
      </p>
    </div>
  );
}

export default Login;