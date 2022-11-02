import { Button, Checkbox, Form } from "semantic-ui-react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const navigate = useNavigate();
  const api = "https://gorest.co.in/public/v2/users";
  const postData = () => {
    axios
      .post(
        api,
        { id, name, email, gender, status },
        {
          headers: {
            Authorization: `Bearer ${"0f54af475cf0ba5b2317f36e021fd3d2be2497b022e38db4cf7b5e7164f19e35"}`,
          },
        }
      )
      .then(() => navigate("/read"));
  };

  return (
    <div>
      <link to="/"></link>
      <Form className="create-form">
        <Form.Field>
          <label>ID</label>
          <input
            placeholder="Enter Id "
            value={id}
            type="text"
            onChange={(e) => setId(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Name</label>
          <input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>email</label>
          <input
            placeholder="Email"
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Gender</label>
          <input
            placeholder="Gender"
            type="text"
            required
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Status</label>
          <input
            placeholder="Status"
            type="text"
            value={status}
            required
            onChange={(e) => setStatus(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="I agree to the Terms and Conditions"
            onChange={(e) => setCheckbox(!checkbox)}
          />{" "}
        </Form.Field>

        <Button type="submit" onClick={postData}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
