import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import moment from "moment/moment";

function Todo() {
  const [APIData, setAPIData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perpage] = useState(5);
  const [pageCount, setPageCount] = useState(0);

  const api = "https://gorest.co.in/public/v2/todos";

  const status = async (value) => {
    const res2 = await axios.get(
      `https://gorest.co.in/public/v2/todos?status=${value}`,
      {
        headers: {
          Authorization: `Bearer ${"0f54af475cf0ba5b2317f36e021fd3d2be2497b022e38db4cf7b5e7164f19e35"}`,
          "Content-Type": "application/json",
        },
      }
    );
    const APIData = res2.data;
    const slice = APIData.slice(offset, offset + perpage);

    setAPIData(slice);
  };

  const onstatus = async () => {
    const res1 = await axios.get(`https://gorest.co.in/public/v2/todos`, {
      headers: {
        Authorization: `Bearer ${"0f54af475cf0ba5b2317f36e021fd3d2be2497b022e38db4cf7b5e7164f19e35"}`,
        "Content-Type": "application/json",
      },
    });
    const APIData = res1.data;
    const slice = APIData.slice(offset, offset + perpage);

    setAPIData(slice);
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

      <div>
        <button onClick={() => onstatus()}>All</button>
        <button onClick={() => status("completed")}>Completed</button>
        <button onClick={() => status("pending")}>Pending</button>
      </div>

      <Table.Body>
        {APIData.map((data) => {
          return (
            <>
              {" "}
              <Table.Row>
                <Table.Cell>{data.id}</Table.Cell>
                <Table.Cell>{data.user_id}</Table.Cell>
                <Table.Cell>{data.title}</Table.Cell>
                <Table.Cell>
                  {moment(data.due_on).format("DD/MM/YYYY")}
                </Table.Cell>
                <Table.Cell>{data.status}</Table.Cell>
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
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        subContainerClassName={"page-item"}
        activeClassName={"active"}
      />
    </>
  );
}

export default Todo;
