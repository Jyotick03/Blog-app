import React, { useEffect, useState } from "react";
import { Col, ListGroup, ListGroupItem, Row, Tab } from "react-bootstrap";
import { toast } from "react-toastify";
import { loadAllCategories } from "../services/category-service";
import { Link } from "react-router-dom";

const SideMenu = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Categories are not found !");
      });
  }, []);
  const useStyle = {
    textDecorationLine: "none",
    // webkitTextFillColor: "blue",
  };
  return (
    <Tab.Container>
      <Row>
        <Col>
          <ListGroup>
            <Link to="/" style={useStyle}>
              <ListGroupItem action={true}>All blogs</ListGroupItem>
            </Link>
            {categories.map((category, index) => (
              <Link
                to={"/categories/" + category.categoryId + "/posts"}
                style={useStyle}
              >
                <ListGroupItem key={index} action={true}>
                  {category.categoryTitle}
                </ListGroupItem>
              </Link>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default SideMenu;
