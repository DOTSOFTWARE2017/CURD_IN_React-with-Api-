import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
export const Navbar = () => {
  return (
    <>
      <ul>
      <li>
          {" "}
          <Link to={"/read"}>Home</Link>
        </li>
        <li>
          {" "}
          <Link to={"/"}>Create User</Link>
        </li>
       
        <li>
          {" "}
          <Link to={"/todo"}>Todo</Link>
        </li>
      </ul>
    </>
  );
};
