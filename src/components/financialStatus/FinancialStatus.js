import React, { useState, useEffect } from 'react';
import './FinancialStatus.css';
import axios from 'axios';

const FinancialStatus = () => {

  const pasaje = 6;
  const sits = 42
  const hrs = 8;
  const day = pasaje * sits * hrs;
  const totalIncome = day * 6 * 4 * 12;

  const user = JSON.parse(localStorage.getItem('user'));
  const [items, setItems] = useState([]);
  const [annualIncome, setAnnualIncome] = useState(totalIncome);

  const [fixed, setFixed] = useState([
    { name: 'Revista', cost: 1600 },
    { name: 'Tarjeton', cost: 450 },
    { name: 'Curso', cost: 1250 },
    { name: 'Placas', cost: 4760 },
    { name: 'Licencia', cost: 1500 },
  ]);

  const [taxes, setTaxes] = useState([
    { type: 'IVA', percentage: 0.16 },
    { type: 'ISR', percentage: 0.30 },
    { type: 'Tenencia', percentage: 0.025 },
    { type: 'ISAI', percentage: 0.05 },
  ]);

  const annualCosts = items.reduce((sum, item) => sum + item.cost, 0);
  const fixedCosts = fixed.reduce((sum, item) => sum + item.cost, 0);
  const profit = annualIncome - annualCosts - fixedCosts;
  const tax = (profit * taxes[0].percentage) + (profit * taxes[1].percentage)
  const netProfit = profit - tax;


  useEffect(() => {
    const delay = 4000; // 60,000 milliseconds = 1 minute

    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/item/getAll?id=${user._id}`, {
                    headers: { "Content-Type": "application/json"},
            });
        setItems(response.data.items);

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


  const handleIncomeChange = (e) => {
    setAnnualIncome(Number(e.target.value));
  };

  return (
    <div>
      <h2>Estado Financiero</h2>

      <div className='table-container'>
        <div>
          <h3>Costos Anuales</h3>
          <table className='table'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Costo</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.cost}</td>
                </tr>
              ))}
              <tr className='last-row'>
                <td>Total Costos:</td>
                <td>{annualCosts}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h3>Costos Fijos</h3>
          <table className='table'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Costo</th>
              </tr>
            </thead>
            <tbody>
              {fixed.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.cost}</td>
                </tr>
              ))}
              <tr className='last-row'>
                <td>Total Costos:</td>
                <td>{fixedCosts}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h3>Impuestos</h3>
          <table className='table'>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Monto (%)</th>
              </tr>
            </thead>
            <tbody>
              {taxes.map((tax, index) => (
                  <tr key={index}>
                    <td>{tax.type}</td>
                    <td>{tax.percentage}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3>Ganancia Neta</h3>
          <table className='table'>
            <thead>
              <tr>
                <th>Ingresos Anuales</th>
                <th>Ganancia Neta</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="number"
                    value={annualIncome}
                    onChange={handleIncomeChange}
                  />
                </td>
                { netProfit > 0 ? <td className='good-profit'>{netProfit}</td> : <td className='bad-profit'>{netProfit}</td> }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancialStatus;
