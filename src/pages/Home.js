import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Base from "../components/Base";
import NewFeed from "../components/NewFeed";
import SideMenu from "../components/SideMenu";

const Home = () => {
  return (
    <Base>
      <Container>
        <Row>
          <Col xs lg="2">
            <SideMenu />
          </Col>
          <Col>
            <NewFeed mt-3 />
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Home;
