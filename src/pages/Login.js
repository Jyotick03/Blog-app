import { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doLogin } from "../authentication";
import { loginUser } from "../services/user-service";

export default function Login(props) {
  const navigate = useNavigate();
  const [loginDetail, setLoginDetail] = useState({
    userName: "",
    password: "",
  });
  const [error, setError] = useState({
    errors: [],
    isError: false,
  });

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({ ...loginDetail, [field]: actualValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);

    if (
      loginDetail.userName.trim() === "" ||
      loginDetail.password.trim() === ""
    ) {
      toast.error("UserName or Password is required !!");
      return;
    }

    loginUser(loginDetail)
      .then((data) => {
        toast.success("Login successful !!");
        console.log(data);
        doLogin(data, () => {
          console.log("Data successfully saved in local-storage.");
          navigate("/user/dashboard");
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400 || error.response.status === 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong on server !");
        }
      });
  };

  const handleReset = () => {
    setLoginDetail({
      userName: "",
      password: "",
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
          Login here !!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              onChange={(event) => handleChange(event, "userName")}
              value={loginDetail.email}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={(event) => handleChange(event, "password")}
              value={loginDetail.password}
            />
          </Form.Group>
          <Container className="text-center">
            <Button className="rounded-1" type="Login" variant="dark">
              Login
            </Button>
            <Button className="rounded-1" onClick={handleReset} type="reset" variant="danger ms-2">
              Reset
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
