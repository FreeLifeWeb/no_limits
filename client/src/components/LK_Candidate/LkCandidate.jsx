import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import {
  Paper, Typography, Box, Link, Divider,
} from '@mui/material';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

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
  const [resume, setResume] = useState(null);

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
    axios(`candidate/resume/get/${user.id}`)
      .then((res) => setResume(res.data));
    startSpeach('Нажмите enter, чтобы составить резюме');
    const withResume = document.getElementById('editResume');
    const withoutResume = document.getElementById('createResume');
    withoutResume.focus();
  }, []);

  return (
    <div className="container">
      {resume ? (
        <>
          <Box marginTop={5}>
            <Paper elevation={3}>
              <Divider>РЕЗЮМЕ КАНДИДАТА</Divider>
              <Typography fontSize={25}>
                {resume.name?.toUpperCase()}
              </Typography>
              <Typography>
                {resume.age !== 0 ? `${setAge(resume.age)}, ${resume.location}` : `Не указано, ${resume.location}`}
              </Typography>
              <Divider variant="inset" />
              <Typography>
                {resume.sphere}
              </Typography>
              <br />
              <Typography>
                О кандидате:
              </Typography>
              <Paper variant="outlined">
                {resume.about}
              </Paper>
              <br />
              <Typography>
                {`Ожидаемый уровень заработной платы: ${resume.salary} руб.`}
              </Typography>
              <br />
              <Divider textAlign="left">КОНТАКТЫ</Divider>
              <Typography>
                {resume.email ? resume.email : 'Не указан'}
              </Typography>
              <Typography>
                {resume.phoneNumber !== 0 ? resume.phoneNumber : 'Не указан'}
              </Typography>
            </Paper>
          </Box>
          <NavLink to={`/candidate/resume/${user.id}`}>
            <Button id="createResume" type="click" variant="outlined">
              СОЗДАТЬ РЕЗЮМЕ
            </Button>
          </NavLink>
        </>
      ) : (
        <NavLink to={`/candidate/resume/${user.id}`}>
          <Button id="createResume" type="click" variant="outlined">
            СОЗДАТЬ РЕЗЮМЕ
          </Button>
        </NavLink>
      )}

    </div>
  );
}
