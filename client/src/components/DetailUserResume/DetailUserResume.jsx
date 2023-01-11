import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {
  Button, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, TextField,
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

const synth = window.speechSynthesis;
let voices = [synth];

export default function Test() {
  const user = useSelector((store) => store.user);

  // -----------------handlers-----------
  const startHandler = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'ru-RU' });
  };

  const stopHandler = () => {
    SpeechRecognition.abortListening();
  };

  const commands = [
    {
      command: 'Начать',
      callback: () => {
        stopHandler();
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

  const DICTIONARY = {
    точка: '.',
    запятая: ',',
    вопрос: '?',
    восклицание: '!',
    двоеточие: ':',
    тире: '-',
    абзац: '\n',
    абзацы: '\n',
    отступ: '\t',
    кавычка: '"',
    кавычки: '"',
  };

  function editInterim(s) {
    return s
      .split(' ')
      .map((word) => {
        word = word.trim();
        return DICTIONARY[word.toLowerCase()] ? DICTIONARY[word.toLowerCase()] : word;
      })
      .join(' ');
  }

  const resetHandler = () => {
    resetTranscript();
  };

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

  const greeting = 'Для заполнения полей используйте клавишу enter, cкажите "начать", чтобы приступить к созданию резюме скажите "назад" если хотите вернуться в личный кабинет';

  useEffect(() => {
    startSpeach(greeting);
    setTimeout(() => {
      startHandler();
    }, 10500);

    axios('candidate/resume/spheres')
      .then((res) => setSphereList(res.data));
  }, []);

  const focusHandler = (id, time) => {
    resetHandler();
    const field = toSpeak[id];
    startSpeach(field);
    setTimeout(() => {
      setFocus((prev) => ({ ...prev, [id]: true }));
      startHandler();
    }, time);
  };

  const enterHandler = (e, nextId, currId) => {
    if (e.key === 'Enter') {
      stopHandler();
      e.preventDefault();
      setFocus((prev) => ({ ...prev, [currId]: false }));
      setResume({ ...resume, [e.target.name]: editInterim(transcript) });
      const example = document.getElementById(nextId);
      example.focus();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(`candidate/resume/${user.id}`, resume);
    window.location.href = ` /lkCandidate/${user.id}`;
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
        <FormGroup sx={{ flexGrow: 1, borderRadius: '11px', marginTop: '10px' }}>
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
            onFocus={() => focusHandler('name', 2500)}
            onKeyDown={(event) => enterHandler(event, 'age', 'name')}
          />
          {' '}
          <br />
          <TextField
            id="age"
            name="age"
            label="Возраст"
            type="text"
            value={(focus.age ? transcript : resume.age)}
            onFocus={() => focusHandler('age', 2500)}
            onKeyDown={(event) => enterHandler(event, 'phoneNumber', 'age')}
          />
          <br />
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Номер телефона"
            type="text"
            value={(focus.phoneNumber ? transcript : resume.phoneNumber)}
            onFocus={() => focusHandler('phoneNumber', 2700)}
            onKeyDown={(event) => enterHandler(event, 'location', 'phoneNumber')}
          />
          <br />

          <TextField
            name="location"
            label="Город"
            type="text"
            id="location"
            value={(focus.location ? transcript : resume.location)}
            onFocus={() => focusHandler('location', 3000)}
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
            multiline
            maxRows={8}
            name="about"
            label="Образование и опыт"
            type="text"
            id="about"
            value={(focus.about ? editInterim(transcript) : resume.about)}
            onFocus={() => focusHandler('about', 4500)}
            onKeyDown={(event) => enterHandler(event, 'salary', 'about')}
          />
          <br />

          <TextField
            name="salary"
            label="Заработная плата"
            type="text"
            id="salary"
            value={(focus.salary ? transcript : resume.salary)}
            onFocus={() => focusHandler('salary', 3000)}
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
