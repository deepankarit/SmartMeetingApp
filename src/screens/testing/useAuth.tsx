import {useState} from 'react';

interface User {
  email: string;
  password: string;
}

interface UserAuth {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signUp: (email: string, password: string) => void;
}

export const useAuth = (): UserAuth => {
  const [user, setUser] = useState<User | null>(null);
  const login = (email: string, pass: string) => {
    if (email === user?.email && pass === user.password) {
      return true;
    } else {
      return false;
    }
  };
  const signUp = (email: string, pass: string) => {
    setUser({email: email, password: pass});
  };

  return {user, login, signUp};
};
