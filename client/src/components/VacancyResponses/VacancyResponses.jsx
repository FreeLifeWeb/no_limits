import {
  Box, Button, Card, CardActions, CardContent, Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getResponses } from '../../redux/slices/responsesSlice';

export default function VacancyResponses() {
  const responses = useSelector((store) => store.responses);
  const { id } = useParams();
  console.log(responses, id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getResponses(id));
  }, []);
  return (
    <Box>
      {responses?.map((el) => (
        <Box
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          key={el.id}
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
              <Button
                size="small"
                onClick={() => {
                  // responseHandler(vacancy?.title);
                }}
              >
                Пригласить в чат
              </Button>
            </CardActions>
          </Card>
        </Box>
      ))}

    </Box>
  );
}
