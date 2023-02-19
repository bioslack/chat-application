import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

interface SidebarProviderProps {
  children: ReactNode;
}

interface SidebarContextData {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextData>({
  showSidebar: true,
  setShowSidebar: () => {},
});

const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <SidebarContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
