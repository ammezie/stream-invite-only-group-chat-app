import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const { token } = useParams();

  useEffect(() => {
    async function fetchInvite() {
      try {
        const response = await axios.get(`http://127.0.0.1:3333/invites/${token}`);
        console.log(response.data)
        setEmail(response.data.email);
      } catch (error) {
        // setError(err)
      }
    }

    fetchInvite();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post('http://127.0.0.1:3333/auth/register', { email, username, password });

    localStorage.setItem('token', response.data);

    history.push('/');
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-4 is-offset-4">
            <h2 className="title has-text-centered">Create an aacount</h2>

            <form method="post" onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="email"
                    className="input"
                    value={email}
                    readOnly
                    required />
                </div>
              </div>

              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                <button type="submit" className="button is-dark is-fullwidth">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;