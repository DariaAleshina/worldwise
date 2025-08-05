import { useNavigate } from 'react-router-dom';
import { useFakeAuth } from '../contexts/FakeAuthContext';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const { isUserAuthenticated } = useFakeAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated) navigate('/');
  }, [isUserAuthenticated, navigate]);

  return isUserAuthenticated ? children : null;
}

export default ProtectedRoute;
