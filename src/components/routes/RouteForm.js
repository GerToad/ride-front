import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RouteForm.css";

const RouteForm = () => {
  const [name, setName] = useState("");
  const [driver, setDriver] = useState("");
  const [issues, setIssues] = useState("");
  const [description, setDescription] = useState("");
  const [ok, setOk] = useState('');
  const user = JSON.parse(localStorage.getItem("user"));
  const [routeId, setRouteId] = useState(useParams().routeId); 
  const navigate = useNavigate();

    useEffect(() => {
      const fetchItemData = async () => {
        if (routeId) {
          try {
            const response = await axios.get(`http://localhost:5000/route/getRoute?id=${routeId}`);

            if (response.data.status === "success") {
              const route = response.data.route;
              setName(route.name);
              setDescription(route.description);
              setDriver(route.driver);
              setIssues(route.issues);
            }
          } catch (error) {
            console.error(error);
          }
        }
      };

      fetchItemData();
    }, [routeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform the necessary actions to save the item data
    // For simplicity, we'll just log the values here
    try {
      const response = await axios.post("http://localhost:5000/route/add", 
                { name, description, driver, issues, "userId": user._id},
                {headers: { "content-type": "application/json" }});

        if (response.data.status === "success") {
          console.log("Route added successfully");
          // Display a success message or perform any other desired actions
          setOk("success");
        } else {
          console.log("Route addition failed");
          // Display a fail message or perform any other desired actions
          setOk("fail");
        } 

        // Clear the form fields
        setName('');
        setDescription('');
        setDriver('');
        setIssues('');
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
      const response = await axios.patch("http://localhost:5000/route/edit", 
                { name, description, driver, issues, "_id": routeId},
                {headers: { "content-type": "application/json" }});

        if (response.data.status === "success") {
          console.log("Route updated successfully");
          // Display a success message or perform any other desired actions
          setOk("success");
        } else {
          console.log("Route update failed");
          // Display a fail message or perform any other desired actions
          setOk("fail");
        } 

        setTimeout(() => {
          // Code to be executed after 4 seconds
          setRouteId(null)
          navigate("/");
        }, 3000);
    } catch (error) {
      // Handle error, such as displaying an error message
      console.error(error);
      setOk("fail");
    }

  };

  const isFormValid = name && driver;

  return (
    <div className="route-form">
        {routeId === undefined ? <h2>Añadir ruta</h2> : <h2>Cambiar ruta</h2>}        
        {ok === "success" && (
            routeId === undefined ? 
                <div className="success-message">
                Ruta añadida exitosamente!
                </div> : 
                <div className="success-message">
                Ruta actualizada exitosamente!
                </div> 
        )}
        {ok === "fail" && (
          <div className="fail-message">
            Adision de la ruta fallo. Por favor intente nuevamente
          </div>
        )}

      <form>
        <div className="form-group">
          <label htmlFor="name">Nombre de la ruta</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="driver">Nombre del conductor</label>
          <input
            type="text"
            id="driver"
            name="driver"
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="issues">Problemas usuales</label>
          <textarea
            id="issues"
            name="issues"
            value={issues}
            onChange={(e) => setIssues(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripcion</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        {routeId === undefined ? 
            <button type="submit"  disabled={!isFormValid} onClick={handleSubmit}>Añadir</button> : 
            <button type="submit"  disabled={!isFormValid} onClick={handleUpdate}>Actualizar</button>
        }        
      </form>
    </div>
  );
};

export default RouteForm;
