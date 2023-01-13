import React, { useState } from 'react';
import {
  Card, CardActions, CardContent, Button, Typography,
} from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteVac } from '../../redux/slices/userVacSlice';
import CreateVac from './CreateVac';

export default function BasicCard({ vacansy }) {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    axios.delete(`/api/vacansy/${id}`)
      .then(dispatch(deleteVac(id)));
  };

  const editHandler = () => {
    setIsEdit(!isEdit);
  };
  return (
    <Card style={{
      width: '100%',
      marginTop: 13,
    }}
    >
      {isEdit ? (
        <CreateVac vacansy={vacansy} setIsEdit={setIsEdit} />
      ) : (
        <CardContent>
          <Typography className="vacName" variant="h4" color="text.secondary" gutterBottom>
            {vacansy.title}
          </Typography>
          <Typography variant="h6" component="div">
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
            {'режим работы: '}
            {vacansy.time}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {vacansy.format}
          </Typography>
        </CardContent>
      )}

      <CardActions>
        <Button
          onClick={() => editHandler(vacansy.id)}
          size="small"
          variant="outlined"
        >
          {isEdit ? 'Отмена' : 'Редактировать'}
        </Button>
        {isEdit ? (<></>)
          : (
            <>
              <Button
                variant="outlined"
                sx={{ marginRight: '45%' }}
                onClick={() => deleteHandler(vacansy.id)}
                size="small"
              >
                Удалить
              </Button>
              <NavLink to={`/vacancy/responses/${vacansy.id}`} style={{ textDecoration: 'none' }}>
                <Button
                  marginRight="5px"
                  variant="outlined"
                  size="small"
                >
                  Oтклики
                </Button>
              </NavLink>
            </>
          )}
      </CardActions>
    </Card>
  );
}
