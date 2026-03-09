import React, { useState, useEffect } from "react";
import { databases, DATABASE_ID, COLLECTION_ID } from "../app/appwrite";
import { ID } from "appwrite";
import { FaEdit, FaTrash } from "react-icons/fa";

function Todo() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  // READ
  const fetchTodos = async () => {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    setTodos(res.documents);
  };

  // CREATE
  const addTodo = async () => {
    if (!text.trim()) return;

    await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      text,
    });

    setText("");
    fetchTodos();
  };

  // UPDATE
  const updateTodo = async () => {
    await databases.updateDocument(DATABASE_ID, COLLECTION_ID, editId, {
      text,
    });

    setText("");
    setEditId(null);
    fetchTodos();
  };

  // DELETE
  const deleteTodo = async (id) => {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    fetchTodos();
  };

  // EDIT
  const editTodo = (todo) => {
    setText(todo.text);
    setEditId(todo.$id);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="flex justify-center items-center p-20  overflow-auto">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-[420px]">

        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Todo Manager
        </h2>

        {/* Input Section */}
        <div className="flex gap-2">

          <input
            type="text"
            placeholder="Enter your task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={editId ? updateTodo : addTodo}
            className={`px-4 py-2 text-white rounded-lg transition ${
              editId
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {editId ? "Update" : "Add"}
          </button>

        </div>

        {/* Todo List */}
        <ul className="mt-6 space-y-3">

          {todos.map((todo) => (

            <li
              key={todo.$id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
            >

              <span className="text-gray-700">{todo.text}</span>

              <div className="flex gap-3">

                <button
                  onClick={() => editTodo(todo)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => deleteTodo(todo.$id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>

              </div>

            </li>

          ))}

        </ul>

      </div>

    </div>
  );
}


export default Todo;
