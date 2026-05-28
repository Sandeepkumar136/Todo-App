import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Image_Exporter from "../Assets/ImageExporter";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(form.name, form.email, form.password);

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-brand">
          <img src={Image_Exporter.logo} alt="Logo" className="logo" />
          <p className="title">MUI TODO</p>
        </div>
        <h1>Signup</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            required
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />

          <button type="submit">Signup</button>
        </form>

        <Link className="auth-link" to="/login">
          Already have account?
        </Link>
      </div>
    </div>
  );
};

export default Signup;
