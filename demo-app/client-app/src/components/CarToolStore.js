import React, { useState, createContext } from 'react';
import axios from 'axios';


export const CarToolStoreContext = createContext({});

export const CarToolStore = ({ children }) => {

  const carToolState = useState({
    loggedIn: false,
    username: '',
    cars: [],
  });

  const login = async (username, password) => {
    const { data } = await axios.post('/api/users/login', {
      username, password,
    });

    console.log(data);
  };

  const logout = async () => {
    await axios.get('/api/users/logout');
  };

  const register = async (username, password) => {
    const { data } = await axios.post('/api/users/register', {
      username, password,
    });

    console.log(data);
  };

  const verify = async () => {
    const res = await axios.get('/api/users/verify');
    console.log(res);
  };

  const getCars = async () => {
    const { data } = await axios.get('/api/cars');
    console.log(data);
  };

  const carToolStoreContext = {
    ...carToolState,
    onLogin: login,
    onLogout: logout,
    onRegister: register,
    onVerify: verify,
    onGetCars: getCars,
  };

  return <CarToolStoreContext.Provider value={carToolStoreContext}>
    {children}
  </CarToolStoreContext.Provider>;


};