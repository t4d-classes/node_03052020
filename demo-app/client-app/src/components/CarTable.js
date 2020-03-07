import React, { useState, useEffect } from 'react';
import axios from 'axios';

const refreshCars = () => axios.get(/* set a url here */);

const deleteCar = (carId) => axios.delete(/* set a url here */);

export const CarTable = () => {

  const [ cars, setCars ] = useState([]);

  useEffect(() => {

    refreshCars
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
      <td colSpan="7">
        <button type="button" onClick={refreshCars}>
          Refresh
        </button>
      </td>
    </tfoot>
  </table>


};