import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function mainPageCard({ vac }) {
  return (
    <Card sx={{
      width: '100%',
      height: '100px',
      display: 'flex',
      justifyContent: 'space-between',
    }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {vac.company}
        </Typography>
        <Typography variant="h5" component="div">
          {vac.title}
        </Typography>
        <Typography variant="body2">
          {vac.salary}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Подробнее</Button>
      </CardActions>
    </Card>
  );
}
