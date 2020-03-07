import React from 'react';
import { Form, Field } from 'react-final-form';

export const RegisterForm = ({ onRegister }) => {

  return <Form
    onSubmit={({ username, password }) => onRegister(username, password)}
    initialValues={{ username: 'demo', password: 'demo', confirmPassword: 'demo' }}
    render={({ handleSubmit }) => {

      return <form onSubmit={handleSubmit}>
        <h2>Register</h2>

        <div>
          <label>Username:</label>
          <Field name="username" component="input" placeholder="demo" autoComplete="off" />
        </div>

        <div>
          <label>Password:</label>
          <Field name="password" component="input" placeholder="demo" autoComplete="off" />
        </div>

        <div>
          <label>Confirm Password:</label>
          <Field name="confirmPassword" component="input" placeholder="demo" autoComplete="off" />
        </div>

        <button type="submit">Register</button>

      </form>

    }} />

};