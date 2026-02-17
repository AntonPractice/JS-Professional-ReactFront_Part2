import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export const useProtectedRoute = (allowedRoles?: string[]) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      navigate('/');
    }
  }, [isAuthenticated, user, allowedRoles, navigate]);

  return { isAuthenticated, user };
};