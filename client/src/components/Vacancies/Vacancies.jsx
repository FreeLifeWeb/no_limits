import {
  Box, Button, Card, CardActions, CardContent, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import useKeypress from 'react-use-keypress';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getVacancies } from '../../redux/slices/vacanciesSlice';
import { getResponses } from '../../redux/slices/responsesSlice';

export default function Vacancies() {
  const synth = window.speechSynthesis;
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const startSpeach = (sentence) => {
    const voices = synth.getVoices();

    const milena = voices.find((voice) => voice.name === 'Milena');
    const utterThis = new SpeechSynthesisUtterance(sentence);
    utterThis.voice = milena;
    utterThis.pitch = 1;
    utterThis.rate = 1;
    // utterThis.onerror = (event) => {
    //   console.error('SpeechSynthesisUtterance.onerror', event);
    // };
    synth.speak(utterThis);
  };

  const vacancies = useSelector((store) => store.vacancies);
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [vacancy, setVacancy] = useState(null);

  const speak = () => {
    startSpeach(
      `Должность --- ${vacancy?.title}
       ---
       Компания --- ${vacancy?.company}
       ---
       Формат  --- ${vacancy?.format}
       ---
       Заработная плата -- ${vacancy?.salary} рублей
      `,
    );
  };

  const startHandler = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'ru-RU' });
  };

  const stopHandler = () => {
    SpeechRecognition.abortListening();
  };

  const commands = [
    {
      command: 'Личный кабинет',
      callback: () => {
        stopHandler();
        navigate(`/lkCandidate/${user.id}`);
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

  const {
    listening,
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    dispatch(getVacancies());
  }, []);

  useEffect(() => {
    setVacancy(vacancies[index]);
  }, [index, vacancies]);

  useEffect(() => {
    if (index) {
      if (user?.status !== 'employer') {
        speak();
      }
    }
  }, [vacancy?.title]);

  useEffect(() => {
    if (index === 0) {
      if (user?.status !== 'employer') {
        startSpeach(
          `Для прослушивания вакансии --- нажмите Пробел
         ----
         Чтобы листать вакансии --- используйте клавиши вверх и вниз
         ---
         Вам доступны команды "Чат" и "Личный кабинет"`,
        );
      }
    }
    startHandler();
  }, [index]);

  const clickHandler = () => {
    if (user?.status !== 'employer') {
      speak();
    }
  };

  const prevHandler = () => {
    if (index) {
      setIndex((prev) => prev - 1);
      setVacancy(vacancies[index]);
    }
  };

  const nextHandler = () => {
    if (index < vacancies.length - 1) {
      setIndex((prev) => prev + 1);
      setVacancy(vacancies[index]);
    }
  };
  const responseHandler = (id) => {
    axios.post(`/api/response/${id}`)
      .then(dispatch(getResponses(id)))
      .then(startSpeach('ваше резюме отправлено'));
    // .catch(console.log('error'));
  };

  useKeypress([' ', 'ArrowUp', 'ArrowDown'], (e) => {
    if (e.key === ' ') {
      if (user?.status !== 'employer') {
        speak();
      }
    }
    if (e.key === 'ArrowUp') {
      nextHandler();
    }
    if (e.key === 'ArrowDown') {
      prevHandler();
    }
  });

  return (
    <Box sx={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh',
    }}
    >
      <Typography marginTop={3}>
        Microphone:
        {' '}
        {listening ? 'on' : 'off'}
      </Typography>
      <Card>
        <CardContent sx={{ Width: '50%', height: '50%' }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Должность:
            {' '}
            {vacancy?.title}
          </Typography>
          <Typography variant="h5" component="div">
            Компания:
            {' '}
            {vacancy?.company}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Формат:
            {' '}
            {vacancy?.format}
          </Typography>
          <Typography variant="body2">
            Заработная плата:
            {' '}
            {vacancy?.salary}
            {' '}
            рублей
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => responseHandler(vacancy?.id)}
          >
            Откликнуться
          </Button>
          {(index < vacancies.length - 1) ? (
            <Button
              type="button"
              onClick={() => {
                nextHandler();
              }}
              size="small"
            >
              Далее
            </Button>
          ) : (<></>)}
          {index ? (
            <Button
              type="button"
              onClick={() => {
                prevHandler();
              }}
              size="small"
            >
              Назад
            </Button>
          ) : (<></>)}
          <Button
            type="button"
            onClick={(e) => clickHandler(e)}
            size="small"
          >
            прослушать
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
