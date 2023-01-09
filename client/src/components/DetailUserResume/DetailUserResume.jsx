/* eslint-disable max-len */
// import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {
  Button, FormControl, FormControlLabel, FormGroup, MenuItem, Radio, RadioGroup, Select, TextField, Typography,
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
  const [resume, setResume] = useState({
    name: '',
    age: '',
    email: '',
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

  // sphereList.reduce(
  //   (target, key) =>
  //   console.log(sphereList);
  //     (target[key.title] = key.title, target),
  //   // console.log(target, 'yyyyyyyyyyyyyyyyyyyyyyy');
  //   // return target;
  //   {},
  // );
  //   const allSpheres = {};
  // sphereList.map((el)=>{...allSpheres, [el]: String(el)})
  const readSpheres = {
    'Информационные технологии': 'Информационные технологии',
    'Общественное питание': 'Общественное питание',
    Строительство: 'Строительство',
    'Медицинские и оздоровительные услуги': 'Строительство',
    'Консалтинговые услуги: экономика, маркетинг': 'Консалтинговые услуги: экономика, маркетинг',
    'Инжиниринг и научный консалтинг': 'Инжиниринг и научный консалтинг',
    'Сфера развлечений': 'Сфера развлечений',
    'Аграрный бизнес': 'Аграрный бизнес',
    'Индустрия красоты': 'Индустрия красоты',
    'Бытовые услуги': 'Бытовые услуги',
  };
  // console.log(readSpheres);

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

      console.log(e.target, 'kkkkkkkkkkkkkkkkkkkkkkkk');

      setResume({ ...resume, [e.target.name]: transcript });
      console.log(resume, 'enter resume');

      const example = document.getElementById(nextId);
      example.focus();
    }
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
    const example = document.getElementById('name');
    example.focus();
    // const sphereList = () => {
    axios('candidate/resume/spheres')
      .then((res) => setSphereList(res.data));
    // };
    // console.log(sphereList, 'jjjjjjjjjjjjjjjjj');
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

  // const sphereFocusHandler = (id) => {
  //   setFocus((prev) => ({ ...prev, [id]: true }));
  //   console.log(focus);
  //   const field = toSpeak[id];
  //   startSpeach(field);
  // };

  const optionFocusHandler = (id) => {
    console.log('jhgjhgjhgjhgjhgjhgjhg');
    const field = toSpeak[id];
    startSpeach(field);
  };

  const radioHandler = (e, prevRadio, nextRadio) => {
    // console.log(prevRadio, 'blyat');
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      const example = document.getElementById(nextRadio);
      example.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      const example = document.getElementById(prevRadio);
      example.focus();
    }
  };

  const sphereHandler = (e) => {
    console.log('tititititootootoyoyoyoy');
    e.preventDefault();
    setCurrSphere(e.target.value);
    console.log(e.target.value);
    setResume({ ...resume, sphere: e.target.value });
    console.log(resume, 'resume');
    // console.dir(e);
    // const current = document.getElementById('sphere');
    // current.blur();
    const example = document.getElementById('about');
    // example.tabIndex = 1;
    example.focus();
    // console.dir(current.tabIndex, 'kkkkkkkkkkkkkkkkkkkk');
    // console.dir(example.tabIndex);
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
            onKeyDown={(event) => enterHandler(event, 'email', 'age')}
          />
          <br />
          <TextField
            id="email"
            name="email"
            label="Email"
            type="text"// не записываются данные иначе
            value={(focus.email ? transcript : resume.email)}
            onFocus={() => focusHandler('email')}
            onKeyDown={(event) => enterHandler(event, 'phoneNumber', 'email')}
          />
          <br />

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
              // onFocus={() => focusHandler('sphere')}
            >
              {sphereList.map((el, i, arr) => (
                <FormControlLabel
                  value={el.title}
                  id={`radio${el.id}`}
                  name={el.title}
                  control={<Radio />}
                  label={el.title}
                  onFocus={() => optionFocusHandler(el.title)}
                // onFocus={}
                  onKeyDown={(e) => radioHandler(e, `radio${arr[i - 1]?.id}`, `radio${arr[i + 1]?.id}`)}
                />
              ))}
            </RadioGroup>
          </FormControl>
          {/* <select
            // labelId="demo-controlled-open-select-label"
            name="sphere"
            label="Специальность"
            type="text"
            id="sphere"
            // open={open}
            // onClose={handleClose}
            // onOpen={handleOpen}
            value={currSphere}
            onChange={sphereHandler}
            onFocus={() => focusHandler('sphere')}
            // onFocus={() => focusHandler('sphere')}
            // onKeyDown={(event) => enterHandler(event, 'about', 'sphere')}

          >
            {sphereList.map((el) => (
              <option
                id={el.title}
                name={el.title}
                value={el.title}
                onFocus={() => optionFocusHandler(el.title)}
              >
                {el.title}
              </option>
            ))}
            {/* тут можно сразу в вэлью айди
          </select> */}

          {/* <TextField
            name="sphere"
            label="Специальность"
            type="text"
            id="sphere"
            value={(focus.sphere ? transcript : resume.sphere)}
            onFocus={() => focusHandler('sphere')}
            onKeyDown={(event) => enterHandler(event, 'about', 'sphere')}
          /> */}
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
