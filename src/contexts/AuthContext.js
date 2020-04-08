import axios from 'axios';
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  console.log(isAuthenticated)

  const authenticateUser = (value) => {
    setIsAuthenticated(value)
  }

  const getUser = async (token) => {
    const response = await axios.get('http://127.0.0.1:3333/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    setUser(response.data);
  }

  // const getUser = (user) => {
  //   setUser(user)
  // }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, authenticateUser, getUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;