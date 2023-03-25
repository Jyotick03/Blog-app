import React from "react";
import Base from "../components/Base";
import { Container } from 'react-bootstrap';
import AddPost from "../components/AddPost";

const UserDashboard = () => {
  return (
    <Base>
      <Container>
        <AddPost/>
      </Container>
    </Base>
  );
};

export default UserDashboard;
