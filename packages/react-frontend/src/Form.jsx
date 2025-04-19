// src/Form.jsx
import React, { useState } from "react";

function Form(props) {
  const initialState = { name: "", job: "" };
  const [formData, setFormData] = useState(initialState);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  function submitForm(event) {
    event.preventDefault();
    props.handleSubmit(formData);
    setFormData(initialState); // Reset the form
  }

  return (
    <form onSubmit={submitForm}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <label>Job</label>
      <input
        type="text"
        name="job"
        value={formData.job}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default Form;
