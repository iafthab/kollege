import React from "react";
import InternalResultForm from "../Forms/InternalResultForm";
import InternalStudent from "../Queries/InternalStudent";
import UserContext from "../../Hooks/UserContext";

const InternalLayout = () => {
  const { user } = React.useContext(UserContext);
  return (
    <>
      {user.userType === "student" ? (
        <InternalStudent />
      ) : (
        <InternalResultForm />
      )}
    </>
  );
};

export default InternalLayout;
