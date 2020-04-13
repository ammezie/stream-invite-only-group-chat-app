import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export const Navbar = () => {
  const { isAuthenticated, user } = useContext(AuthContext)

  // const handleLogout = () => {
  //   console.log('here')
  // }

  return (
    <nav className="navbar is-dark">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">Stream Chat</Link>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end">
            {
              isAuthenticated
                ?
                <>
                  {user.is_admin && <Link className="navbar-item" to="/invite">Invite</Link>}
                  {/* <Link className="navbar-item" onClick={handleLogout}>Logout</Link> */}
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