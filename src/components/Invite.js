import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Invite = () => {
  const { getUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');

  useEffect(() => {
    getUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('http://127.0.0.1:3333/invites', { email }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    setEmail('')
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-4 is-offset-4">
            <h2 className="title has-text-centered">Invite User</h2>

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

              <div className="control">
                <button type="submit" className="button is-dark is-fullwidth">Send Invite</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Invite;