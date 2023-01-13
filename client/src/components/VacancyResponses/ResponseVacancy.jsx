import {
  Box, Button, Card, CardActions, CardContent, FormGroup, TextField, Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

export default function ResponseVacancy({ el }) {
  const [flag, setFlag] = useState(false);
  console.log(el);
  const clickHandler = () => {
    setFlag(!flag);
  };

  const submitHandler = (e, email) => {
    e.preventDefault();
    const { message } = Object.fromEntries(new FormData(e.target));
    const data = {
      message,
      email,
    };
    axios.post('/api/send', data);
    setFlag(!flag);
  };

  return (
    <Box
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <br />
      <Card style={{
        width: '70%',
      }}
      >
        <CardContent sx={{ Width: '50%', height: '50%', lineHeight: 'normal' }}>
          <br />
          <Typography variant="h3">
            {el?.name}
            {' '}
            <span style={{ fontSize: 14, color: 'grey' }}>
              {el?.age}
              {' '}
              лет
              {', '}
              {el?.location}
            </span>
          </Typography>
          <br />
          <Typography variant="h4">
            {el?.about}
          </Typography>
          <br />
          <Typography variant="h5">
            {el?.salary}
            {' '}
            рублей
          </Typography>
          <br />
        </CardContent>
        <CardActions>
          {flag ? (
            <form onSubmit={(e) => submitHandler(e, el.email)}>
              <FormGroup>
                <TextField
                  id="message"
                  name="message"
                  label="Введите сообщение"
                  type="text"
                />
                <Button type="submit">отправить</Button>
              </FormGroup>
            </form>
          ) : (
            <Button
              size="small"
              type="button"
              onClick={() => {
                clickHandler();
              }}
            >
              Пригласить в чат
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>

  );
}
