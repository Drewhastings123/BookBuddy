/* TODO - add your code to create a functional React component that renders a registration form */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./RegisterSlice";

export default function Register() {
  const [registerUser] = useRegisterMutation();

  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const updateForm = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // console.log(form);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      let success = false;
      success = await registerUser(form).unwrap();
      if (success) {
        navigate("/account");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="break"></div>{" "}
      <div className="registerCard">
        <div>
          <h2>Sign up in order to checkout books!</h2>
        </div>
        <form className="regForm" onSubmit={submit}>
          <div className="row">
            <div className="col">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                name="firstname"
                onChange={updateForm}
              />
            </div>
            <div className="col">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                name="lastname"
                onChange={updateForm}
              />
            </div>
          </div>
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
