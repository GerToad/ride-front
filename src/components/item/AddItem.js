import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './AddItem.css';

const AddItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [status, setStatus] = useState('');
  const [ok, setOk] = useState('');
  const user = JSON.parse(localStorage.getItem("user"));
  const [itemId, setItemId] = useState(useParams().itemId); 
  const navigate = useNavigate();

    useEffect(() => {
      const fetchItemData = async () => {
        if (itemId) {
          try {
            const response = await axios.get(`http://localhost:5000/item/getItem?id=${itemId}`, {
              headers: { "Content-Type": "application/json" },
            });

            if (response.data.status === "success") {
              const item = response.data.item;
              setName(item.name);
              setDescription(item.description);
              setCost(item.cost);
              setStatus(item.status);
            }
          } catch (error) {
            console.error(error);
          }
        }
      };

      fetchItemData();
    }, [itemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform the necessary actions to save the item data
    // For simplicity, we'll just log the values here
    try {
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Perform the necessary actions to save the item data
    // For simplicity, we'll just log the values here
    try {
      const response = await axios.patch("http://localhost:5000/item/edit", 
                { name, description, cost, status, "_id": itemId},
                {headers: { "content-type": "application/json" }});

        if (response.data.status === "success") {
          console.log("Item updated successfully");
          // Display a success message or perform any other desired actions
          setOk("success");
        } else {
          console.log("Item update failed");
          // Display a fail message or perform any other desired actions
          setOk("fail");
        } 

        setTimeout(() => {
          // Code to be executed after 4 seconds
          setItemId(null)
          navigate("/");
        }, 4000);
    } catch (error) {
      // Handle error, such as displaying an error message
      console.error(error);
      setOk("fail");
    }

  };
  const isFormValid = name && cost && status;

  return (
    <div className="add-item-container">
        {itemId === undefined ? <h2>Añadir Articulo</h2> : <h2>Cambiar Articulo</h2>}        
        {ok === "success" && (
            itemId === undefined ? 
                <div className="success-message">
                Articulo añadido exitosamente!
                </div> : 
                <div className="success-message">
                Articulo actualizado exitosamente!
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

        {itemId === undefined ? 
            <button type="submit"  disabled={!isFormValid} onClick={handleSubmit}>Añadir</button> : 
            <button type="submit"  disabled={!isFormValid} onClick={handleUpdate}>Actualizar</button>
        }        
        
      </form>
    </div>
  );
};

export default AddItem;
