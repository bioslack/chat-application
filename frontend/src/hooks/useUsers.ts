import { useContext } from "react";
import { UsersContext } from "../context/UsersProvider";

const useUsers = () => useContext(UsersContext);

export default useUsers;