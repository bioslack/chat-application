import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  nickname: string;
  lastLogin: Date;
}

type SigninData = { nickname: string; password: string };
type SignupData = { name: string; nickname: string; password: string };

interface AuthContextData {
  user?: User;
  signin: (data: SigninData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextData>({
  signin: async () => {},
  signup: async () => {},
  isLoading: false,
});

const AuthProvider = (props: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const storeUserData = (data: User) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    navigate('/');
  };

  const signin = async (data: SigninData) => {
    setIsLoading(true);
    const response = await fetch(
      'http://localhost:8000/chat-app/v1/auth/signin',
      {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    setIsLoading(false);

    if (response.status >= 400 && response.status <= 499)
      throw new Error("Credenciais inválidas.");

    if (response.status !== 200)
      throw new Error("Não foi possível acessar o servidor.");

    const jsonRes = await response.json();
    storeUserData(jsonRes.user);
  };

  const signup = async (data: SignupData) => {
    const response = await fetch('http://localhost:8000/chat-app/v1/signup', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const jsonRes = await response.json();
    storeUserData(jsonRes.user);
  };

  return (
    <AuthContext.Provider value={{ signin, signup, user, isLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
