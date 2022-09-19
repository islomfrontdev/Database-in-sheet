import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, age);
    const data = {
      Name: name,
      Age: age,
    };
    axios
      .post(
        "https://sheet.best/api/sheets/a389eb70-0ac4-4c48-884c-44edf0af41cc",
        data
      )
      .then((res) => {
        console.log(res);
        setName("");
        setAge("");
        getList();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const getList = () => {
    axios
      .get("https://sheet.best/api/sheets/a389eb70-0ac4-4c48-884c-44edf0af41cc")
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(
        `https://sheet.best/api/sheets/a389eb70-0ac4-4c48-884c-44edf0af41cc/${id}`
      )
      .then((res) => {
        getList();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="container">
      <h1>User lists with Google sheet</h1>
      <form onSubmit={handleSubmit}>
        <label className="mt-3">Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="form-control"
          required
          value={name}
        />
        <label className="mt-3">Age</label>
        <input
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter your age"
          className="form-control"
          required
          value={age}
        />
        <div className="text-end mt-3">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
      <table className="w-100 mt-4 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx}>
              <td>{user.Name}</td>
              <td>{user.Age}</td>
              <td>
                <button
                  onClick={() => handleDelete(idx)}
                  className="btn btn-danger"
                >
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
