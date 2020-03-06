import React from 'react';
import logo from './logo.svg';
import './App.css';

import { CarTable } from './components/CarTable';
import { CarForm } from './components/CarForm';

function App() {
  return (
    <>
      <CarTable />
      <CarForm />
    </>
  );
}

export default App;
