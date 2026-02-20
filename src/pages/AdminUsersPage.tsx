import React from 'react';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import { useGetUsersQuery } from '../store/api';
import UserList from '../components/UserList/UserList';

const AdminUsersPage: React.FC = () => {
  const { data: users, error, isLoading } = useGetUsersQuery(); // data — это массив

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Ошибка загрузки пользователей</Alert>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Управление пользователями
      </Typography>
      <UserList
        users={users || []} // передаём массив напрямую
        isAdmin={true}
        onSelectUser={(user) => {
          console.log('Selected user:', user);
        }}
      />
    </Container>
  );
};

export default AdminUsersPage;