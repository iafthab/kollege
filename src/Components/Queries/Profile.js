import React from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "../Layouts/Loading";
import axios from "../../config/api/axios";
import { PiUserThin, PiStudentThin } from "react-icons/pi";

const Profile = () => {
  const { user } = React.useContext(UserContext);
  const [profile, setProfile] = React.useState({});

  React.useEffect(() => {
    const getProfile = async () => {
      const response = await axios.get(`${user.userType}/${user._id}`);
      setProfile(response.data);
    };
    getProfile();
  }, [user]);

  return (
    <main className="flex w-full flex-col justify-center md:w-fit">
      {profile.name ? (
        <>
          <div className=" my-4 flex w-full justify-center overflow-auto dark:border-slate-500 dark:p-[1px]">
            {user.userType === "teacher" ? (
              <PiUserThin className="m-2 rounded-full border-2 border-slate-900 p-1 text-6xl dark:border-slate-300 md:p-2 md:text-9xl lg:text-[12rem]" />
            ) : (
              <PiStudentThin className="m-2 rounded-full border-2 border-slate-900 p-1 text-6xl font-light dark:border-slate-300 md:p-2 md:text-9xl lg:text-[12rem]" />
            )}
            <div className="flex flex-col items-start justify-center">
              <h2 className=" whitespace-break-spaces text-3xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
                {user?.name}
              </h2>
              <p className="text-lg capitalize sm:text-xl md:text-2xl">
                {user?.role}
              </p>
            </div>
          </div>
          <div className=" w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
            <table className="w-full ">
              <tbody>
                {Object.keys(profile).map((key, index) => (
                  <tr
                    key={index}
                    className="border-t-[1px] border-slate-400 last:border-b-0 "
                  >
                    <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                      {key}
                    </th>
                    <td className="px-4 py-2">{profile[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default Profile;
