import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {
  Button, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, TextField, Typography, Box,
} from '@mui/material';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setResume } from '../../redux/slices/resumeSlice';

const synth = window.speechSynthesis;
let voices = [synth];

export default function Test() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // ------------------states---------------
  const [inputs, setInputs] = useState({
    age: '',
    phoneNumber: '',
    location: '',
    sphere: '',
    about: '',
    salary: '',
  });
  const [focus, setFocus] = useState({
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
    SpeechRecognition.abortListening();
  };

  const commands = [
    {
      command: 'Начать',
      callback: () => {
        stopHandler();
        const example = document.getElementById('age');
        example.focus();
      },
      matchInterim: true,
    },
    {
      command: 'Назад',
      callback: () => {
        stopHandler();
        navigate(`/lkCandidate/${user.id}`);
      },
      matchInterim: true,
    },
    {
      command: 'Отмена',
      callback: () => {
        clearInput();
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

  function clearInput() {
    resetTranscript();
  }

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

  const greeting = 'Для, заполнения полей, используйте клавишу enter,, чтобы приступить к созданию резюме, произнесите "начать",, если хотите вернуться в личный кабинет, скажите "назад",, чтобы отчистить поле ввода, скажите "отмена". ';

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
      setInputs({ ...inputs, [e.target.name]: editInterim(transcript) });
      const example = document.getElementById(nextId);
      example.focus();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    stopHandler();
    axios.post(`candidate/resume/${user.id}`, inputs)
      .then((res) => dispatch(setResume(res.data)));
    navigate(`/lkCandidate/${user.id}`);
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
    setInputs({ ...inputs, sphere: e.target.value });
    const example = document.getElementById('about');
    example.focus();
  };

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <FormGroup sx={{
          flexGrow: 1,
          borderRadius: '11px',
          marginTop: '12px',
          backgroundColor: 'white',
          padding: '14px',
        }}
        >
          <p>
            Микрофон:
            {' '}
            {listening ? '🟢' : '🔴'}
          </p>
          <TextField
            id="age"
            name="age"
            label="Возраст"
            type="text"
            value={(focus.age ? transcript : inputs.age)}
            onFocus={() => focusHandler('age', 2500)}
            onKeyDown={(event) => enterHandler(event, 'phoneNumber', 'age')}
          />
          <br />
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Номер телефона"
            type="text"
            value={(focus.phoneNumber ? transcript : inputs.phoneNumber)}
            onFocus={() => focusHandler('phoneNumber', 2700)}
            onKeyDown={(event) => enterHandler(event, 'location', 'phoneNumber')}
          />
          <br />

          <TextField
            name="location"
            label="Город"
            type="text"
            id="location"
            value={(focus.location ? transcript : inputs.location)}
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
                  key={el.id}
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
            value={(focus.about ? editInterim(transcript) : inputs.about)}
            onFocus={() => focusHandler('about', 4500)}
            onKeyDown={(event) => enterHandler(event, 'salary', 'about')}
          />
          <br />

          <TextField
            name="salary"
            label="Заработная плата"
            type="text"
            id="salary"
            value={(focus.salary ? transcript : inputs.salary)}
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
          {/* </Box> */}
        </FormGroup>
      </form>
    </div>
  );
}
