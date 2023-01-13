import React, { useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import socket from '../../socket/socketIo';
import styles from './style.css';

export default function ChatWindow({
  roomId, userName, users, messages, onAddMessage, startSpeach, user,
}) {
  // useEffect(() => {
  //   const focusInput = document.getElementById('textArea');
  //   focusInput.focus();
  // }, []);
  // console.log('users:', users, messages);
  useEffect(() => {
    // console.log('USER_STATUS', user.status);
    if (user.status !== 'employer') {
      const timerFunc = setTimeout(() => {
        startSpeach(`сообщение от:${messages[messages.length - 1].userName} время получения:${messages[messages.length - 1].time} содержание:${messages[messages.length - 1].text}`);
      }, 2500);
      return () => clearTimeout(timerFunc);
    }
    return console.log('err');
  }, [messages]);

  const messageScroll = useRef(null);
  const formMessages = (e) => {
    e.preventDefault();
    const { message } = Object.fromEntries(new FormData(e.target));
    // console.log('MESSAGE', message);
    socket.emit('ROOM:NEW_MESSAGES', {
      roomId,
      userName,
      text: message,
      time:
        ` ${new Date(Date.now()).getHours()}
        :
        ${new Date(Date.now()).getMinutes()}`,
    });
    onAddMessage({
      userName,
      text: message,
      time:
        ` ${new Date(Date.now()).getHours()}
        :
        ${new Date(Date.now()).getMinutes()}`,
    });
    e.target.reset();
  };

  React.useEffect(() => {
    messageScroll.current.scrollTo(0, 99999);
  }, [messages]);

  const commands = [
    {
      command: 'Отправить',
      callback: (e) => formMessages(e),
      matchInterim: true,
    },
    {
      command: 'Конец',
      callback: () => SpeechRecognition.stopListening(),
      matchInterim: true,
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });
  return (
    <div id="container">
      <aside>
        <header>
          <input type="text" placeholder="search" />
        </header>
        <div style={{ marginLeft: 20, color: 'white' }}>
          <h3>
            Online
            {' '}
            (
            {users.length}
            )
          </h3>
        </div>
        <ul>
          {users.map((name, index) => (
            <li key={index}>
              {/* <img src="" alt="avatar..." /> */}
              <div>
                <h2>{name}</h2>
                <h3>
                  <span className="status green" />
                  online
                </h3>
              </div>
            </li>
          ))}
          {/* <li>  // при необходимости отобразить offline пользователя
            <img src="" alt="" />
            <div>
              <h2>Nom</h2>
              <h3>
                <span className="status orange" />
                offline
              </h3>
            </div>
          </li> */}
        </ul>
      </aside>
      <main>
        <header>
          <div>
            <h2>Chat</h2>
            <h3>
              already
              {' '}
              {messages.length}
              {' '}
              messages
            </h3>
          </div>
          <img src="" alt="" />
        </header>
        <ul ref={messageScroll} id="chat">
          {messages?.map((message, index) => (
            (message.userName === user.name)
              ? (
                <li key={index} className="you">
                  <div className="entete">
                    <span className="status green" />
                    <h2>{message.userName}</h2>
                    {' '}
                    <h3>{message.time}</h3>
                  </div>
                  <div className="triangle" />
                  <div className="message">
                    {message.text}
                  </div>
                </li>
              )
              : (
                <li key={index} className="me">
                  {' '}
                  <div className="entete">
                    <span className="status blue" />
                    {' '}
                    <h2>{message.userName}</h2>
                    {' '}
                    <h3>{message.time}</h3>
                  </div>
                  <div className="triangle" />
                  <div className="message">
                    {message.text}
                    {' '}
                  </div>
                </li>
              )
          ))}

        </ul>
        <footer>
          <form onSubmit={(e) => formMessages(e)}>
            <textarea id="textArea" name="message" placeholder="Type your message" />
            <button type="submit">Send</button>
          </form>
        </footer>
      </main>
    </div>
  );
}
