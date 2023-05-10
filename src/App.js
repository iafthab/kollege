import Layout from "./Components/Layouts/Layout";
import Empty from "./Components/Layouts/Empty";
import ErrorElement from "./Components/Layouts/ErrorElement";
import Paper from "./Components/Queries/Paper";
import Attendance from "./Components/Queries/Attendance";
import Notes from "./Components/Queries/Notes";
import StudentsList from "./Components/Queries/StudentsList";
import InternalResultForm from "./Components/Forms/InternalResultForm";
import TeacherForm from "./Components/Forms/TeacherForm";
import StudentForm from "./Components/Forms/StudentForm";
import PaperForm from "./Components/Forms/PaperForm";
import NotesForm from "./Components/Forms/NotesForm";
import TimeScheduleForm from "./Components/Forms/TimeScheduleForm";
import LoginLayout from "./Components/Layouts/LoginLayout";
import Login from "./Components/Forms/Login";
import { UserProvider } from "./Hooks/UserContext";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<LoginLayout />}>
        <Route index element={<Login />} />
        <Route
          path="/dash"
          element={<Layout />}
          errorElement={<ErrorElement />}
        >
          <Route index element={<Empty />} />
          <Route path="paper" element={<Paper />} />
          <Route path="paper/:paper" element={<Notes />} />
          <Route path="paper/:paper/add" element={<NotesForm />} />
          <Route path="paper/:paper/students" element={<StudentsList />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="internal" element={<InternalResultForm />} />
          <Route path="time_schedule" element={<TimeScheduleForm />} />
          <Route path="reg_teacher" element={<TeacherForm />} />
          <Route path="reg_student" element={<StudentForm />} />
          <Route path="add_paper" element={<PaperForm />} />
        </Route>
      </Route>
    )
  );

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
