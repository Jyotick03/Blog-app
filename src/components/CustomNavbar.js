import React, { useEffect, useState } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavLink,
  OffcanvasTitle,
} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import "./CustomNavbar.css";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { getCurrentUserDetail, isLoggedIn } from "../authentication";
import { doLogout } from "../authentication/index";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import userContext from "../context/userContext";
import { useContext } from "react";

function CustomNavbar() {
  const userContextData = useContext(userContext);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUserDetail());
  }, [login]);

  const logout = () => {
    doLogout(() => {
      setLogin(false);
      userContextData?.setUser({
        data: null,
        login: false,
      });
      navigate("/");
    });
  };

  return (
    <>
      <Navbar
        key="lg"
        sticky="top"
        bg="dark"
        variant="dark"
        expand="lg"
        className="mb-3"
        style={{ boxShadow: "0 8px 6px -6px white" }}
      >
        <Container lg className="bg-#181818">
          <NavbarBrand className="fs-4">Blogging-App</NavbarBrand>
          <NavbarToggle aria-controls="offcanvasNavbar-expand-lg" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="`offcanvasNavbarLabel-expand-lg"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <OffcanvasTitle id="offcanvasNavbarLabel-expand-lg">
                Blogging-App
              </OffcanvasTitle>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="nav justify-content-center flex-grow-1 pe-3 nav-pills">
                <Link to="/" className="nav-link col-2 text-center fs-5">
                  Home
                </Link>
                <Link to="/about" className="nav-link col-2 text-center fs-5">
                  About
                </Link>
                <Link
                  to="/services"
                  className="nav-link col-2 text-center fs-5"
                >
                  Services
                </Link>
                <NavDropdown
                  title="More"
                  className="col-3 text-center fs-5"
                  id="offcanvasNavbarDropdown-expand-lg"
                >
                  <NavDropdown.Item>
                    <Link
                      to="/services"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Contact us
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>Youtube</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>facebook</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className="nav justify-content-end flex-grow-1 pe-3 nav-pills">
                {login && (
                  <>
                    <Navbar.Text
                      onClick={logout}
                      className="col-4 text-center fs-5"
                    >
                      <BiLogOut className="me-1" /> Log out
                    </Navbar.Text>

                    <Navbar.Text
                      className="col-7 text-left fs-5"
                      style={{ cursor: "pointer" }}
                    >
                      <Link to="/user/profile-info">
                        <CgProfile className="me-1" />
                        {user.name}
                      </Link>
                    </Navbar.Text>
                  </>
                )}
                {!login && (
                  <>
                    <NavLink
                      className="fs-5 col-3 text-center"
                      onClick={() => setModalShow(true)}
                    >
                      Log in
                    </NavLink>
                    <Login
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                    <NavLink
                      className="fs-5 col-3  text-center"
                      onClick={() => setModalShow1(true)}
                    >
                      Sign Up
                    </NavLink>
                    <SignUp
                      show={modalShow1}
                      onHide={() => setModalShow1(false)}
                    />
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
export default CustomNavbar;
