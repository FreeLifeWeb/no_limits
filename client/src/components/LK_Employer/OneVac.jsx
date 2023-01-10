import React from 'react';
import {
  Card, CardActions, CardContent, Button, Typography,
} from '@mui/material';

export default function BasicCard({ vacansy }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {vacansy.title}
        </Typography>
        <Typography variant="h5" component="div">
          {vacansy.company}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {vacansy.salary}
          {' '}
          рублей
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {vacansy.Sphere.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {vacansy.Category.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {vacansy.time}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {vacansy.format}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          // onClick={() => editHandler()}
          size="small"
        >
          Редактировать

        </Button>
        <Button
          // onClick={() => deleteHandler()}
          size="small"
        >
          Удалить

        </Button>
        <Button
          // onClick={() => responseHandler()}
          size="small"
        >
          Oтклики

        </Button>
      </CardActions>
    </Card>
  );
}
