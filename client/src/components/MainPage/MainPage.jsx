import React from 'react';
import Container from '@mui/material/Container';

export default function MainPage() {
  return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Container sx={{ textAlign: 'center' }}>
          Сервис поиска работы Без ограничений
        </Container>
        <Container>
          Список вакансий
        </Container>

      </div>
  );
}
