import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));

      alert("Login successful!");

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">

        <h1 className="text-3xl font-bold text-center mb-6">
          AI Notes Login
        </h1>

        <form onSubmit={onSubmit} className="space-y-4">

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
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>

        </form>

        <p className="mt-4 text-center">
          Don’t have an account?
          <Link to="/register" className="text-blue-600 ml-1">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;