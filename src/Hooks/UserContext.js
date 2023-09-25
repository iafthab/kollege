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
  const [message, setMessage] = useState("");

  const slowLoadingIndicator = () => {
    setTimeout(() => {
      setMessage(
        "NOTE:Web Services on the free instance type are automatically spun down after 15 minutes of inactivity. When a new request for a free service comes in, Render spins it up again so it can process the request. This will cause a delay in the response of the first request after a period of inactivity while the instance spins up."
      );
    }, 4000);
  };

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
        message,
        setMessage,
        slowLoadingIndicator,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
