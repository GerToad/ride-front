import React, { useEffect, useState, useRef, useMemo } from 'react';
import Chart from 'chart.js/auto';
import './Welcome.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Welcome = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  //const token = {"token": JSON.parse(localStorage.getItem('token'))};
  const [items, setItems] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [chatReply, setChatReply] = useState('');
  const [currentView, setCurrentView] = useState('statistics'); // 'statistics' or 'table'

  useEffect(() => {
    const delay = 4000; // 60,000 milliseconds = 1 minute

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
        const itemList = items.map(item => `- ${item.name}\n  Description: ${item.description}\n  Cost: ${item.cost}\n  Status: ${item.status}\n Useful life: ${item.usefulLife}\n Purchase year: ${item.purchaseYear}`).join('\n\n');
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

    const handleViewSwitch = () => {
        setCurrentView(currentView === 'statistics' ? 'table' : 'statistics');
    };

    // Calculate depreciation for each item
    const depreciatedItems = items.map(item => {
      const annualDepreciation = item.cost / item.usefulLife;
      const currentYear = new Date().getFullYear();
      const yearsElapsed = currentYear - item.purchaseYear;
      const accumulatedDepreciation = annualDepreciation * yearsElapsed;
      const netBookValue = item.cost - accumulatedDepreciation;

      return {
        name: item.name,
        cost: item.cost,
        usefulLife: item.usefulLife,
        purchaseYear: item.purchaseYear,
        annualDepreciation,
        yearsElapsed,
        accumulatedDepreciation,
        netBookValue,
      };
    });

    const StatisticsView = ({ depreciatedItems }) => {
      const chartRef = useRef(null);

        const chartData = useMemo(() => {
        const labels = depreciatedItems.map(item => item.name);
        const netBookValues = depreciatedItems.map(item => item.netBookValue);

        return {
          labels: labels,
          datasets: [
            {
              label: 'Depreciación',
              data: netBookValues,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        };
        }, [depreciatedItems]);

        useEffect(() => {
        if (!chartRef.current) {
          return;
        }

        const ctx = chartRef.current.getContext('2d');
        let chartInstance;

        if (Chart.getChart(chartRef.current)) {
          chartInstance = Chart.getChart(chartRef.current);
          chartInstance.data = chartData;
          chartInstance.update();
        } else {
          chartInstance = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }

        return () => {
          if (chartInstance) {
            chartInstance.destroy();
          }
        };
        }, [chartData]);

        if (depreciatedItems.length === 0) {
        return <p>No items available for statistics.</p>;
        }

        return (
        <div>
          <h2>Estadisticas</h2>
          <canvas ref={chartRef} />
        </div>
        )
    };

    const TableView = ({ depreciatedItems }) => {
      // Implement the JSX to display the table view using the depreciatedItems data
    return (
        <div>
          <h2>Tabla de Depreciación</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Costo</th>
                <th>Depreciación Anual</th>
                <th>Años Transcurridos</th>
                <th>Depreciación Acumulada</th>
                <th>Depreciación Actual</th>
              </tr>
            </thead>
            <tbody>
              {depreciatedItems.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.cost}</td>
                  <td>{item.annualDepreciation}</td>
                  <td>{item.yearsElapsed}</td>
                  <td>{item.accumulatedDepreciation}</td>
                  <td>{item.netBookValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
    // Main code
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
                <th>Vida util</th>
                <th>Año de compra</th>
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
                  <td>${item.cost}</td>
                  <td>{item.status}</td>
                  <td>{item.usefulLife}</td>
                  <td>{item.purchaseYear}</td>
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

          <button onClick={handleViewSwitch}>Cambiar vista</button>
            {currentView === 'statistics' ? (
                <StatisticsView depreciatedItems={depreciatedItems} />
            ) : (
                <TableView depreciatedItems={depreciatedItems} />
            )}
        </div>
      )}
    </div>
  );
};

export default Welcome;

