import { useContext } from "react";
import UserContext from "../../Hooks/UserContext";

const TeacherProfile = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <main className="profile">
      <h2>Profile</h2>
      <p>
        username:{user?.username}
        <br />
        name:{user?.name}
        <br />
        qualification:{user?.qualification}
        <br />
        email:{user?.email} <br />
        {/*//TODO <p> roles:{user.roles} </p> */}
        department:{user?.department}
      </p>
      <br />
    </main>
  );
};

export default TeacherProfile;
