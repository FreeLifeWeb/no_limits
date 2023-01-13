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
  const user = useSelector((state) => state.user);
  const vacancies = useSelector((store) => store.vacancies);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const synth = window.speechSynthesis;

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

  const [index, setIndex] = useState(0);
  const [vacancy, setVacancy] = useState(null);

  const speak = () => {
    startSpeach(
      `
       Должность, ${vacancy?.title},,
       Компания, ${vacancy?.company},,
       Город, ${vacancy?.city},,
       Формат,  ${vacancy?.format},,
       Заработная плата, ${vacancy?.salary} рублей
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
          `
           Для прослушивания вакансии, нажмите Пробел,,
           Чтобы листать вакансии, используйте клавиши вправо и влево,,
           Чтобы отправить резюме, нажмите на клавишу стрелки вверх
          `,
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
    user ? (
      axios.post(`/api/response/${id}`)
        .then(dispatch(getResponses(id)))
        .then(startSpeach('ваше резюме отправлено'))
    // .catch(console.log('error'));
    ) : (navigate('/reg'));
  };

  useKeypress([' ', 'ArrowRight', 'ArrowLeft', 'ArrowUp'], (e) => {
    if (e.key === ' ') {
      if (user?.status !== 'employer') {
        speak();
      }
    }
    if (e.key === 'ArrowRight') {
      nextHandler();
    }
    if (e.key === 'ArrowLeft') {
      prevHandler();
    }
    if (e.key === 'ArrowUp' && user?.status !== true) {
      if (user?.status !== 'employer') responseHandler(vacancy.id);
    }
  });

  return (
    <Box sx={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh',
    }}
    >
      {vacancy?.title ? (
        <Card
          sx={{
            marginTop: '1%',
            marginLeft: '30%',
            marginRight: '30%',
            border: '3px solid #78866b',
            padding: '10px',
            flexGrow: 1,
            borderRadius: '11px',
            backgroundColor: 'white',
          }}
        >
          <CardContent sx={{ Width: '60%', height: '50%' }}>
            <br />
            <Typography className="vacName" variant="h3">
              {vacancy?.title}
            </Typography>
            <br />
            <Typography variant="h4">
              {vacancy?.company}
            </Typography>
            <br />
            <Typography variant="h5">
              {vacancy?.city}
            </Typography>
            <br />
            <Typography sx={{ mb: 1.5 }} variant="h5">
              {vacancy?.format}
            </Typography>
            <br />
            <Typography variant="h5">
              {vacancy?.salary}
              {' '}
              рублей
            </Typography>
          </CardContent>
          <CardActions>
            {(user?.status !== 'employer') ? (
              <>
                <br />
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    responseHandler(vacancy?.title);
                  }}
                >
                  Откликнуться
                </Button>
                <Button
                  type="button"
                  onClick={() => clickHandler()}
                  size="small"
                  variant="outlined"
                  sx={{ marginRight: '45%' }}
                >
                  прослушать
                </Button>
              </>
            ) : (<></>)}

            {(index < vacancies.length - 1) ? (
              <>
                <br />
                <Button
                  variant="outlined"
                  type="button"
                  onClick={() => {
                    nextHandler();
                  }}
                  size="small"
                >
                  Далее
                </Button>
              </>
            ) : (<></>)}
            {index ? (
              <>
                <br />
                <Button
                  type="button"
                  onClick={() => {
                    prevHandler();
                  }}
                  size="small"
                >
                  Назад
                </Button>
              </>
            ) : (<></>)}
          </CardActions>
        </Card>
      ) : (
        <Box>
          Доступных вакансий нет
        </Box>
      )}

    </Box>
  );
}
