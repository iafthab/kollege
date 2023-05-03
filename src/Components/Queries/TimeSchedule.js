// import { useState,useEffect } from "react";

// const TimeSchedule = () => {

//   const [timeSchedule, setTimeSchedule] = useState({
//     monday: ["--", "--", "--", "--", "--"],
//     tuesday: ["--", "--", "--", "--", "--"],
//     wednesday: ["--", "--", "--", "--", "--"],
//     thursday: ["--", "--", "--", "--", "--"],
//     friday: ["--", "--", "--", "--", "--"],
//   });

//   return (
//     <main className="time_schedule">
//       <h2>Add Time Schedule</h2>
//       <form>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Day/Hour</th>
//               <th>I</th>
//               <th>II</th>
//               <th>III</th>
//               <th>IV</th>
//               <th>V</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.entries(timeSchedule).map(([key, value]) => {
//               return (
//                 <tr key={key} className="table__row">
//                   <th>{key}</th>
//                   {value?.map((day, index) => (
//                     <td id="table__td" key={index}>
//                       <select
//                         className="table__input"
//                         value={day}
//                         name={key}
//                         id={index}
//                         onChange={(e) => handleFormChange(e)}
//                       >
//                         <option defaultValue>--</option>
//                         {papers.map((paper) => (
//                           <option key={paper._id} value={paper.name}>
//                             {paper.paper}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         <button type="submit" onClick={(e) => addTimeSchedule(e)}>
//           Add
//         </button>
//       </form>
//       <p className="form__error">
//         {error
//           ? error?.response?.data?.message ||
//             error?.data?.message ||
//             error?.response?.data
//           : ""}
//       </p>
//     </main>
//   );
// };

// export default TimeSchedule;
