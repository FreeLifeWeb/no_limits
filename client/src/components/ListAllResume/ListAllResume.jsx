import React from 'react';
import {
  Box, Button, Card, CardActions, CardContent, Container, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getResumes } from '../../redux/slices/resumesSlice';

export default function ListAllResume() {
  const resumes = useSelector((store) => store.resumes);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getResumes());
  }, []);
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {resumes?.map((resume) => (
        <Container
          key={resume.id}
          style={{ marginRight: 0 }}
        >
          <br />
          <Card
            style={{
              width: '70%',
            }}
          >
            <CardContent
              sx={{
                Width: '50%',
                height: '50%',
                lineHeight: 'normal',
              }}
            >
              <br />
              <Typography variant="h3">
                {resume?.name}
                ,
                {resume?.age}
              </Typography>
              <br />
              <Typography variant="h5">
                {resume?.Category?.title}
              </Typography>
              <br />
              <Typography sx={{ mb: 1.5 }} variant="h5">
                {resume?.Sphere?.title}
              </Typography>
              <br />
              <Typography sx={{ mb: 1.5 }} variant="h5">
                {resume?.about}
              </Typography>
              <br />
              <Typography variant="h5">
                {resume?.salary}
                {' '}
                рублей
              </Typography>
              <br />
            </CardContent>
            <CardActions>
              {(user?.status === 'employer') ? (
                <Button
                  size="small"
                >
                  Пригласить в чат
                </Button>
              ) : (<></>)}
            </CardActions>
          </Card>
        </Container>
      ))}
    </Box>
  );
}
