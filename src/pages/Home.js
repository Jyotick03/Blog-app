import React from "react";
import { Container } from "react-bootstrap";
import Base from "../components/Base";
import NewFeed from "../components/NewFeed";

const Home = () => {
  return (
    <Base>
      <Container>
        <NewFeed mt-3 />
      </Container>
    </Base>
  );
};

export default Home;
