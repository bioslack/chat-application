import useSidebar from '../../hooks/useSidebar';
import ListRoom from './ListRoom';
import ProfileBar from './ProfileBar';
import Searchbar from './Searchbar';

const Sidebar = () => {
  const { showSidebar } = useSidebar();

  return (
    <div className={`sidebar ${!showSidebar && 'sidebar--hidden'}`}>
      <Searchbar />
      <ListRoom />
      <ProfileBar />
    </div>
  );
};

export default Sidebar;
