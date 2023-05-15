import React, { useEffect, useState } from 'react';
import './Welcome.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Welcome = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [items, setItems] = useState([]);
  const [chatReply, setChatReply] = useState('');

  useEffect(() => {
    const delay = 5000; // 60,000 milliseconds = 1 minute

    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/item/getAll?id=${user._id}`);
        setItems(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    const timer = setTimeout(() => {
      // Code to be executed after the delay
        if (user) {
          fetchItems();
        }
    }, delay);
  }, [user]);

    const sendMessage = async () => {
      const itemList = items.map(item => `- ${item.name}\n  Description: ${item.description}\n  Cost: ${item.cost}\n  Status: ${item.status}`).join('\n\n');
      const message = `Give me a recommendation for better management of my job as a route transportation manager. Here are the items I have:\n\n${itemList}\n\n and considering a mid of the prices in Mexico tell me if these costs are ok or not Please provide the recommendation in Spanish.`; 
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
            'Authorization': 'Bearer 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'
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
            <h1>Bienvenido, {user.name}! Estos son los articulos que tienes</h1>
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
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.cost}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

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

