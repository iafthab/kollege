import { createContext } from "react";
import { useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("teacher");
  const [userType, setUserType] = useState("");
  const [paper, setPaper] = useState("");
  const [paperList, setPaperList] = useState([]);
  const [notes, setNotes] = useState([]);
  const [noteId, setNoteId] = useState("");

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userType,
        setUserType,
        paper,
        setPaper,
        paperList,
        setPaperList,
        notes,
        setNotes,
        noteId,
        setNoteId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
