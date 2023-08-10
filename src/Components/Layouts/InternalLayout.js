import React from "react";
import InternalResultForm from "../Forms/InternalResultForm";
import InternalStudent from "../Queries/InternalStudent";
import UserContext from "../../Hooks/UserContext";

const InternalLayout = () => {
  const { userType } = React.useContext(UserContext);
  return (
    <>{userType === "student" ? <InternalStudent /> : <InternalResultForm />}</>
  );
};

export default InternalLayout;
