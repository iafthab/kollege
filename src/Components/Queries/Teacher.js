const TeacherProfile = () => {
  const teacher = {};

  //TODO Fetch departments and map

  return (
    <main className="teacher">
      <h2>Profile</h2>
      <p>
        username:{teacher?.username}
        <br />
        name:{teacher?.name}
        <br />
        qualification:{teacher?.qualification}
        <br />
        email:{teacher?.email} <br />
        {/*//TODO <p> roles:{teacher.roles} </p> */}
        department:{teacher?.department}
      </p>
      <br />
    </main>
  );
};

export default TeacherProfile;
