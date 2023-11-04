import React from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "./Loading";

const InternalLayout = () => {
  const InternalResultForm = React.lazy(() =>
    import("../Forms/InternalResultForm")
  );
  const InternalStudent = React.lazy(() =>
    import("../Queries/InternalStudent")
  );
  const { user } = React.useContext(UserContext);
  return (
    <>
      {user.userType === "student" ? (
        <React.Suspense fallback={<Loading />}>
          <InternalStudent />
        </React.Suspense>
      ) : (
        <React.Suspense fallback={<Loading />}>
          <InternalResultForm />
        </React.Suspense>
      )}
    </>
  );
};

export default InternalLayout;
