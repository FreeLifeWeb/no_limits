import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { getResumes } from '../../redux/slices/resumesSlice';
import { getVacancies } from '../../redux/slices/vacanciesSlice';
import MainPageVacansyCard from '../UI/mainPagecards/MainPageVacansyCard';
import MainPageResumeCard from '../UI/mainPagecards/MainPageResumeCard';
import { getSphereList } from '../../redux/slices/sphereListSlice';

export default function MainPage() {
  const synth = window.speechSynthesis;
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const vacansies = useSelector((state) => state.vacancies);
  const resumes = useSelector((state) => state.resumes);
  const dispatch = useDispatch();
  let voices = [];

  const comands = { // фразы для озвучивания и подсказок
    greeting: 'Добро пожаловать на сайт Без ограничений, Вам доступно голосовое управление. Чтобы включить микрофон нажмите пробел',
    allComandsForAll: 'Вам доступны следующие команды: Открыть Вакансии и Зарегистрироваться',
    allComands: 'Вам доступны следующие команды: Открыть Вакансии и Открыть Личный кабинет',
  };

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

  const pressListener = (event) => {
    if (event.code === 'Space') {
      if (user) {
        startSpeach(comands.allComands);
      } else {
        startSpeach(comands.allComandsForAll);
      }
      setTimeout(() => {
        SpeechRecognition.startListening({ continuous: true, language: 'ru-RU' });
      }, 6000);
    }
  };

  useEffect(() => {
    dispatch(getVacancies());
    dispatch(getResumes());
    dispatch(getSphereList());
  }, []);

  useEffect(() => { // сообщение при отсутствии поддержки WEB SPEECH API
    if (user?.status !== 'employer') {
      startSpeach(comands.greeting);
      document.addEventListener('keypress', pressListener);
    }
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert('К сожалению Ваш браузер не поддерживает этот функционал голосового управления!');
    }

    return () => {
      SpeechRecognition.stopListening();
      document.removeEventListener('keypress', pressListener);
    };
  }, []);

  const commands = [
    {
      command: 'Вакансии',
      callback: () => navigate('/vacancies'),
      matchInterim: true,
    },
    {
      command: 'Открыть Личный кабинет',
      callback: () => navigate(`/lkCandidate/${user.id}`),
      matchInterim: true,
    },
    {
      command: 'Зарегистрироваться',
      callback: () => navigate('/reg'),
      matchInterim: true,
    },
  ];
  const { transcript } = useSpeechRecognition({ commands });

  return (
    <>
      <div style={{
        textAlign: 'center',
        height: '400px',
        backgroundColor: 'rgb(254, 171, 6)',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
      >
        <span style={{ color: 'white', fontSize: '32px', marginBottom: '50px' }}>
          Сервис поиска работы
          {' '}
          <strong>Без ограничений</strong>
        </span>
        <Button
          type="submit"
          variant="contained"
          onClick={() => {
            navigate('/reg');
          }}
        >
          Войти/Зарегистрироваться
        </Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f44336' }}>
        <Container sx={{
          display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', paddingTop: '35px',
        }}
        >
          <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '30px' }}>Вакансии</span>
            {vacansies.map((vac) => <MainPageVacansyCard key={vac.id} vac={vac} />)}
          </Container>

          <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '30px' }}>Специалисты</span>
            {resumes.map((resume) => <MainPageResumeCard key={resume.id} vac={resume} />)}
          </Container>
        </Container>
      </div>
    </>
  );
}
