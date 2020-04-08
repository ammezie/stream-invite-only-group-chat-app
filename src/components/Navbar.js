import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext)

  const handleLogout = () => {
    console.log('here')
  }

  return (
    <nav className="navbar is-dark">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">Stream Chat</a>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end">
            {
              isAuthenticated
                ?
                <>
                  <Link className="navbar-item" to="/invite">Invite</Link>
                  <Link className="navbar-item" onClick={handleLogout}>Logout</Link>
                </>
                : <Link className="navbar-item" to="/login">Login</Link>
            }
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;