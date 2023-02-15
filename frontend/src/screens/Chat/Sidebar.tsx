import ListRoom from "./ListRoom";
import ProfileBar from "./ProfileBar";
import Searchbar from "./Searchbar";

const Sidebar = () => {
  

  return (
    <div className={`sidebar`}>
      <Searchbar />
      <ListRoom />
      <ProfileBar />
    </div>
  );
};

export default Sidebar;
