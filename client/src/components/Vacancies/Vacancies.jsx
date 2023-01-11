import {
  Box, Button, Card, CardActions, CardContent, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import useKeypress from 'react-use-keypress';
import { useDispatch, useSelector } from 'react-redux';
import { getVacancies } from '../../redux/slices/vacanciesSlice';

export default function Vacancies() {
  const synth = window.speechSynthesis;
  const startSpeach = (sentence) => {
    const utterThis = new SpeechSynthesisUtterance(sentence);
    utterThis.pitch = 0;
    utterThis.rate = 0;
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

  useEffect(() => {
    dispatch(getVacancies());
  }, []);

  useEffect(() => {
    setVacancy(vacancies[index]);
  }, [index, vacancies]);

  useEffect(() => {
    if (index) {
      speak();
    }
  }, [vacancy?.title]);

  useEffect(() => {
    if (index === 0) {
      startSpeach(
        `Для прослушивания вакансии --- нажмите Пробел
         ----
         Чтобы листать вакансии --- используйте клавиши вверх и вниз`,
      );
    }
  }, [index]);

  const clickHandler = () => {
    speak();
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

  useKeypress([' ', 'ArrowUp', 'ArrowDown'], (e) => {
    if (e.key === ' ') {
      speak();
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
          <Button size="small">Откликнуться</Button>
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
