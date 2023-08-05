import { lazy, Suspense } from "react";
import Layout from "./Components/Layouts/Layout";
import Dash from "./Components/Layouts/Dash";
import ErrorElement from "./Components/Layouts/ErrorElement";
import Paper from "./Components/Queries/Paper";
import Attendance from "./Components/Queries/Attendance";
import Notes from "./Components/Queries/Notes";
import StudentsList from "./Components/Queries/StudentsList";
import InternalResultForm from "./Components/Forms/InternalResultForm";
import TeacherForm from "./Components/Forms/TeacherForm";
import StudentForm from "./Components/Forms/StudentForm";
import NotesForm from "./Components/Forms/NotesForm";
import TimeScheduleForm from "./Components/Forms/TimeScheduleForm";
import LoginLayout from "./Components/Layouts/LoginLayout";
import Login from "./Components/Forms/Login";
import { UserProvider } from "./Hooks/UserContext";

import { ToastContainer } from "react-toastify";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Profile from "./Components/Forms/Profile";
import Loading from "./Components/Layouts/Loading";

const TeacherApproval = lazy(() =>
  import("./Components/Queries/TeacherApproval")
);
const PaperForm = lazy(() => import("./Components/Forms/PaperForm"));
const JoinPaper = lazy(() => import("./Components/Forms/JoinPaper"));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<LoginLayout />} errorElement={<ErrorElement />}>
        <Route index element={<Login />} />
        <Route path="reg_teacher" element={<TeacherForm />} />
        <Route path="reg_student" element={<StudentForm />} />
        <Route
          path="/dash"
          element={<Layout />}
          errorElement={<ErrorElement />}
        >
          <Route index element={<Dash />} />
          <Route path="paper" element={<Paper />} />
          <Route path="paper/:paper" element={<Notes />} />
          <Route path="paper/:paper/add" element={<NotesForm />} />
          <Route path="paper/:paper/:note/edit" element={<NotesForm />} />
          <Route path="paper/:paper/students" element={<StudentsList />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="internal" element={<InternalResultForm />} />
          <Route path="time_schedule" element={<TimeScheduleForm />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="approve_teacher"
            element={
              <Suspense fallback={<Loading />}>
                <TeacherApproval />
              </Suspense>
            }
          />
          <Route
            path="add_paper"
            element={
              <Suspense fallback={<Loading />}>
                <PaperForm />
              </Suspense>
            }
          />
          <Route
            path="join_paper"
            element={
              <Suspense fallback={<Loading />}>
                <JoinPaper />
              </Suspense>
            }
          />
        </Route>
      </Route>
    )
  );

  return (
    <UserProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </UserProvider>
  );
}

export default App;
