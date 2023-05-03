import Layout from "./Components/Layouts/Layout";
import Empty from "./Components/Layouts/Empty";
import Paper from "./Components/Queries/Paper";
import Attendance from "./Components/Queries/Attendance";
import InternalResult from "./Components/Queries/InternalResult";
import InternalResultForm from "./Components/Forms/InternalResultForm";
import TimeSchedule from "./Components/Queries/TimeSchedule";
import TeacherForm from "./Components/Forms/TeacherForm";
import StudentForm from "./Components/Forms/StudentForm";
import PaperForm from "./Components/Forms/PaperForm";
import NotesForm from "./Components/Forms/NotesForm";

import ErrorElement from "./Components/Layouts/ErrorElement";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { TimeScheduleForm } from "./Components/Forms/TimeScheduleForm";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<ErrorElement />}>
        {/* <Route errorElement={<ErrorElement />}> */}
        <Route index element={<Empty />} />
        <Route path="papers" element={<Paper />}>
          <Route path=":paper" element={<Paper />}>
            {/* Add NotesForm here */}
          </Route>
        </Route>
        <Route path="attendance" element={<Attendance />} />
        <Route path="internal" element={<InternalResultForm />}>
          {/* <Route path="add" element={<InternalResult />} /> */}
        </Route>
        <Route path="time_schedule" element={<TimeScheduleForm />} />
        <Route path="reg_teacher" element={<TeacherForm />} />
        <Route path="reg_student" element={<StudentForm />} />
        <Route path="add_paper" element={<PaperForm />} />
        <Route path="add_notes" element={<NotesForm />} />
        <Route path="add_time" element={<TimeScheduleForm />} />
        {/* </Route> */}
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
