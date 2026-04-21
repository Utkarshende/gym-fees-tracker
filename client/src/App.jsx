import React from 'react';
import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {

  const [auth, setAuth] = useState(!!localStorage.getItem("token"));

  return auth ? <Dashboard/> :<Login setAuth={setAuth}/>
}

export default App
