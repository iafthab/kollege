import { useState } from "react";

const NotesForm = () => {
  const { notes, setNotes } = useState({
    batch: "",
    paper: "",
    title: "",
    body: "",
  });

  //TODO Fetch student(s) and map

  return (
    <main className="notes">
      {/*//TODO */}
      <h2>Add Notes</h2>
    </main>
  );
};

export { NotesForm };
