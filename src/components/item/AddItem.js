import React, { useState } from 'react';
import axios from "axios";
import './AddItem.css';

const AddItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [status, setStatus] = useState('');
  const [ok, setOk] = useState('');
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform the necessary actions to save the item data
    // For simplicity, we'll just log the values here
    try {
        console.log('Name:', name);
        console.log('Description:', description);
        console.log('Cost:', cost);
        console.log('Status:', status);
      const response = await axios.post("http://localhost:5000/item/add", 
                { name, description, cost, status, "userId": user._id},
                {headers: { "content-type": "application/json" }});

        if (response.data.status === "success") {
          console.log("Item added successfully");
          // Display a success message or perform any other desired actions
          setOk("success");
        } else {
          console.log("Item addition failed");
          // Display a fail message or perform any other desired actions
          setOk("fail");
        } 

        // Clear the form fields
        setName('');
        setDescription('');
        setCost('');
    } catch (error) {
      // Handle error, such as displaying an error message
      console.error(error);
      setOk("fail");
    }

  };

  const isFormValid = name && cost && status;

  return (
    <div className="add-item-container">
      <h2>Añadir Item</h2>
        {ok === "success" && (
          <div className="success-message">
            Item añadido exitosamente!
          </div>
        )}
        {ok === "fail" && (
          <div className="fail-message">
            Adision del item fallo. Por favor intente nuevamente
          </div>
        )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripcion</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cost">Costo</label>
          <input
            required
            type="text"
            id="cost"
            name="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Estado</label>
          <select id="status" name="status" required onChange={(e) => setStatus(e.target.value)}>
            <option value="new">Nuevo</option>
            <option value="old">Viejo</option>
            <option value="used">Usado</option>
          </select >
        </div>        

        <button type="submit"  disabled={!isFormValid} onClick={handleSubmit}>Añadir</button>
      </form>
    </div>
  );
};

export default AddItem;
