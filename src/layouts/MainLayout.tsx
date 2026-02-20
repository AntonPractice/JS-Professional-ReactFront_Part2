import React, { type ReactNode } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  IconButton,
  Badge,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import styles from './MainLayout.module.scss';
import { logout } from '../store/authSlice';
import { useGetCartQuery } from '../store/api';
import { api } from '../store/api'; // <-- импортируем api

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: cartItems } = useGetCartQuery(undefined, { skip: !isAuthenticated });

  const handleLogout = () => {
    dispatch(logout());
    dispatch(api.util.resetApiState()); // <-- сброс кеша RTK Query
    navigate('/login');
  };

  const cartItemsCount = cartItems?.length || 0;

  return (
    <div className={styles.layout}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Магазин кондиционеров
            </Link>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isAuthenticated ? (
              <>
                <Button color="inherit" component={Link} to="/">
                  Товары
                </Button>
                <IconButton color="inherit" component={Link} to="/cart">
                  <Badge badgeContent={cartItemsCount} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <Button color="inherit" component={Link} to="/orders">
                  Заказы
                </Button>
                <Button color="inherit" component={Link} to="/profile">
                  {user?.username}
                </Button>
                {user?.role === 'admin' && (
                  <>
                    <Button color="inherit" component={Link} to="/admin/users">
                      Пользователи
                    </Button>
                    <Button color="inherit" component={Link} to="/admin/products">
                      Управление товарами
                    </Button>
                  </>
                )}
                <Button color="inherit" onClick={handleLogout}>
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Войти
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Регистрация
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" className={styles.container}>
        <Box className={styles.content}>{children}</Box>
      </Container>
    </div>
  );
};

export default MainLayout;