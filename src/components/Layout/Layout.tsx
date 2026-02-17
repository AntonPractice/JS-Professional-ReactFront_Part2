import React, { type ReactNode } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
} from '@mui/material';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
  currentTab: number;
  onTabChange: (newValue: number) => void;
  isAdmin: boolean;
  onRoleToggle: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  currentTab,
  onTabChange,
  isAdmin,
  onRoleToggle,
}) => {
  return (
    <div className={styles.layout}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Магазин кондиционеров
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={isAdmin}
                onChange={onRoleToggle}
                color="default"
              />
            }
            label={isAdmin ? 'Админ' : 'Пользователь'}
            sx={{ color: 'white' }}
          />
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" className={styles.container}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={currentTab}
            onChange={(_, v) => onTabChange(v)}
            aria-label="Навигация"
          >
            <Tab label="Товары" />
            <Tab label="Пользователи" disabled={!isAdmin} />
            <Tab label="Профиль" />
          </Tabs>
        </Box>
        <Box className={styles.content}>{children}</Box>
      </Container>
    </div>
  );
};

export default Layout;