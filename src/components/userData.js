import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function User() {
  const { id } = useParams();
  const [user, setUser] = useState([]);

  console.log(user);
  useEffect(() => {
    axios
      .get(`https://gorest.co.in/public/v2/users/${id}`, {
        headers: {
          Authorization: `Bearer ${"0f54af475cf0ba5b2317f36e021fd3d2be2497b022e38db4cf7b5e7164f19e35"}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => setUser(res.data));
  });
  return (
    <>
      <Link to={"/"}>Back To Home</Link>
      {user && (
        <>
          <div className="card m-5" style={{ width: "28rem" }}>
            <div className="card-header">Author Details</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Post Id:{user.id}</li>
              <li className="list-group-item">Author Name:{user.name}</li>
              <li className="list-group-item">Author Email: {user.email}</li>
              <li className="list-group-item">Author status: {user.status}</li>
            </ul>
          </div>
        </>
      )}
    </>
  );
}
export default User;
