import { createContext } from "react";
import { useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [paper, setPaper] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser, paper, setPaper }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
