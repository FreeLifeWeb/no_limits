import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import Registration from './components/Registration/Registration';
import MainPage from './components/MainPage/MainPage';

import { checkAuth } from './redux/actions/userAction';
import Vacancies from './components/Vacancies/Vacancies';
import Chat from './components/Chat/Chat';
import DetailVacancy from './components/DetailVacancy/DetailVacancy';
import ListAllResume from './components/ListAllResume/ListAllResume';
import DetailUserResume from './components/DetailUserResume/DetailUserResume';
import FavoriteResponses from './components/FavoriteResponses/FavoriteResponses';
import LkCandidate from './components/LK_Candidate/LkCandidate';
import Employer from './components/LK_Employer/Employer';
import RedactOrCreateVacancy from './components/RedactOrCreateVacancy/RedactOrCreateVacancy';
import UserResponses from './components/UserResponses/UserResponses';
import VacancyResponses from './components/VacancyResponses/VacancyResponses';
import AddVac from './components/LK_Employer/AddVac';

function App() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(checkAuth());
    }, 1000);
  }, []);

  return (
    <Box>
      {!user?.isFetching
        ? (
          <>
            <NavBar />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/vacancies" element={<Vacancies />} />
              <Route path="/vacancy/:id" element={<DetailVacancy />} />
              <Route path="/lkCandidate/candidate/resume/:id" element={<DetailUserResume />} />
              <Route path="/favoriteRespons" element={<FavoriteResponses />} />
              <Route path="/lkCandidate/:id" element={<LkCandidate />} />
              <Route path="/lkEmployer" element={<Employer />} />
              <Route path="/vacancy/:id/edit" element={<RedactOrCreateVacancy />} />
              <Route path="/myResponses" element={<UserResponses />} />
              <Route path="/vacancy/responses/:id" element={<VacancyResponses />} />
              <Route path="/resume" element={<ListAllResume />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/reg" element={<Registration />} />
              <Route path="/log" element={<Login />} />
              <Route path="/addVac" element={<AddVac />} />
            </Routes>
          </>
        )
        : (
          <h1>Loading...</h1>
        )}
    </Box>

  );
}

export default App;
