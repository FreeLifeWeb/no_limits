import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSelector } from 'react-redux';

export default function MainPage() {
  const synth = window.speechSynthesis;
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  let voices = [];

  const comands = { // фразы для озвучивания и подсказок
    greeting: 'Добро пожаловать на сайт Без ограничений, Вам доступно голосовое управление. Чтобы включить микрофон нажмите пробел',
    allComands: 'Вам доступны следующие команды: Открыть Вакансии и Зарегистрироваться',
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
      startSpeach(comands.allComands);
      setTimeout(() => {
        SpeechRecognition.startListening({ continuous: true, language: 'ru-RU' });
      }, 3000);
    }
  };

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
    };
  }, []);

  const commands = [
    {
      command: 'Открыть Вакансии',
      callback: () => navigate('/vacancies'),
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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Container sx={{ textAlign: 'center' }}>
        Сервис поиска работы Без ограничений
      </Container>
      <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween' }}>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          Список вакансий
        </Container>

        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          Список специалистов
        </Container>
      </Container>
    </div>
  );
}
