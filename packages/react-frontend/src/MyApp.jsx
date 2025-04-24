// src/MyApp.jsx
import React, { useState, useEffect } from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState("");  // Error state

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { 
        console.log(error);
        setError("Failed to load users. Please try again later.");
      });
  }, []);

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete user");
        }
        // Remove user from local state
        const updated = characters.filter((character) => character._id !== id);
        setCharacters(updated);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setError("Failed to delete user. Please try again later.");
      });
  }

  function updateList(person) {
    console.log(person);  // Log the person data to see if it's being passed correctly
    postUser(person)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          throw new Error("Failed to create user");
        }
      })
      .then((data) => {
        setCharacters([...characters, data]);  // Update the state with the new user
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        setError("Failed to add user. Please try again later.");
      });
  }


  return (
    <div className="container">
      {error && <div className="error-message">{error}</div>}  {/* Error message */}
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
