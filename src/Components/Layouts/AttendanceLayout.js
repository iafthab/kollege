import { useContext, lazy, Suspense } from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "./Loading";

const AttendanceLayout = () => {
  const AttendanceStudent = lazy(() => import("../Queries/AttendanceStudent"));
  const Attendance = lazy(() => import("../Queries/Attendance"));
  const { user } = useContext(UserContext);
  return (
    <>
      {user.userType === "student" ? (
        <Suspense fallback={<Loading />}>
          <AttendanceStudent />
        </Suspense>
      ) : (
        <Suspense fallback={<Loading />}>
          <Attendance />
        </Suspense>
      )}
    </>
  );
};

export default AttendanceLayout;
