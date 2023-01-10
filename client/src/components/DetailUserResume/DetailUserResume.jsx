/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {
  Button, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, Select, TextField, Typography,
} from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const synth = window.speechSynthesis;
let voices = [synth];

export default function Test() {
  // const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  // const resume = useSelector((store) => store.resume);

  const commands = [
    {
      command: 'Начать',
      callback: () => {
        const example = document.getElementById('name');
        example.focus();
      },
      matchInterim: true,
    },
    {
      command: 'Назад',
      callback: () => {
        window.location.href = '/lkCandidate';
      },
      matchInterim: true,
    },
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    // eslint-disable-next-line react/no-unescaped-entities
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const toSpeak = {
    name: 'Пожалуйста, назовите Ваше полное имя',
    age: 'Назовите Ваш возраст',
    email: 'Продиктуйте адрес Вашей электронной почты',
    phoneNumber: 'Продиктуйте Ваш телефонный номер',
    location: 'Назовите город, в котором Вы находитесь',
    // sphere: 'Выберите свою специальность. Используйте кнопки "вверх", "вниз", "вперед", "назад" для навигации и "пробел" для выбора',
    about: 'Расскажите вкратце о себе, своем образовании и опыте работы',
    salary: 'Укажите ожидаемый уровень заработной платы',
    submit: 'Нажмите enter, чтобы сохранить резюме',
    'Информационные технологии': 'Выберите свою специальность. Используйте кнопки "вверх", "вниз", "вперед", "назад" для навигации и "пробел" для выбора. Информационные технологии',
    'Общественное питание': 'Общественное питание',
    Строительство: 'Строительство',
    'Медицинские и оздоровительные услуги': 'Медицинские и оздоровительные услуги',
    'Консалтинговые услуги: экономика, маркетинг': 'Консалтинговые услуги: экономика, маркетинг',
    'Инжиниринг и научный консалтинг': 'Инжиниринг и научный консалтинг',
    'Сфера развлечений': 'Сфера развлечений',
    'Аграрный бизнес': 'Аграрный бизнес',
    'Индустрия красоты': 'Индустрия красоты',
    'Бытовые услуги': 'Бытовые услуги',
    Логистика: 'Логистика',
    Прочее: 'Прочее',
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

  // ------------------states---------------
  const [resume, setResume] = useState({
    name: '',
    age: '',
    // email: '',
    phoneNumber: '',
    location: '',
    sphere: '',
    about: '',
    salary: '',
  });
  const [focus, setFocus] = useState({
    name: false,
    age: false,
    email: false,
    phoneNumber: false,
    location: false,
    sphere: false,
    about: false,
    salary: false,
  });
  const [sphereList, setSphereList] = useState([]);
  const [currSphere, setCurrSphere] = useState('');

  // -----------------handlers-----------
  const startHandler = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'ru-RU' });
  };

  const stopHandler = () => {
    SpeechRecognition.stopListening();
  };

  const resetHandler = () => {
    resetTranscript();
  };

  const greeting = 'Для заполнения полей используйте клавишу enter, cкажите "начать", чтобы приступить к созданию резюме скажите "назад" если хотите вернуться в личный кабинет';

  useEffect(() => {
    startSpeach(greeting);
    setTimeout(() => {
      startHandler();
    }, 11000);

    axios('candidate/resume/spheres')
      .then((res) => setSphereList(res.data));
  }, []);

  const focusHandler = (id) => {
    setFocus((prev) => ({ ...prev, [id]: true }));
    console.log(focus);
    resetHandler();
    const field = toSpeak[id];
    startSpeach(field);
    startHandler();
  };

  const enterHandler = (e, nextId, currId) => {
    if (e.key === 'Enter') {
      // dispatch(setResume({ ...resume, [e.target.name]: e.target.value }));
      console.log('enter');
      e.preventDefault();
      setFocus((prev) => ({ ...prev, [currId]: false }));
      setResume({ ...resume, [e.target.name]: transcript });
      console.log(resume, 'enter resume');
      const example = document.getElementById(nextId);
      example.focus();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(`candidate/resume/${user.id}`, resume);
    window.location.href = '/lkCandidate';
  };

  const optionFocusHandler = (id) => {
    const field = toSpeak[id];
    startSpeach(field);
  };

  const radioHandler = (e, prevRadio, nextRadio) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      const example = document.getElementById(nextRadio);
      example.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      const example = document.getElementById(prevRadio);
      example.focus();
    }
  };

  const sphereHandler = (e) => {
    e.preventDefault();
    setCurrSphere(e.target.value);
    setResume({ ...resume, sphere: e.target.value });
    const example = document.getElementById('about');
    example.focus();
  };

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
            value={(focus.name ? transcript : resume.name)}
            onFocus={() => focusHandler('name')}
            onKeyDown={(event) => enterHandler(event, 'age', 'name')}
          />
          {' '}
          <br />
          <TextField
            id="age"
            name="age"
            label="Возраст"
            type="text"// не записываются данные иначе
            value={(focus.age ? transcript : resume.age)}
            onFocus={() => focusHandler('age')}
            onKeyDown={(event) => enterHandler(event, 'phoneNumber', 'age')}
          />
          <br />
          {/* <TextField
            id="email"
            name="email"
            label="Email"
            type="text"// не записываются данные иначе
            value={(focus.email ? transcript : resume.email)}
            onFocus={() => focusHandler('email')}
            onKeyDown={(event) => enterHandler(event, 'phoneNumber', 'email')}
          />
          <br /> */}

          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Номер телефона"
            type="text"
            value={(focus.phoneNumber ? transcript : resume.phoneNumber)}
            onFocus={() => focusHandler('phoneNumber')}
            onKeyDown={(event) => enterHandler(event, 'location', 'phoneNumber')}
          />
          <br />

          <TextField
            name="location"
            label="Город"
            type="text"
            id="location"
            value={(focus.location ? transcript : resume.location)}
            onFocus={() => focusHandler('location')}
            onKeyDown={(event) => enterHandler(event, 'radio1', 'location')}
          />
          <br />
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="sphere"
              label="Специальность"
              id="sphere"
              value={currSphere}
              onChange={sphereHandler}
            >
              {sphereList.map((el, i, arr) => (
                <FormControlLabel
                  value={el.title}
                  id={`radio${el.id}`}
                  name={el.title}
                  control={<Radio />}
                  label={el.title}
                  onFocus={() => optionFocusHandler(el.title)}
                  onKeyDown={(e) => radioHandler(e, `radio${arr[i - 1]?.id}`, `radio${arr[i + 1]?.id}`)}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <br />

          <TextField
            name="about"
            label="Образование и опыт"
            type="text"
            id="about"
            value={(focus.about ? transcript : resume.about)}
            onFocus={() => focusHandler('about')}
            onKeyDown={(event) => enterHandler(event, 'salary', 'about')}
          />
          <br />

          <TextField
            name="salary"
            label="Заработная плата"
            type="text"
            id="salary"
            value={(focus.salary ? transcript : resume.salary)}
            onFocus={() => focusHandler('salary')}
            onKeyDown={(event) => enterHandler(event, 'submit', 'salary')}
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
