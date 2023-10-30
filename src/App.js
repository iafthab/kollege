import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { UserProvider } from "./Hooks/UserContext";
import Layout from "./Components/Layouts/Layout";
import Dash from "./Components/Layouts/Dash";
import ErrorElement from "./Components/Layouts/ErrorElement";
import Loading from "./Components/Layouts/Loading";
import AttendanceLayout from "./Components/Layouts/AttendanceLayout";
import LoginLayout from "./Components/Layouts/LoginLayout";
import InternalLayout from "./Components/Layouts/InternalLayout";
import Paper from "./Components/Queries/Paper";
import Notes from "./Components/Queries/Notes";
import StudentsList from "./Components/Queries/StudentsList";
import TeacherForm from "./Components/Forms/TeacherForm";
import StudentForm from "./Components/Forms/StudentForm";
import NotesForm from "./Components/Forms/NotesForm";
import TimeScheduleForm from "./Components/Forms/TimeScheduleForm";
import Login from "./Components/Forms/Login";
import Profile from "./Components/Queries/Profile";
import RegisterLayout from "./Components/Layouts/RegisterLayout";

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
        <Route path="/register" element={<RegisterLayout />}>
          <Route path="reg_teacher" element={<TeacherForm />} />
          <Route path="reg_student" element={<StudentForm />} />
        </Route>
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
          <Route path="attendance" element={<AttendanceLayout />} />
          <Route path="internal" element={<InternalLayout />} />
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
        className="toast"
        toastClassName="toast-rounded"
        bodyClassName="toast-body"
        // progressClassName="toast-progress"
        position="bottom-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        hideProgressBar={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </UserProvider>
  );
}

export default App;
