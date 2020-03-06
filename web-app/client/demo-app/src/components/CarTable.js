import React, { useState, useEffect } from 'react';
import axios from 'axios';

const refreshCars = () => axios.get('/api/cars');

const deleteCar = (carId) => axios.delete('/api/cars/' + encodeURIComponent(carId));

export const CarTable = () => {

  const [ cars, setCars ] = useState([]);

  useEffect(() => {

    // uncomment once the URL is set above
    refreshCars()
      .then(({ data }) => {
        setCars(data);
      });

  }, []);

  const removeCar = (carId) => {
  
    deleteCar(carId)
      .then(() => refreshCars())
      .then(({ data }) => {
        setCars(data);
      });

  };

  return <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Make</th>
        <th>Model</th>
        <th>Year</th>
        <th>Color</th>
        <th>Price</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {cars.map(car => <tr key={car.id}>
        <td>{car.id}</td>
        <td>{car.make}</td>
        <td>{car.model}</td>
        <td>{car.year}</td>
        <td>{car.color}</td>
        <td>{car.price}</td>
        <td>
          <button type="button" onClick={() => removeCar(car.id)}>
            Remove
          </button>
        </td>
      </tr>)}
    </tbody>
    <tfoot>
      <tr>
        <td colSpan="7">
          <button type="button" onClick={() => refreshCars().then(({ data }) => { setCars(data); })}>
            Refresh
          </button>
        </td>
      </tr>
    </tfoot>
  </table>


};