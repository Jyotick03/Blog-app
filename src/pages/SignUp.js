import React, { useState } from "react";
import { Form, Modal, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { signup } from "../services/user-service";

export default function SignUp(props) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  //Submit the form
  const submitForm = (event) => {
    event.preventDefault();

    // if (error.isError) {
    //   toast.error("Form data is invalid, please try again.");
    //   setError({ ...error, isError: false });
    //   return;
    // }

    console.log(data);

    signup(data)
      .then((response) => {
        console.log(response);
        console.log("success log");
        toast.success("User is registered successfully !! " + response.id);
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("Error log");
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  //Reset the form
  const handleResetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Fill information to register !!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={submitForm}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              for="name"
              placeholder="Enter Name"
              required
              onChange={(event) => handleChange(event, "name")}
              value={data.name}
              isInvalid={error.errors?.response?.data?.name ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {error.errors?.response?.data?.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              for="email"
              placeholder="Enter email"
              required
              onChange={(event) => handleChange(event, "email")}
              value={data.email}
              isInvalid={error.errors?.response?.data?.email ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {error.errors?.response?.data?.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              for="password"
              placeholder="Password"
              required
              onChange={(event) => handleChange(event, "password")}
              value={data.password}
              isInvalid={error.errors?.response?.data?.password ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {error.errors?.response?.data?.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>About</Form.Label>
            <Form.Control
              as="textarea"
              for="about"
              placeholder="About something..."
              style={{ height: "100px" }}
              required
              onChange={(event) => handleChange(event, "about")}
              value={data.about}
              isInvalid={error.errors?.response?.data?.about ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {error.errors?.response?.data?.about}
            </Form.Control.Feedback>
          </Form.Group>
          <Container className="text-center">
            <Button type="submit" className="rounded-1" variant="dark">
              Register
            </Button>
            <Button
              className="rounded-1"
              type="reset"
              variant="danger ms-2"
              onClick={handleResetData}
            >
              Reset
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
