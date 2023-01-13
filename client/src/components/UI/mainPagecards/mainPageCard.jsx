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
    <>
      <Card sx={{
        width: '100%',
        height: '120px',
        display: 'flex',
        justifyContent: 'space-between',
        border: '3px solid #78866b',
        padding: '5px',
      }}
      >
        <CardContent>
          <Typography variant="h4" className="vacName" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {vac.company}
          </Typography>
          <Typography variant="h6" component="div">
            {vac.title}
          </Typography>
          <Typography variant="body2">
            {`${vac.salary} руб.`}
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" size="small">Подробнее</Button>
        </CardActions>
      </Card>
      <br />
    </>
  );
}
