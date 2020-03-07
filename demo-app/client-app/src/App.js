import React from 'react';

import './App.css';

import { CarToolStore, CarToolStoreContext } from './components/CarToolStore';

import { RegisterForm } from './components/RegisterForm';
import { LoginForm } from './components/LoginForm';

function App() {
  return (
    <CarToolStore>
      <CarToolStoreContext.Consumer>
        {({
          onLogin: login,
          onLogout: logout,
          onRegister: register,
          onVerify: verify,
          onGetCars: getCars,
        }) => <>
          <RegisterForm onRegister={register} />
          <LoginForm onLogin={login} />
          <div>
            <button type="button" onClick={verify}>Verify</button>
            <button type="button" onClick={getCars}>Get Cars</button>
            <button type="button" onClick={logout}>Logout</button>
          </div>
        </>}
      </CarToolStoreContext.Consumer>
    </CarToolStore>
  );
}

export default App;
