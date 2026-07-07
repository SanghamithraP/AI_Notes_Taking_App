import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Notes() {

  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);

  // Fetch notes
  const fetchNotes = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          "http://localhost:5000/api/notes",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setNotes(response.data);

    } catch (error) {

      console.error(error);

      alert("Failed to fetch notes");
    }
  };

  useEffect(() => {

    fetchNotes();

  }, []);

  // Delete note
  const deleteNote = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(

        `http://localhost:5000/api/notes/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

      );

      alert("Note deleted successfully!");

      fetchNotes();

    } catch (error) {

      console.error(error);

      alert("Delete failed");
    }
  };

  // Update note
  const updateNote = async (note) => {

    const newTitle = prompt(
      "Update title",
      note.title
    );

    const newContent = prompt(
      "Update content",
      note.content
    );

    const newTone = prompt(
      "Update tone",
      note.tone
    );

    if (
      !newTitle
      || !newContent
      || !newTone
    ) {

      return;
    }

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(

        `http://localhost:5000/api/notes/${note._id}`,

        {
          title: newTitle,
          content: newContent,
          tone: newTone,
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

      );

      alert("Note updated successfully!");

      fetchNotes();

    } catch (error) {

      console.error(error);

      alert("Update failed");
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Your Notes
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Dashboard
        </button>

      </div>

      {/* Notes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {notes.length === 0 ? (

          <p className="text-gray-600">
            No notes available.
          </p>

        ) : (

          notes.map((note) => (

            <div
              key={note._id}
              className="bg-white p-5 rounded-2xl shadow-lg"
            >

              <h2 className="text-2xl font-bold mb-3">
                {note.title}
              </h2>

              <p className="mb-2">
                <strong>Content:</strong>
                {" "}
                {note.content}
              </p>

              <p className="mb-2 text-gray-700">
                <strong>Summary:</strong>
                {" "}
                {note.summary}
              </p>

              <p className="mb-2">
                <strong>Tone:</strong>
                {" "}
                {note.tone}
              </p>

              <p className="text-sm text-gray-500">
                Created:
                {" "}
                {new Date(
                  note.createdAt
                ).toLocaleString()}
              </p>

              <p className="text-sm text-gray-500 mb-4">
                Updated:
                {" "}
                {new Date(
                  note.updatedAt
                ).toLocaleString()}
              </p>

              {/* Buttons */}
              <div className="flex gap-3">

                <button
                  onClick={() => updateNote(note)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteNote(note._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Notes;