import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import Invite from './components/Invite';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import AuthContextProvider from './contexts/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Navbar />

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/invite' component={Invite} />
          <Route path='/invites/:token' component={Register} />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
