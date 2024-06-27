import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Loading from "./Loading";

function Login() {
  const [SignInData, setSignIn] = useState({
    userName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // simulate async signin process
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // signin
    const { userName, password } = SignInData;
    if ((import.meta.env.VITE_USERNAME === userName && import.meta.env.VITE_PASSWORD === password) ||  (import.meta.env.VITE_USERKH === userName && import.meta.env.VITE_PASSKH === password) || (import.meta.env.VITE_USERYAH === userName && import.meta.env.VITE_PASSYAH === password) || (import.meta.env.VITE_USERHR === userName && import.meta.env.VITE_PASSHR === password)) {
      dispatch({
        type: "SET_ADMINUSER",
        payload: SignInData,
      });
      toast.success("Login Successfully");
    } else {
      toast.error("Username and Password are incorrect.");
    }
    setLoading(false);
  };

  const onChangeHandler = (e) => {
    setSignIn({
      ...SignInData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="login">
        <h2>Login Form</h2>
        <form className="card" onSubmit={submitHandler}>
          <div className="form-row">
            <label htmlFor="">Username</label>
            <input name="userName" value={SignInData.userName} type="text" onChange={onChangeHandler} />
          </div>
          <div className="form-row">
            <label htmlFor="">Password</label>
            <input name="password" type="password" value={SignInData.password} onChange={onChangeHandler} />
          </div>
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      {loading && <Loading />}
    </>
  );
}

export default Login;
