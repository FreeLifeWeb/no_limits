/* eslint-disable max-len */
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import {
  Paper, Typography, Box, Link, Divider,
} from '@mui/material';

const synth = window.speechSynthesis;
let voices = [synth];

const resumeExample = {
  name: 'Surname Name FatherName',
  age: 23,
  email: 'someemail@mail.ru',
  phoneNumber: 89286326596,
  location: 'Москва',
  about: `
  Создаю to do приложение на React, Необходимо создать карточку в списке. Не понимаю как добавить новую карточку, а не обновить текущу. 
   Получается такая структура, но мне нужно чтобы в listItem создавались отдельные обьекты под каждый cardName`,
  salary: 200000,
  sphere: 'Нанотехнологии', // не отправляется в бд потому что не нашел сферу
};

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

  useEffect(() => {
    startSpeach('Нажмите enter, чтобы составить резюме');
    const example = document.getElementById('createResume');
    example.focus();
  }, []);

  return (
  // если резюме создано, то поменять на кнопку изменить и отобразить его на странице
  // но как проверить, что оно создано?
  // можно сделать отдельный запрос на бек, который проверит, есть ли резюме у юзера с таким айдишником, если да
  // то вот так вот
    <div className="container">
      <Box>
        <Paper elevation={3}>
          <Divider>РЕЗЮМЕ КАНДИДАТА</Divider>
          <Typography>
            {resumeExample.name.toUpperCase()}
          </Typography>
          <Typography>
            {`${setAge(resumeExample.age)}, ${resumeExample.location}`}
          </Typography>
          <Divider variant="inset" />
          <Typography>
            {resumeExample.sphere}
          </Typography>
          <Typography>
            О кандидате:
          </Typography>
          <Paper variant="outlined">
            {resumeExample.about}
          </Paper>
          <Divider textAlign="left">КОНТАКТЫ</Divider>
          <Typography>
            {resumeExample.email}
          </Typography>
          <Typography>
            {resumeExample.phoneNumber}
          </Typography>
        </Paper>
      </Box>
      <Link href={`candidate/resume/${user.id}`}>
        <Button id="createResume" variant="outlined">
          СОЗДАТЬ РЕЗЮМЕ
        </Button>
      </Link>
    </div>
  );
}
