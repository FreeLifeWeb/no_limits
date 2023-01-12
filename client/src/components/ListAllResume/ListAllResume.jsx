import React from 'react';
import {
  Box, Button, Card, CardActions, CardContent, Typography,
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
    <Box>
      {resumes?.map((resume) => (
        <Card key={resume.id}>
          <CardContent sx={{ Width: '50%', height: '50%' }}>
            <br />
            <Typography variant="h3">
              {resume?.name}
            </Typography>
            <br />
            <Typography variant="h4">
              {resume?.age}
            </Typography>
            <br />
            <Typography variant="h5">
              {resume?.category}
            </Typography>
            <br />
            <Typography sx={{ mb: 1.5 }} variant="h5">
              {resume?.sphere}
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
                // onClick={() => responseHandler(resume?.id)}
              >
                Откликнуться
              </Button>
            ) : (<></>)}
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
