import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export default function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{' '}
      <button
        onClick={() => {
          auth.signOut(() => navigate('/'));
        }}
      >
        Sign out
      </button>
    </p>
  );
}
