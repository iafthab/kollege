import { useState, useEffect } from "react";
import axios from "../../config/api/axios";
import { useNavigate } from "react-router-dom";

const InternalResultForm = () => {
  const [paper, setPaper] = useState("");
  const [paperList, setPaperList] = useState([]);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [internal, setInternal] = useState([]);
  const navigate = useNavigate();

  // Fetch papers
  useEffect(() => {
    const getPapersList = async (e) => {
      const list = await axios.get("/paper/teacher/644e4f27cce0a7d6a232420e");
      setPaperList(list.data);
    };
    getPapersList();
  }, []);

  const fetchInternal = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/internal/" + paper);
      await setInternal(response.data.marks);
      console.log(response.data.marks);
      setDisabled(true);
    } catch (err) {
      if (err.response.status === 404) {
        const response = await axios.get("paper/" + paper);
        const students = response.data.students;
        students.forEach((student) => {
          Object.assign(student, {
            test: 0,
            seminar: 0,
            assignment: 0,
            attendance: 0,
            total: 0,
          });
        });
        setInternal(students);
        console.log(students);
        setDisabled(false);
      } else {
        setError(err);
      }
    }
  };

  const addInternalMark = async (e) => {
    e.preventDefault();
    try {
      const marks = { paper, marks: internal };
      const response = await axios.post("internal/" + paper, marks);
      console.log(response);
      navigate("../");
      alert(response.data.message);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const handleFormChange = (e) => {
    const index = parseInt(e.target.id);
    const value = e.target.value;
    const key = e.target.name;
    const student = internal[index];
    student[key] = value;
    const newInternal = internal.map((student, index) => {
      if (index === e.target.id) {
        return student;
      } else return student;
    });
    setInternal(newInternal);
  };

  return (
    <main className="internal">
      <h2>Internal Mark</h2>
      <section className="form__head">
        <form className="internal__form">
          <select
            className="form__select"
            placeholder="select paper"
            name="paper"
            id="paper"
            value={paper}
            required
            onChange={(e) => setPaper(e.target.value)}
          >
            <option defaultValue hidden>
              Select Paper
            </option>
            {paperList.map((paper) => (
              <option key={paper._id} value={paper._id}>
                {paper.paper}
              </option>
            ))}
          </select>
          <button type="submit" onClick={(e) => fetchInternal(e)}>
            Fetch
          </button>
        </form>
      </section>
      <section className="internal__body">
        <form className="internal__body__form">
          <table className="table">
            {internal.length ? (
              <thead>
                <tr>
                  <th>student</th>
                  <th>test</th>
                  <th>seminar</th>
                  <th>assignment</th>
                  <th>attendance</th>
                  <th>total</th>
                </tr>
              </thead>
            ) : (
              ""
            )}
            <tbody>
              {internal?.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>
                    <input
                      type="number"
                      required
                      disabled={disabled}
                      id={index}
                      name="test"
                      value={student.test}
                      onChange={(e) => handleFormChange(e)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      required
                      disabled={disabled}
                      id={index}
                      name="seminar"
                      value={student.seminar}
                      onChange={(e) => handleFormChange(e)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      required
                      disabled={disabled}
                      id={index}
                      name="assignment"
                      value={student.assignment}
                      onChange={(e) => handleFormChange(e)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      required
                      disabled={disabled}
                      id={index}
                      name="attendance"
                      value={student.attendance}
                      onChange={(e) => handleFormChange(e)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      required
                      disabled
                      id={index}
                      name="total"
                      value={
                        parseInt(student?.test) +
                        parseInt(student?.seminar) +
                        parseInt(student?.assignment) +
                        parseInt(student?.attendance)
                      }
                      onChange={(e) => handleFormChange(e)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {disabled === false ? (
            <button type="submit" onClick={(e) => addInternalMark(e)}>
              Add
            </button>
          ) : (
            ""
          )}
        </form>
      </section>
      <div>
        <p className="form__error">
          {error ? error?.response?.data?.message || error?.response?.data : ""}
        </p>
      </div>
    </main>
  );
};

export default InternalResultForm;
