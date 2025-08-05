import styles from './User.module.css';
import { useFakeAuth } from '../contexts/FakeAuthContext';
import { useNavigate } from 'react-router-dom';

function User() {
  const { user, logout } = useFakeAuth();
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    logout();
    navigate('/');
  }

  if (!user) return null;

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
