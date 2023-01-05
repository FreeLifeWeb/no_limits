import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import ChatWindow from '../ChatWindow/ChatWindow';
import { getRoom } from '../../redux/actions/roomAction';
import socket from '../../socket/socketIo';
import { getUsersioRoom } from '../../redux/actions/usersioAction';
import { getMessage } from '../../redux/actions/messageAction';

export default function MainPage() {
  const [room, setRoom] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true, language: 'ru-RU' });// автозапрос на доступ к микрофону
    const focusInput = document.getElementById('room');// автофокус на первом импуте при монтировании компонента
    focusInput.focus();// автофокус на первом импуте при монтировании компонента
  }, []);

  useEffect(() => { // сообщение при отсутствии поддержки WEB SPEECH API
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert('Ups, your browser is not supported!');
    }
  }, []);

  const [showChat, setShowChat] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((store) => store.state);
  // console.log('STATE:', state);

  function formAction(e) {
    const event = Object.fromEntries(new FormData(e.target));
    console.log('EV', event);
    dispatch(getRoom(e, event));
    setTimeout(() => {
      socket.emit('ROOM:JOIN', {
        ...event,
      });
    }, 500);
    setShowChat((prev) => !prev);
  }

  const addMessage = (message) => { // почему без этого не получал сообщение другой пользователь?
    dispatch(getMessage(message));
  };
  useEffect(() => {
    socket.on('ROOM:JOINED', (users) => {
      // console.log(')))))))))))', users);
      dispatch(getUsersioRoom(users));
    });
    socket.on('ROOM:USER_LEAVE', (users) => {
      // console.log('AfterDisconect', users);
      dispatch(getUsersioRoom(users));
    });
    socket.on('ROOM:ADD_MESSAGES', (message) => {
      addMessage(message);
    });
  }, []);
  const focusInputName = document.getElementById('name');// автофокус

  const commands = [
    {
      command: 'Отправить',
      callback: () => '',
      matchInterim: true,
    },
    {
      command: 'Следующий',
      callback: () => focusInputName.focus(),
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
    <div className="container">
      {!showChat
        ? (
          <form onSubmit={(e) => formAction(e)}>
            <div className="mb-3">
              <label htmlFor="exampleInputRoom" className="form-label">
                Room:
                <input id="room" name="roomId" value={room || transcript} onChange={(e) => setRoom(e.target.value)} type="text" className="form-control" placeholder="Room number..." />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Name:
                <input id="name" onFocus={(e) => e.target.value = ''} name="userName" value={name || transcript} onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Name..." />
              </label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        )
        : (
          <ChatWindow {...state} onAddMessage={addMessage} />
        )}
    </div>
  );
}
