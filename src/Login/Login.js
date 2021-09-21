import { useState } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [empId, setEmpId] = useState();
  const [error, setError] = useState(false);
  const history = useHistory();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/users/${empId}`);
      if (!res.ok) {
        throw Error("Login error");
      }

      const data = await res.json();
      sessionStorage.setItem("hackUser", JSON.stringify(data));
      history.push({
        pathname: "/",
        state: { user: data },
      });
    } catch (err) {
      setError(true);
    }
  };

  return (
    <form onSubmit={loginUser}>
      {" "}
      <div className="login">
        <div className="container">
          <h3>Hack Ideas</h3>
          <div className="user-input">
            <label
              className="user-label"
              data-tooltip="Employee doesn't exist!"
            >
              Employee ID
            </label>
            <input
              required
              type="text"
              pattern="[a-zA-Z]{1}[a-z-A-Z0-9]{3,12}"
              name="employee-id"
              className={error ? "error" : ""}
              onChange={(e) => setEmpId(e.target.value)}
              placeholder="Enter Employee ID"
              autoComplete={false}
            ></input>
            {error && <p className="error-text">Invalid employee ID!</p>}
          </div>
          <button type="submit">Login</button>
        </div>
      </div>
    </form>
  );
};

export default Login;
