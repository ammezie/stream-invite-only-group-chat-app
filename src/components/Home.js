import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
  const { authenticateUser, user, getUser } = useContext(AuthContext)
  const token = localStorage.getItem('token');

  useEffect(() => {
    authenticateUser(!!token);
  }, [authenticateUser, token])

  useEffect(() => {
    async function getAuthUser() {
      const response = await axios.get('http://127.0.0.1:3333/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      getUser(response.data);
    }

    getAuthUser();
  }, [getUser, token]);

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-three-fifths is-offset-one-fifth">
            {/* <Chat client={null}>
              <Channel channel={null}>
                <div>
                  <ContextAwareCustomChannelHeader />
                  <MessageList />
                  <MessageInput />Channel
                </div>
              </Channel>
            </Chat> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;