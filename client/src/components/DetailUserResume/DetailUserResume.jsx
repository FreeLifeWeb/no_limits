/* eslint-disable max-len */
// import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {
  Button, FormGroup, TextField, Typography,
} from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
// import { getResume, setResume } from '../../redux/slices/resumeSlice';

const synth = window.speechSynthesis;
let voices = [synth];

export default function Test() {
  // const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  // const resume = useSelector((store) => store.resume);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    // eslint-disable-next-line react/no-unescaped-entities
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const toSpeak = {
    name: 'Пожалуйста, назовите Ваше полное имя',
    age: 'Пожалуйста, назовите Ваш возраст',
    email: 'Пожалуйста, продиктуйте адрес Вашей электронной почты',
    phoneNumber: 'Пожалуйста, продиктуйте Ваш телефонный номер',
    location: 'Пожалуйста, назовите город, в котором Вы находитесь',
    sphere: 'Пожалуйста, назовите свою специальность',
    about: 'Пожалуйста, расскажите вкратце о себе, своем образовании и опыте работы',
    salary: 'Пожалуйста, укажите ожидаемый уровень заработной платы',
    submit: 'Нажмите enter, чтобы сохранить резюме',
  };

  /// //////////////////////////////////////////////////

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

  /// ///////////////////////////////////////
  // -----------------handlers-----------
  const startHandler = () => {
    // (id === 'email')
    //   ? SpeechRecognition.startListening({ continuous: true, language: 'en-US' })
    SpeechRecognition.startListening({ continuous: true, language: 'ru-RU' });
  };

  const stopHandler = () => {
    SpeechRecognition.stopListening();
  };

  const resetHandler = () => {
    resetTranscript();
  };
  //-------------------------------------
  const [resume, setResume] = useState({});
  //   const [currId, setCurrId] = useState('name');

  const focusHandler = (id) => {
    console.log('focus');
    resetHandler();
    const field = toSpeak[id];
    startSpeach(field);
    startHandler();
    //     // console.log(id);
    // const example = document.getElementById('email');
    // example.focus();
    // console.log(example);
    // this.blur();
  };

  const enterHandler = (e, id) => {
    // dispatch(setResume({ ...resume, [e.target.name]: e.target.value }));
    console.log('enter');
    e.preventDefault();
    stopHandler();
    console.log(e.target, 'kkkkkkkkkkkkkkkkkkkkkkkk');

    setResume({ ...resume, [e.target.name]: e.target.value });
    console.log(resume, 'enter resume');
    const example = document.getElementById(id);
    example.focus();
  };

  //------------------------

  //   const commands = [
  //     {
  //       command: 'Начать',
  //       callback: () => {
  //         // console.log('start');
  //         resetHandler();
  //         // const trying = element.id;
  //         // console.log(trying);
  //         const example = document.getElementById('name');
  //         example.focus();
  //         // onEnter();
  //       },
  //       matchInterim: true,
  //     },
  //     {
  //       command: 'Назад',
  //       callback: () => {
  //         console.log('back');
  //       },
  //       matchInterim: true,
  //     },
  //   ];

  //   useSpeechRecognition({ commands });
  const greeting = 'Скажите "начать", чтобы приступить к созданию резюме, скажите "назад" если хотите вернуться в личный кабинет';
  // после заполненпия поля нажимайте энтер
  //   useEffect(() => {
  //     startSpeach('начать');
  //     SpeechRecognition.startListening({ continuous: true, language: 'ru-RU' });

  //     // const example = document.getElementById('fullname');
  //     // example.focus();
  //   }, []);

  useEffect(() => {
    // console.log(currId, 'uuuseeeeffectttt');
    const example = document.getElementById('name');
    example.focus();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(getResume(userId));
    axios.post(`candidate/resume/${user.id}`, resume)
      .then(() => {
        window.location.href = '/lkCandidate';
        console.log('done');
      });
  };

  //   //   const { transcript } = useSpeechRecognition({ commands });
  //   const { transcript } = useSpeechRecognition();

  //   useEffect(() => {
  //     SpeechRecognition.startListening();
  //   }, []);

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <FormGroup>
          <p>
            Microphone:
            {' '}
            {listening ? 'on' : 'off'}
          </p>

          <TextField
            id="name"
            label="Ф.И.О"
            name="name"
            value={resume.name || transcript}
            onFocus={() => focusHandler('name')}
            onKeyDown={(event) => enterHandler(event, 'age')}
          />
          {' '}
          <br />
          <TextField
            id="age"
            name="age"
            label="Возраст"
            type="text"// не записываются данные иначе
            value={resume.age || transcript}
            onFocus={() => focusHandler('age')}
            onKeyDown={(event) => enterHandler(event, 'email')}
          />
          <br />
          <TextField
            id="email"
            name="email"
            label="Email"
            type="text"// не записываются данные иначе
            value={resume.email || transcript}
            onFocus={() => focusHandler('email')}
            onKeyDown={(event) => enterHandler(event, 'phoneNumber')}
          />
          <br />

          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Номер телефона"
            type="text"
            value={resume.phoneNumber || transcript}
            onFocus={() => focusHandler('phoneNumber')}
            onKeyDown={(event) => enterHandler(event, 'location')}
          />
          <br />

          <TextField
            name="location"
            label="Город"
            type="text"
            id="location"
            value={resume.location || transcript}
            onFocus={() => focusHandler('location')}
            onKeyDown={(event) => enterHandler(event, 'sphere')}
          />
          <br />

          <TextField
            name="sphere"
            label="Специальность"
            type="text"
            id="sphere"
            value={resume.sphere || transcript}
            onFocus={() => focusHandler('sphere')}
            onKeyDown={(event) => enterHandler(event, 'about')}
          />
          <br />

          <TextField
            name="about"
            label="Образование и опыт"
            type="text"
            id="about"
            value={resume.about || transcript}
            onFocus={() => focusHandler('about')}
            onKeyDown={(event) => enterHandler(event, 'salary')}
          />
          <br />

          <TextField
            name="salary"
            label="Заработная плата"
            type="text"
            id="salary"
            value={resume.salary || transcript}
            onFocus={() => focusHandler('salary')}
            onKeyDown={(event) => enterHandler(event, 'submit')}
          />
          <br />
          <Button
            type="submit"
            id="submit"
            variant="contained"
            onFocus={() => focusHandler('submit')}

          >
            Сохранить

          </Button>

        </FormGroup>
      </form>
    </div>
  );
}

