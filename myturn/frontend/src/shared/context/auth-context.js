import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    userId:null,
    username:null,
    login: () => {},
    logout: () => {},
    currentMeet: null,
    amIMod: false,
    
})