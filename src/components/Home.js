import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
// import { Channel, ChannelHeader, Chat, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
  const { user, getUser } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  const [channel, setChannel] = useState(null);
  const [chatToken, setChatToken] = useState('');
  // const [chatClient, setChatClient] = useState(null);

  const chatClient = new StreamChat('ascf4bc6bk8w');

  useEffect(() => {
    getUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user.username) {
      // async function getToken() {
      //   try {
      //     const response = await axios.post('http://127.0.0.1:3333/tokens', {
      //       username: user.username
      //     }, {
      //       headers: {
      //         'Authorization': `Bearer ${token}`
      //       }
      //     });

      //     setChatToken(response.data);
      //   } catch (error) {
      //     console.log(error);
      //     return;
      //   }

      // }

      // getToken();

      let chatToken;

      async function initializeStream() {
        try {
          const response = await axios.post('http://127.0.0.1:3333/tokens', {
            username: user.username
          }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          chatToken = response.data;
        } catch (error) {
          console.log(error);
          return;
        }

        await chatClient.setUser({ id: user.username, name: user.username }, chatToken);

        const channel = chatClient.channel('messaging', 'chatroom');
        await channel.watch();

        setChannel(channel);
      }

      initializeStream();

    }

    // //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatClient, token, user.username]);

  console.log(channel)

  // useEffect(() => {
  //   console.log(chatToken)
  //   // if (chatToken) {
  //   async function initializeStream() {
  //     const client = new StreamChat('ascf4bc6bk8w');

  //     // setChatClient(new StreamChat(process.env.MIX_STREAM_API_KEY));
  //     setChatClient(client);

  //     console.log(chatClient);

  //     await chatClient.setUser(
  //       { id: user.username, name: user.username },
  //       chatToken
  //     );
  //   }

  //   initializeStream();
  //   // }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // if (user) {

  // }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-three-fifths is-offset-one-fifth">
            <p>{user.username}</p>
            {/* <Chat client={chatClient} theme={'messaging light'}>
              <Channel channel={channel}>
                <Window>
                  <ChannelHeader />
                  <MessageList />
                  <MessageInput />
                </Window>
                <Thread />
              </Channel>
            </Chat> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;