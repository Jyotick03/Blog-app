import React from "react";
import { Modal } from "react-bootstrap";

export default function SignUp(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Fill information to register !!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label>Enter Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="mb-3">
            <label>About</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="About something"
              required
            ></textarea>
          </div>
          <div className="container text-center">
            <button type="submit" className="btn btn-dark">
              Register
            </button>
            <button type="reset" className="btn ms-2 btn-secondary">
              Reset
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