// { /* <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
//             Пожалуйста, назовите Ваш возраст.
//           </Typography>
//           <TextField
//             name="age"
//             label="Age"
//             type="number"
//           />
//           <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
//             Пожалуйста, продиктуйте адрес Вашей электронной почты.
//           </Typography>
//           <TextField
//             name="email"
//             label="Email"
//             type="email"
//           />
//           <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
//             Пожалуйста, продиктуйте Ваш телефонный номер.
//           </Typography>
//           <TextField
//             name="number"
//             label="Phone Number"
//             type="number"
//           />
//           <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
//             Пожалуйста, назовите город, в котором Вы находитесь.
//           </Typography>
//           <TextField
//             name="city"
//             label="City"
//             type="text"
//           />
//           <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
//             Пожалуйста, назовите свою специальность.
//           </Typography>
//           <TextField
//             name="occupation"
//             label="Occupation"
//             type="text"
//           />
//           <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
//             Пожалуйста, расскажите вкратце о себе, своем образовании и опыте работы.
//           </Typography>
//           <TextField
//             name="about"
//             label="About"
//             type="text"
//           />
//           <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
//             Пожалуйста, укажите ожидаемый уровень заработной платы.
//           </Typography>
//           <TextField
//             name="salary"
//             label="Salary"
//             type="number"
//           />
//           <Button type="submit" variant="contained">Сохранить</Button> */ }
