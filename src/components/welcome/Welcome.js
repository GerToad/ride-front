import React, { useEffect, useState } from 'react';
import './Welcome.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Welcome = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  //const token = {"token": JSON.parse(localStorage.getItem('token'))};
  const [items, setItems] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [chatReply, setChatReply] = useState('');

  useEffect(() => {
    const delay = 5000; // 60,000 milliseconds = 1 minute

    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/item/getAll?id=${user._id}`, {
                    headers: { "Content-Type": "application/json"},
            });
        setItems(response.data.items);

        // routes
        const routes = await axios.get(`http://localhost:5000/route/getAll?id=${user._id}`, {
                    headers: { "Content-Type": "application/json"},
            });
        setRoutes(routes.data.routes);
      } catch (error) {
        console.error(error);
      }
    };

    setTimeout(() => {
      // Code to be executed after the delay
        if (user) {
          fetchItems();
        }
    }, delay);
  }, [user]);

    const sendMessage = async () => {
    const itemList = items.map(item => `- ${item.name}\n  Description: ${item.description}\n  Cost: ${item.cost}\n  Status: ${item.status}`).join('\n\n');
    const routeList = routes.map(route => `- ${route.name}\n  Description: ${route.description}\n  Driver: ${route.driver}\n  Issues: ${route.issues}`).join('\n\n');

    const message = `Give me a recommendation for better management of my job as a route transportation manager. Here are the items I have:\n\n${itemList}\n\nAnd here are the routes:\n\n${routeList}\n\n and considering a mid of the prices in Mexico tell me if these costs are ok or not and last, for each issue i have on my routes tell me how can i handle them. Please provide the recommendation in Spanish.`;
      try {
        const request = {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: message,
              },
            ],
          };
        const response = await axios.post('https://api.openai.com/v1/chat/completions', request, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ???'
          }
        });

        console.log(message)
        console.log(response)
        const reply = response.data.choices[0].message.content.trim();
        setChatReply(reply);
        console.log(reply)
        // Process and handle the reply as needed
      } catch (error) {
        console.error('Error:', error.response.data);
        // Handle error response
      }
    };

  return (
    <div className='welcome'>
      {!user ? (
        <div className='greeting'>
            <h1>
              Bienvenido! Por favor <NavLink to='/register'>registrese</NavLink> para empezar a administrar su flujo de
              trabajo.
            </h1>
        </div>

      ) : (
        <div>
          <div className="greeting">
            <h1>Bienvenido, {user.name}!</h1>
            <h2>Estos son los articulos que tienes</h2>
          </div>

          <table className='table'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Costo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>
                    <NavLink to={`/addItem/${item._id}`}>
                    {item.name}
                    </NavLink>
                  </td>
                  <td>{item.description}</td>
                  <td>{item.cost}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

            {/*##### Rutas #####*/}
          <div className="greeting">
            <h2>Y estas son tus rutas</h2>
          </div>
          <div className="card-container">
            {/* Cards  */}
            {routes.map((route) => (
            <div className="card" key={route._id}>
              <h2> <NavLink to={`/routes/${route._id}`}>{route.name}</NavLink> </h2>
              <p>{route.description}</p>
              <p>Conductor: {route.driver}</p>
              <p>Problemas: {route.issues}</p>
            </div>
            ))}
          </div>
          <button className="chat-button" onClick={sendMessage}>Recomiendame algo</button>
          {chatReply && (
            <div className="chat-reply">
              <p>Recomendaciones:</p>
              <p>{chatReply}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Welcome;

