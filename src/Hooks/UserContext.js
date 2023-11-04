import { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [paper, setPaper] = useState("");
  const [paperList, setPaperList] = useState([]);
  const [notes, setNotes] = useState([]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        paper,
        setPaper,
        paperList,
        setPaperList,
        notes,
        setNotes,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
