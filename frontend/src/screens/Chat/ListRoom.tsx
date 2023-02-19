import { useEffect } from 'react';
import Loading from '../../components/Loading';
import Room from './Room';
import useUsers from '../../hooks/useUsers';

const ListRoom = () => {
  const { isLoading, users, refresh } = useUsers();

  useEffect(() => {
    refresh();
  }, [refresh])

  if (isLoading) {
    return (
      <div className="sidebar__room-list">
        <Loading />
      </div>
    );
  }

  return (
    <div className="sidebar__room-list">
      {users.map((user, i) => (
        <Room key={i} user={user} />
      ))}
    </div>
  );
};

export default ListRoom;
