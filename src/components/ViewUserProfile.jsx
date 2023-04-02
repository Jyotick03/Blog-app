import React from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useContext } from "react";
import userContext from "../context/userContext";
import ProfileImg from "../assets/profileImg.jpg";
import { useEffect } from "react";
import { getCurrentUserDetail, isLoggedIn } from "../authentication";
import { useState } from "react";

const ViewUserProfile = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    setCurrentUser(getCurrentUserDetail());
    console.log(getCurrentUserDetail());
    setLogin(isLoggedIn());
  }, []);
  return (
    <Container>
      <Card className="mt-5 rounded-1">
        <Card.Body>
          <Card.Header className="shadow-lg text-info"  style={{background: "#000000c2, #000000c2" }}>
            <Card.Title className="fs-3 pt-2 fw-lighter text-center">
              USER INFORMATION
            </Card.Title>
          </Card.Header>
          <Container className="inf-content mt-1 rounded-0">
            <Row>
              <Col className="col-md-3">
                <Image
                  alt=""
                  style={{ Width: "600px !important" }}
                  title=""
                  className="img-fluid mt-1 rounded-circle img-thumbnail isTooltip"
                  src={user.image ? user.image : ProfileImg}
                />
              </Col>
              <Col className="col-md-6 mt-3">
                <div className="table-responsive">
                  <table className="table table-user-information">
                    <tbody>
                      <tr>
                        <td>
                          <strong>
                            <span className="text-dark"></span>
                            UserId
                          </strong>
                        </td>
                        <td className="text-dark">{user.id}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            <span className=" text-dark"></span>
                            Name
                          </strong>
                        </td>
                        <td className="text-dark">{user.name}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            <span className="text-dark"></span>
                            E-mail
                          </strong>
                        </td>
                        <td className="text-dark">{user.email}</td>
                      </tr>

                      <tr>
                        <td>
                          <strong>
                            <span className="text-dark"></span>
                            Role
                          </strong>
                        </td>
                        <td className="text-dark">
                          {user.roles?.map((role) => {
                            return <span key={role.id}>{role.name}</span>;
                          })}
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <strong>
                            <span className="text-dark"></span>
                            About
                          </strong>
                        </td>
                        <td className="text-dark">{user.about}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {login && user.id === currentUser.id ? (
                  <Container className="mt-3 mb-3 text-center">
                    <Button variant="warning">Profile Update</Button>
                  </Container>
                ) : (
                  " "
                )}
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewUserProfile;
