import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSelector } from 'react-redux';
import {
  Paper, Typography, Box, Divider, Button,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const synth = window.speechSynthesis;
let voices = [synth];

const setAge = (age) => {
  if (age > 4 && age <= 20) return `${age} лет`;
  switch (age % 10) {
    case (1):
      return `${age} год`;
    case (2):
      return `${age} года`;
    case (3):
      return `${age} года`;
    case (4):
      return `${age} года`;
    default:
      return `${age} лет`;
  }
};

export default function LkCandidate() {
  const user = useSelector((store) => store.user);
  const resume = useSelector((store) => store.resume);
  // const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  const startSpeach = (sentence) => {
    voices = synth.getVoices();

    const utterThis = new SpeechSynthesisUtterance(sentence);

    const milena = voices.find((voice) => voice.name === 'Milena');
    utterThis.voice = milena;
    utterThis.pitch = 1;
    utterThis.rate = 1;
    utterThis.onerror = (event) => {
      console.error('SpeechSynthesisUtterance.onerror', event);
    };
    synth.speak(utterThis);
  };

  const startHandler = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'ru-RU' });
  };

  const stopHandler = () => {
    SpeechRecognition.abortListening();
  };

  useEffect(() => {
  //   axios(`candidate/resume/get/${user.id}`)
  //     .then((res) => setResume(res.data));
    startSpeach('Вам доступны команды "Чат", и "Вакансии". Нажмите enter, чтобы составить или редактировать резюме');
    setTimeout(() => {
      startHandler();
    }, 6000);
    const withoutResume = document.getElementById('createResume');
    withoutResume.focus();
  }, []);

  const commands = [
    {
      command: 'Вакансии',
      callback: () => {
        stopHandler();
        navigate('/vacancies');
      },
      matchInterim: true,
    },
    {
      command: 'Чат',
      callback: () => {
        stopHandler();
        navigate('/chat');
      },
      matchInterim: true,
    },
  ];

  const clickHandler = () => {
    stopHandler();
    navigate(`/lkCandidate/candidate/resume/${user.id}`);
  };

  const {
    listening,
  } = useSpeechRecognition({ commands });

  return (
    <div className="container">
      <br />
      <p>
        Микрофон:
        {' '}
        {listening ? '🟢' : '🔴'}
      </p>
      {resume?.name ? (
        <>
          <Box marginTop={5}>
            <Paper elevation={3}>
              <Divider>РЕЗЮМЕ КАНДИДАТА</Divider>
              <Typography fontSize={25}>
                {user.name?.toUpperCase()}
              </Typography>
              <Typography>
                {resume?.age !== 0 ? `${setAge(resume.age)}, ${resume?.location}` : `Не указано, ${resume?.location}`}
              </Typography>
              <Divider variant="inset" />
              <Typography>
                {resume?.sphere}
              </Typography>
              <br />
              <Typography>
                О кандидате:
              </Typography>
              <Paper variant="outlined">
                {resume?.about}
              </Paper>
              <br />
              <Typography>
                {`Ожидаемый уровень заработной платы: ${resume?.salary} руб.`}
              </Typography>
              <br />
              <Divider textAlign="left">КОНТАКТЫ</Divider>
              <Typography>
                {user.email}
              </Typography>
              <Typography>
                {resume?.phoneNumber !== 0 ? resume?.phoneNumber : 'Не указан'}
              </Typography>
            </Paper>
          </Box>
          {/* <Button id="createResume" type="click" variant="outlined" onClick={clickHandler}>
            РЕДАКТИРОВАТЬ РЕЗЮМЕ
          </Button> */}
        </>
      ) : (<></>
      )}
      <Button id="createResume" type="click" variant="outlined" onClick={clickHandler}>
        СОЗДАТЬ/РЕДАКТИРОВАТЬ РЕЗЮМЕ
      </Button>
    </div>
  );
}
