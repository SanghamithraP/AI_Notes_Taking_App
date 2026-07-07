import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );

      alert("Registration successful!");

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        <form onSubmit={onSubmit} className="space-y-4">

          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={username}
            onChange={onChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={onChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={onChange}
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
          >
            Register
          </button>

        </form>

        <p className="mt-4 text-center">
          Already have an account?
          <Link to="/" className="text-purple-600 ml-1">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;