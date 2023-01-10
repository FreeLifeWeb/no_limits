/* eslint-disable max-len */
// import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {
  Button, FormGroup, TextField, Typography,
} from '@mui/material';

const synth = window.speechSynthesis;
let voices = [synth];

export default function Test() {
//   const [input, setInput] = useState('');
//   const commands = [
//     {
//       command: 'Hello',
//       callback: () => {
//         setInput('Привет');
//         console.log(input);
//       },
//       matchInterim: true,
//     },
//     {
//       command: 'Bye',
//       callback: () => {
//         setInput('Пока');
//         console.log(input);
//       },
//       matchInterim: true,
//     },
//   ];

  //   console.log(input, 'uuuuuuuuuuuuuuuuuuuuuuu');

  //   //   const { transcript } = useSpeechRecognition({ commands });
  //   const { transcript } = useSpeechRecognition();

  //   useEffect(() => {
  //     SpeechRecognition.startListening();
  //   }, []);

  //   return (

  //     <div>
  //       <h3>Hello World!</h3>
  //       <p>{transcript || 'Start listening for transcript'}</p>

  //     </div>

  //   );
  /// ///////////////////////////////
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
  };

  /// //////////////////////////////////////////////////

  const startSpeach = (sentence) => {
    voices = synth.getVoices();

    const utterThis = new SpeechSynthesisUtterance(sentence);

    const milena = voices.find((voice) => voice.name === 'Milena');
    // console.log(milena);
    utterThis.voice = milena;
    // utterThis.voice.valume = 1;
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
  const [data, setData] = useState({});
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

  const enterHandler = (e, idr) => {
    console.log('enter');
    e.preventDefault();
    stopHandler();
    console.log(e.target, 'kkkkkkkkkkkkkkkkkkkkkkkk');
    console.log(idr, 'kkkkkkkkkk;;;;;;;;;;;;;;;;;;;;k');

    //     // console.log(id, 'id----------');
    //     const field = toSpeak[e.target.name];
    //     console.log(e.target);

    //     startSpeach(field);
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
    //     console.log(e.target.value);
    const example = document.getElementById(idr);
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

  //   //   const { transcript } = useSpeechRecognition({ commands });
  //   const { transcript } = useSpeechRecognition();

  //   useEffect(() => {
  //     SpeechRecognition.startListening();
  //   }, []);

  return (
    <div className="container">
      <form>
        <FormGroup>
          <p>
            Microphone:
            {' '}
            {listening ? 'on' : 'off'}
          </p>
          {/* <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
            Ф.И.О
          </Typography> */}
          <TextField
            id="name"
            label="Ф.И.О"
            name="name"
            value={data.name || transcript}
            onFocus={() => focusHandler('name')}
            onKeyDown={(event) => enterHandler(event, 'age')}
            // onKeyDown={enterHandler () => setCurrId('age')}
          />
          {' '}
          <br />
          <TextField
            id="age"
            name="age"
            label="Возраст"
            type="text"// не записываются данные иначе
            value={data.age || transcript}
            onFocus={() => focusHandler('age')}
            onKeyDown={(event) => enterHandler(event, 'email')}
            // onKeyDown={enterHandler}
          />
          <br />
          <TextField
            id="email"
            name="email"
            label="Email"
            type="text"// не записываются данные иначе
            value={data.email || transcript}
            onFocus={() => focusHandler('email')}
            onKeyDown={(event) => enterHandler(event, 'phoneNumber')}
            // onKeyDown={enterHandler}
          />
          <br />
          {/* <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
            Номер телефона
          </Typography> */}
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Номер телефона"
            type="text"
            value={data.phoneNumber || transcript}
            onFocus={() => focusHandler('phoneNumber')}
            onKeyDown={(event) => enterHandler(event, 'location')}
            // value={transcript}
            // onKeyDown={enterHandler}
          />
          <br />
          {/* <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
            Пожалуйста, назовите город, в котором Вы находитесь.
          </Typography> */}
          <TextField
            name="location"
            label="Город"
            type="text"
            id="location"
            value={data.location || transcript}
            onFocus={() => focusHandler('location')}
            onKeyDown={(event) => enterHandler(event, 'sphere')}
          />
          <br />
          {/* <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
            Пожалуйста, назовите свою специальность.
          </Typography> */}
          <TextField
            name="sphere"
            label="Специальность"
            type="text"
            id="sphere"
            value={data.sphere || transcript}
            onFocus={() => focusHandler('sphere')}
            onKeyDown={(event) => enterHandler(event, 'about')}
          />
          <br />
          {/* <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
            Пожалуйста, расскажите вкратце о себе, своем образовании и опыте работы.
          </Typography> */}
          <TextField
            name="about"
            label="Образование и опыт"
            type="text"
            id="about"
            value={data.about || transcript}
            onFocus={() => focusHandler('about')}
            onKeyDown={(event) => enterHandler(event, 'salary')}
          />
          <br />
          {/* <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
            Пожалуйста, укажите ожидаемый уровень заработной платы.
          </Typography> */}
          <TextField
            name="salary"
            label="Заработная плата"
            type="text"
            id="salary"
            value={data.salary || transcript}
            onFocus={() => focusHandler('salary')}
            // onKeyDown={(event) => enterHandler(event, 'age')}
          />
          {/* <br />
          <Button onClick={startHandler}>Start</Button>
          <Button onClick={stopHandler}>Stop</Button>
          <Button onClick={resetHandler}>Reset</Button> */}
          {/* <p>{transcript}</p> */}
        </FormGroup>
      </form>
    </div>
  );
}
