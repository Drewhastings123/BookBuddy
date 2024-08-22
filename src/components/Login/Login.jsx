/* TODO - add your code to create a functional React component that renders a login form */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./LoginSlice";

export default function Login() {
  const [loginUser] = useLoginMutation();

  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const updateForm = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // console.log(form)
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      let success = false;
      success = await loginUser(form).unwrap();
      if (success) {
        navigate("/account");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="break"></div>
      <div className="centerLoginCard">
        <div className="loginCard">
          <h2>Log-in to Checkout Books!</h2>
          <form onSubmit={submit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="email"
                onChange={updateForm}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={updateForm}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Log-in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
