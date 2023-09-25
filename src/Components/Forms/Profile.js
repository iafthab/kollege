import React from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "./../Layouts/Loading";
import axios from "../../config/api/axios";
import { PiUser, PiStudent } from "react-icons/pi";

const Profile = () => {
  const { user, userType } = React.useContext(UserContext);
  const [profile, setProfile] = React.useState({});

  React.useEffect(() => {
    const getProfile = async () => {
      const response = await axios.get(`${userType}/${user._id}`);
      setProfile(response.data);
    };
    getProfile();
  }, [userType, user]);

  return (
    <main>
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        {user?.name}
      </h2>
      {profile.name ? (
        <div className=" my-4 w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px] md:w-1/2 xl:w-1/3">
          {userType === "teacher" ? (
            <PiUser className="mx-auto my-6 rounded-full border-2 border-slate-900 p-1 text-9xl dark:border-slate-300 md:p-2" />
          ) : (
            <PiStudent className="mx-auto my-6 rounded-full border-2 border-slate-900 p-1 text-9xl font-light dark:border-slate-300 md:p-2" />
          )}
          <table className="w-full">
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
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default Profile;
