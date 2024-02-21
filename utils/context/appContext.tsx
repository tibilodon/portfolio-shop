"use client";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
// import { getCookie, getAllCookies } from "../cookieActions";

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
  cart: boolean;
  setCart: Dispatch<SetStateAction<boolean>>;
  // cartItems: number;
  // setCartItems: Dispatch<SetStateAction<number>>;

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
  cart: false,
  setCart: () => {},
  // cartItems: 0,
  // setCartItems: () => {},
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
  //check cookies for order and set cartItems

  const [sidebar, setSidebar] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [header, setHeader] = useState("");
  const [prevHeader, setPrevHeader] = useState("");

  const [sidebarLayer, setSidebarLayer] = useState(false);
  const [sidebarLayer2, setSidebarLayer2] = useState(false);

  const [cart, setCart] = useState(false);
  // const [cartItems, setCartItems] = useState(0);

  // useEffect(() => {
  //   const inCart = async () => {
  //     const data = await getAllCookies();
  //     if (data) {
  //       console.log("thy cookies", data);
  //       let addedToCart: number = 0;
  //       for (let index = 0; index < data.length; index++) {
  //         const obj = data[index];
  //         addedToCart = addedToCart + Number(obj.value);
  //       }
  //       setCartItems(addedToCart);
  //     }
  //   };
  //   inCart();
  // }, []);

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
        cart,
        setCart,
        // cartItems,
        // setCartItems,
      }}
    >
      <>{children}</>
    </AppContext.Provider>
  );
}
