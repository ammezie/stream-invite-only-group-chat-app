import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const LoginResponse = await axios.post('http://127.0.0.1:3333/auth/login', { email, password });

    localStorage.setItem('token', LoginResponse.data);

    setIsAuthenticated(true);

    const userResponse = await axios.get('http://127.0.0.1:3333/auth/user', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    setUser(userResponse.data);

    history.push('/');
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-4 is-offset-4">
            <h2 className="title has-text-centered">Welcome back!</h2>

            <form method="post" onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                </div>
              </div>

              <div className="control">
                <button type="submit" className="button is-dark is-fullwidth">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;