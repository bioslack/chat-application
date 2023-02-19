import { useContext } from "react";
import { SidebarContext } from "../context/SidebarProvider";

const useSidebar = () => useContext(SidebarContext);

export default useSidebar;