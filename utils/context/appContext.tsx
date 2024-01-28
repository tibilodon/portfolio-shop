"use client";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type AppContextProviderType = {
  sidebar: boolean;
  setSidebar: Dispatch<SetStateAction<boolean>>;
  sidebarLayer: boolean;
  setSidebarLayer: Dispatch<SetStateAction<boolean>>;
  sidebarLayer2: boolean;
  setSidebarLayer2: Dispatch<SetStateAction<boolean>>;
  animate: boolean;
  setAnimate: Dispatch<SetStateAction<boolean>>;
  header: string;
  setHeader: Dispatch<SetStateAction<string>>;
  prevHeader: string;
  setPrevHeader: Dispatch<SetStateAction<string>>;
  //   loggedIn: boolean;
  //   setLoggedIn: Dispatch<SetStateAction<boolean>>;
  //   color: string;
  //   setColor: Dispatch<SetStateAction<string>>;
};

const AppContext = createContext<AppContextProviderType>({
  sidebar: false,
  setSidebar: () => {},

  //sidebar layers
  sidebarLayer: false,
  setSidebarLayer: () => {},
  sidebarLayer2: false,
  setSidebarLayer2: () => {},

  //logo animation
  animate: false,
  setAnimate: () => {},

  //sidebar header text
  header: "",
  setHeader: () => {},
  prevHeader: "",
  setPrevHeader: () => {},
  //   loggedIn: false,
  //   setLoggedIn: () => {},
  //   color: "green",
  //   setColor: () => {},
});

export const useAppProvider = () => {
  return useContext(AppContext);
};

type ProviderProps = {
  children: React.ReactNode;
  //   data: {
  //     color: string | null;
  //     created_at: string;
  //     email: string | null;
  //     footerText: string | null;
  //     id: number;
  //     phoneNumber: string | null;
  //     updated_at: string | null;
  //     user_id: string | null;
  //   }[];
};
export default function AppContextProvider({ children }: ProviderProps) {
  const [sidebar, setSidebar] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [header, setHeader] = useState("");
  const [prevHeader, setPrevHeader] = useState("");

  const [sidebarLayer, setSidebarLayer] = useState(false);
  const [sidebarLayer2, setSidebarLayer2] = useState(false);

  //   const [loggedIn, setLoggedIn] = useState(false);
  //   const [color, setColor] = useState(data[0].color!!);

  return (
    <AppContext.Provider
      value={{
        sidebar,
        setSidebar,
        sidebarLayer,
        setSidebarLayer,
        sidebarLayer2,
        setSidebarLayer2,
        animate,
        setAnimate,
        header,
        setHeader,
        prevHeader,
        setPrevHeader,
      }}
    >
      <>{children}</>
    </AppContext.Provider>
  );
}
