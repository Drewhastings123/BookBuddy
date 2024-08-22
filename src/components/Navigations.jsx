/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import { Link } from "react-router-dom";
import bookLogo from "../assets/books.png";
import { useNavigate } from "react-router-dom";

export default function Navigations() {
  const navigate = useNavigate();
  const handleLogout = () => {
    window.sessionStorage.clear();
    navigate("/login");
    window.location.reload();
  };
  const token = window.sessionStorage.getItem("Token");
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg  navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          <img id="logo-image" src={bookLogo} />
          <span className="playwrite-au-nsw-bodyLibrary">Book Buddy</span>
        </Link>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/">
                <span title="Home" className="material-icons">
                  home
                </span>
              </Link>
            </li>
            {!token && (
              <>
                <li className="nav-item">
                  <Link to="/login">
                    <span title="Log-in" className="material-icons">
                      login
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register">
                    <span title="Register" className="material-icons">
                      app_registration
                    </span>
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link to="/account">
                <span title="My Account" className="material-icons">
                  account_circle
                </span>
              </Link>
            </li>
            {token && (
              <li className="nav-item">
                <Link className="" onClick={handleLogout}>
                  <span title="Log-out" className="material-icons">
                    logout
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
