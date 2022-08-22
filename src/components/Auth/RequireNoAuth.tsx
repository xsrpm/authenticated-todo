import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function RequireNoAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();
  const auth = useAuth()
  if (auth.user !== null) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
