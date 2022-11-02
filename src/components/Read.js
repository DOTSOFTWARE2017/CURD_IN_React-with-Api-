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
      <Link to={"/"}>CreatePost</Link>

      <Table.Body>
        {APIData.map((data) => {
          return (
            <>
              {" "}
              <Table.Row>
                <Table.Cell>{data.id}</Table.Cell>
                <Table.Cell>
                  <Link to={`/APIData/${data.id}`}>{data.name} </Link>
                </Table.Cell>
                <Table.Cell>
                  <button onClick={() => onDelete(data.id)}>delete</button>
                </Table.Cell>
              </Table.Row>
            </>
          );
        })}
      </Table.Body>
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
