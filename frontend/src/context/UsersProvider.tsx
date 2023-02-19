import {
  createContext,
  ReactNode,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { User } from './AuthProvider';

interface UsersContextData {
  selectedUser?: User;
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
  users: User[];
  refresh: () => Promise<void>;
  isLoading: boolean;
}

export const UsersContext = createContext<UsersContextData>({
  refresh: async () => {},
  setSelectedUser: () => {},
  users: [],
  isLoading: false,
});

const UsersProvider = (props: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch('http://localhost:8000/chat-app/v1/users', {
      method: 'GET',
      credentials: 'include',
    });
    setIsLoading(false);

    const resJson = await response.json();
    setUsers(resJson.users);
  }, []);

  return (
    <UsersContext.Provider
      value={{ users, isLoading, refresh, selectedUser, setSelectedUser }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
