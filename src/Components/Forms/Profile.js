import React from "react";
import UserContext from "../../Hooks/UserContext";
import axios from "../../config/api/axios";

const Profile = () => {
  const { user, userType } = React.useContext(UserContext);
  const [profile, setProfile] = React.useState({});
  const [keys, setKeys] = React.useState([]);
  React.useEffect(() => {
    const getProfile = async () => {
      const response = await axios.get(`${userType}/${user._id}`);
      setProfile(response.data);
      setKeys(Object.keys(profile));
      console.log(keys, response.data);
    };
    getProfile();
  }, [userType, user, keys, profile]);

  return (
    <main>
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        {profile?.name}
      </h2>
      <div className="my-4 w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px] md:w-1/2">
        <table className="w-full">
          {keys?.map((key, index) => (
            <tr
              key={index}
              className="border-b-[1px] border-slate-400 last:border-b-0 "
            >
              <th className="bg-slate-900 p-2 text-base capitalize text-slate-100">
                {key}
              </th>
              <td className="p-2">{profile[key]}</td>
            </tr>
          ))}
        </table>
      </div>
    </main>
  );
};

export default Profile;
