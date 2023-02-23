import {
  createContext,
  ReactNode,
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { useDebounce } from 'use-debounce';
import { User } from './AuthProvider';

interface UsersContextData {
  selectedUser?: User;
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
  users: User[];
  refresh: (search?: string) => Promise<void>;
  isLoading: boolean;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const UsersContext = createContext<UsersContextData>({
  refresh: async () => {},
  setSelectedUser: () => {},
  users: [],
  isLoading: false,
  search: '',
  setSearch: () => {},
});

const UsersProvider = (props: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [value] = useDebounce(search, 500);

  const refresh = useCallback(async (searchStr: string = '') => {
    setIsLoading(true);
    const response = await fetch(`http://localhost:8000/chat-app/v1/users/${searchStr}`, {
      method: 'GET',
      credentials: 'include',
    });
    setIsLoading(false);

    const resJson = await response.json();
    setUsers(resJson.users || []);
  }, []);

  useEffect(() => {
    refresh(value);
  }, [value, refresh]);

  return (
    <UsersContext.Provider
      value={{
        search,
        setSearch,
        users,
        isLoading,
        refresh,
        selectedUser,
        setSelectedUser,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
