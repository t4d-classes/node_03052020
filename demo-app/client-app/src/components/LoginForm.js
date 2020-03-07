import React from 'react';
import { Form, Field } from 'react-final-form';

export const LoginForm = ({ onLogin }) => {

  return <Form
    onSubmit={({ username, password }) => onLogin(username, password)}
    initialValues={{ username: 'demo', password: 'demo' }}
    render={({ handleSubmit }) => {

      return <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div>
          <label>Username:</label>
          <Field name="username" component="input" placeholder="demo" autoComplete="off" />
        </div>

        <div>
          <label>Password:</label>
          <Field name="password" component="input" placeholder="demo" autoComplete="off" />
        </div>

        <button type="submit">Login</button>

      </form>

    }} />

};