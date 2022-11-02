import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";

import ReactPaginate from "react-paginate";

function Read() {
  const [APIData, setAPIData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perpage] = useState(3);
  const [pageCount, setPageCount] = useState(0);

  const api = "https://gorest.co.in/public/v2/users";

  const onDelete = (id) => {
    axios.delete(`https://gorest.co.in/public/v2/users/${id}`, {
      headers: {
        Authorization: `Bearer ${"0f54af475cf0ba5b2317f36e021fd3d2be2497b022e38db4cf7b5e7164f19e35"}`,
      },
    });
  };

  const getData = async () => {
    const res = await axios.get(api, {
      headers: {
        Authorization: `Bearer ${"0f54af475cf0ba5b2317f36e021fd3d2be2497b022e38db4cf7b5e7164f19e35"}`,
        "Content-Type": "application/json",
      },
    });
    const APIData = res.data;
    const slice = APIData.slice(offset, offset + perpage);

    setAPIData(slice);
    setPageCount(Math.ceil(APIData.length / perpage));
  };
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * perpage);
  };
  useEffect(() => {
    getData();
  }, [offset]);

  return (
    <>
      <div class="container mt-3">
        <Link to={"/"}>CreatePost</Link>
        <table class="table table-dark table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          {APIData.map((data) => {
            return (
              <>
                <tbody>
                  <tr>
                    <td>{data.id}</td>

                    <td>
                      {" "}
                      <Link to={`/APIData/${data.id}`}>{data.name} </Link>
                    </td>
                    <td>
                      {" "}
                      <button onClick={() => onDelete(data.id)}>delete</button>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
      </div>
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={8}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        subContainerClassName={"page-item"}
        activeClassName={"active"}
      />
    </>
  );
}

export default Read;
