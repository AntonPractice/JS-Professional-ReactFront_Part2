import React from 'react';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import { useGetUsersQuery } from '../store/api';
import UserList from '../components/UserList/UserList';

const AdminUsersPage: React.FC = () => {
  const { data, error, isLoading } = useGetUsersQuery();

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Ошибка загрузки пользователей</Alert>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Управление пользователями
      </Typography>
      <UserList
        users={data?.data || []}
        isAdmin={true}
        onSelectUser={(user) => {
          // Можно реализовать переход на профиль, например:
          console.log('Selected user:', user);
        }}
      />
    </Container>
  );
};

export default AdminUsersPage;