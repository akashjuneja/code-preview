import { createContext } from "react";

interface UserContextType {
    userDetails: any;
    setUserDetails: (user: any) => void;
}

const defaultContextValue:UserContextType  = {
    userDetails: '',
    setUserDetails: () => {}
};

export const UserContext = createContext<UserContextType>(defaultContextValue);