import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function mainPageCard({ vac }) {
  return (
    <Card sx={{
      width: '100%',
      height: '150px',
      display: 'flex',
      justifyContent: 'space-between',
      margin: '15px 0',
    }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
        <Typography sx={{ fontSize: 14, color: '#039be5', fontWeight: '500' }} gutterBottom>
          {vac.company}
        </Typography>
        <Typography variant="h5" component="div">
          {vac.title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#039be5', fontWeight: '500', margin: '-3px 0' }}>
          {vac.salary}
          {' '}
          руб.
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" size="small">Подробнее</Button>
      </CardActions>
    </Card>
  );
}
