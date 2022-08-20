import * as React from 'react';
import { AuthContextType, User } from './AuthProvider';

export let AuthContext = React.createContext<AuthContextType>(null!);
