import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './LoginPage.module.scss';
import { useLoginMutation } from '../store/api';
import { setCredentials } from '../store/authSlice';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');      // переименовано с username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap(); // передаём email
      console.log('Login response:', response);
      dispatch(setCredentials(response));
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err?.data?.message || 'Неверный email или пароль');
    }
  };

  return (
    <Container maxWidth="sm" className={styles.container}>
      <Paper className={styles.paper}>
        <Typography variant="h5" gutterBottom>
          Вход в систему
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"                        // тип email
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </Button>
        </form>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Нет аккаунта? <a href="/register">Зарегистрируйтесь</a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;