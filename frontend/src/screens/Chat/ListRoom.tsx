import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Room from "./Room";

const ListRoom = () => {

  if (false) {
    return (
      <div className="sidebar__room-list">
        <Loading />
      </div>
    );
  }

  if (false) {
    return (
      <div className="sidebar__room-list">
        <Error />
      </div>
    );
  }

  return (
    <div className="sidebar__room-list">
      {/* {data.users.map((u: User) => (
        <Room key={u._id} user={u} />
      ))} */}
    </div>
  );
};

export default ListRoom;
