import axios from 'axios';
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const token = localStorage.getItem('token');
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [user, setUser] = useState({});

  const getUser = async () => {
    const response = await axios.get('http://127.0.0.1:3333/auth/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    setUser(response.data);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, getUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;