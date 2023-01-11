import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {
  Box, Button, FormGroup, TextField, Typography,
} from '@mui/material';
import ChatWindow from '../ChatWindow/ChatWindow';
import { getRoom } from '../../redux/actions/roomAction';
import socket from '../../socket/socketIo';
import { getUsersioRoom } from '../../redux/actions/usersioAction';
import { getMessage } from '../../redux/actions/messageAction';

export default function MainPage() {
  const user = useSelector((store) => store.user);
  useEffect(() => {
    const focusInput = document.getElementById('room');// автофокус на первом импуте при монтировании компонента
    focusInput.focus();// автофокус на первом импуте при монтировании компонента
  }, []);
  useEffect(() => { // сообщение при отсутствии поддержки WEB SPEECH API
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert('К сожалению Ваш браузер не поддерживает этот функционал голосового управления!');
    }
  }, []);
  const dispatch = useDispatch();
  const addMessage = (message) => { // почему без этого не получал сообщение другой пользователь?
    dispatch(getMessage(message));
  };

  useEffect(() => {
    socket.on('ROOM:JOINED', ({ users }) => {
      dispatch(getUsersioRoom(users));
    });
    socket.on('ROOM:USER_LEAVE', (users) => {
      dispatch(getUsersioRoom(users));
    });
    socket.on('ROOM:ADD_MESSAGES', (message) => {
      addMessage(message);
    });
  }, []);
  const [room, setRoom] = useState({
    roomId: '',
    userName: '',
  });
  const [focus, setFocus] = useState({ // state  для заполнения только одного инпута
    roomName: false,
    nameChat: false,
  });

  const isFrase = { // фразы для озвучивания и подсказок
    chatRoom: 'Скажите номер комнаты чата',
    nameNick: 'Скажите Ваше имя',
    submit: 'Нажмите enter, чтобы войти в чат',
  };
  const synth = window.speechSynthesis;
  // let voices = [synth];

  const startSpeach = (sentence) => {
    const utterThis = new SpeechSynthesisUtterance(sentence);
    utterThis.pitch = 1;
    utterThis.rate = 1;
    utterThis.onerror = (event) => {
      console.error('SpeechSynthesisUtterance.onerror', event);
    };
    synth.speak(utterThis);
  };

  const commands = [
    {
      command: 'Конец',
      callback: () => SpeechRecognition.stopListening(),
      matchInterim: true,
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });

  const startListen = () => { // функ-я начало прослушивания
    SpeechRecognition.startListening({ continuous: true, language: 'ru-RU' });
  };
  const stopListen = () => { // функ-я завершения прослушивания
    SpeechRecognition.stopListening();
  };

  const focusHandler = (id, elem) => {
    resetTranscript(); // console.log('focusHandler', transcript);
    setFocus((prev) => ({ ...prev, [elem]: true }));

    const field = isFrase[id];
    startSpeach(field);
    setTimeout(() => {
      startListen();
    }, 2000);
  };

  const enterHandler = (e, id, elem) => {
    stopListen();
    setRoom({ ...room, [e.target.name]: transcript });
    setFocus((prev) => ({ ...prev, [elem]: false }));
    const example = document.getElementById(id);
    example.focus();
  };

  const [showChat, setShowChat] = useState(false);

  const state = useSelector((store) => store.state);

  function formAction(e) {
    dispatch(getRoom(e, room, () => socket.emit('ROOM:JOIN', { ...room })));
    setShowChat((prev) => !prev);
  }

  const ChangeHandler = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  function formAction2(e) {
    dispatch(getRoom(e, room, () => socket.emit('ROOM:JOIN', { ...room })));
    setShowChat((prev) => !prev);
  }

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
    >
      {!showChat
        ? (
          (user.status === null)
            ? (
              <form onSubmit={(e) => formAction2(e)}>
                <FormGroup>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Chat room:
                  </Typography>
                  <TextField
                    id="room"
                    name="roomId"
                    onChange={ChangeHandler}
                    type="text"
                    placeholder="Room number..."
                    label="Room"
                  />
                  <TextField
                    id="name"
                    name="userName"
                    onChange={ChangeHandler}
                    type="text"
                    placeholder="Name..."
                    label="Name"
                  />
                  <Button id="submit" type="submit" variant="contained">Submit</Button>
                </FormGroup>
              </form>
            )
            : (
              <form onSubmit={(e) => formAction(e)}>
                <FormGroup>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Chat room:
                  </Typography>
                  <TextField
                    id="room"
                    name="roomId"
                    value={(focus.roomName ? transcript : room.roomId)}
                    type="text"
                    placeholder="Room number..."
                    onFocus={() => focusHandler('chatRoom', 'roomName')}
                    onKeyDown={(e) => enterHandler(e, 'name', 'roomName')}
                    label="Room"
                  />
                  <TextField
                    id="name"
                    name="userName"
                    onFocus={() => focusHandler('nameNick', 'nameChat')}
                    onKeyDown={(e) => enterHandler(e, 'submit', 'nameChat')}
                    value={(focus.nameChat ? transcript : room.userName)}
                    type="text"
                    placeholder="Name..."
                    label="Name"
                  />
                  <Button id="submit" onFocus={() => startSpeach('Нажмите enter, чтобы войти в чат')} type="submit" variant="contained">Submit</Button>
                </FormGroup>
              </form>

            )

        )
        : (
          <ChatWindow {...state} onAddMessage={addMessage} />
        )}
    </Box>
  );
}
