import { useEffect, useState, useContext } from "react";
import userContext from "../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleUser, updateUser } from "../services/user-service";
import { toast } from "react-toastify";
import { Button, Container, Form, Modal } from "react-bootstrap";

export default function UpdateUser(props) {
  const { userId } = useParams();
  const userContextData = useContext(userContext);
  const navigate = useNavigate();
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

  useEffect(() => {
    getSingleUser(userId)
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setData({ ...data, [field]: actualValue });
  };

  const submitForm = (event) => {
    event.preventDefault();
    updateUser(data, data.id)
      .then((data) => {
        console.log(data);
        toast.success("User updates successfully !");
      })
      .catch((error) => {
        console.log(error);
        toast.error("User updates failed !");
      });
    navigate("/");
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
          Update your details !!
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
              Submit
            </Button>
            {JSON.stringify(data)}
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
