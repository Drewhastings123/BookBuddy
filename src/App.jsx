// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Books from "./components/Books";
import Navigations from "./components/Navigations";
import SingleBook from "./components/Singlebook/SingleBook";
import Account from "./components/Account/Account";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Protected from "./components/Shared/Protected";

function App() {
  // const [token, setToken] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Navigations />
        <Routes>
          <Route path="/" element={<Books />}></Route>
          <Route path="/books/:id" element={<SingleBook />}></Route>
          <Route path="/account" element={<Protected />}>
            <Route path="/account" element={<Account />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
