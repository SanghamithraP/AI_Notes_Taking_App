import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  // Get logged in user
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tone: "Simple",
  });

  const {
    title,
    content,
    tone,
  } = formData;

  // Input change
  const onChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });
  };

  // Create note
  const onSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      await axios.post(

        "http://localhost:5000/api/notes",

        formData,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

      );

      alert(
        "Note created successfully!"
      );

      // Clear form
      setFormData({
        title: "",
        content: "",
        tone: "Simple",
      });

    } catch (error) {

      console.error(error);

      alert(
        "Failed to create note"
      );
    }
  };

  // Logout
  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");
  };

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">

        <div>

          <h1 className="text-2xl font-bold">
            AI Notes Dashboard
          </h1>

          <p className="text-sm">
            Welcome,
            {" "}
            {user?.username}
            {" "}
            👋
          </p>

        </div>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>

      {/* Main Section */}
      <div className="max-w-4xl mx-auto p-6">

        {/* View Notes Button */}
        <div className="mb-6">

          <button
            onClick={() => navigate("/notes")}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-purple-700 transition"
          >
            View Your Notes
          </button>

        </div>

        {/* Create Note Form */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-bold mb-4">
            Create New Note
          </h2>

          <form
            onSubmit={onSubmit}
            className="space-y-4"
          >

            <input
              type="text"
              name="title"
              placeholder="Enter title"
              value={title}
              onChange={onChange}
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              name="content"
              placeholder="Write your note..."
              value={content}
              onChange={onChange}
              rows="6"
              className="w-full border p-3 rounded-lg"
            />

            {/* Tone Dropdown */}
            <select
              name="tone"
              value={tone}
              onChange={onChange}
              className="w-full border p-3 rounded-lg"
            >

              <option value="Simple">
                Simple
              </option>

              <option value="Professional">
                Professional
              </option>

              <option value="Creative">
                Creative
              </option>

              <option value="Academic">
                Academic
              </option>

            </select>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Create Note
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;