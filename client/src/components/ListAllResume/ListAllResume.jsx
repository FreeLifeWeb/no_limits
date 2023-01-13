import React from 'react';
import {
  Box, Button, Card, CardActions, CardContent, Container, Divider, Typography,
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
    <Box style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}
    >
      {resumes?.map((resume) => (
        <Container
          key={resume.id}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <br />
          <Card
            style={{
              width: '70%',
              border: '3px solid #78866b',
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
              <Box className="vacName">
                <Typography variant="h4">
                  {resume?.name}
                  ,
                  {resume?.age}
                </Typography>
              </Box>
              <Box sx={{ marginTop: '4px' }}>
                <Typography variant="h7">
                  {resume?.Category?.title}
                </Typography>
              </Box>
              <br />
              <Typography sx={{ mb: 1 }} variant="h5">
                {resume?.Sphere?.title}
              </Typography>
              <br />
              <Divider />
              <Typography sx={{ mb: 1 }} variant="h6" className="vacAbout">
                {resume?.about}
              </Typography>
              <br />
              <Typography variant="h6">
                {resume?.salary}
                {' '}
                рублей
              </Typography>
            </CardContent>
            <CardActions>
              {(user?.status === 'employer') ? (
                <>
                  <br />
                  <Button
                    variant="contained"
                    size="small"
                  >
                    Пригласить в чат
                  </Button>
                </>
              ) : (<></>)}
            </CardActions>
          </Card>
        </Container>
      ))}
    </Box>
  );
}
