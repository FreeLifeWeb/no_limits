import {
  Box, Button, Card, CardActions, CardContent, FormGroup, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ResponseVacancy from './ResponseVacancy';

import { getResponses } from '../../redux/slices/responsesSlice';

export default function VacancyResponses() {
  const responses = useSelector((store) => store.responses);

  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getResponses(id));
  }, []);

  return (
    <Box>
      {responses?.map((el) => (
        <ResponseVacancy key={el.id} el={el} />
      ))}
    </Box>
  );
}
