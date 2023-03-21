import React from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavLink,
  OffcanvasTitle,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavbarText } from "reactstrap";
import { Link } from "react-router-dom";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import "./CustomNavbar.css";
function CustomNavbar(args) {
  return (
    <>
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          bg="dark"
          variant="dark"
          expand={expand}
          className="mb-3"
        >
          <Container lg>
            <NavbarBrand href="#" className="fs-4">
              Blogging-App
            </NavbarBrand>
            <NavbarToggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <OffcanvasTitle id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </OffcanvasTitle>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="nav justify-content-center flex-grow-1 pe-3 nav-pills">
                  <NavLink className="col-3 text-center fs-5">
                    <Link to="/">Home</Link>
                  </NavLink>

                  <NavLink className="col-3 text-center fs-5">
                    <Link to="/about">About</Link>
                  </NavLink>
                  <NavDropdown
                    title="Dropdown"
                    className="col-4 text-center fs-5"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav className="nav justify-content-end flex-grow-1 pe-3 nav-pills">
                  <NavLink className="fs-5 col-3  text-center">
                    <Link to="/signup">Register</Link>
                  </NavLink>
                  <NavLink className="fs-5 col-3  text-center">
                    <Link to="/login">Login</Link>
                  </NavLink>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
export default CustomNavbar;
