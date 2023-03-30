import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { loadPostCategoryWise } from "../services/post-service";
import Base from "./Base";
import Post from "./Post";
import SideMenu from "./SideMenu";

function Category() {
  const { categoryId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPostCategoryWise(categoryId)
      .then((data) => {
        console.log(data);
        setPosts([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something is wrong with the category !");
      });
  }, [categoryId]);

  return (
    <Base>
      <Container>
        <Row>
          <Col xs lg="2">
            <SideMenu />
          </Col>
          <Col>
            <Card className="rounded-1 border-0">
              <Card.Body
                md={{
                  size: 10,
                  offset: 1,
                }}
              >
                <Card.Header className="shadow-lg">
                  <Card.Title>Blogs Count ( {posts.length} )</Card.Title>
                </Card.Header>

                {posts &&
                  posts.map((post, index) => <Post post={post} key={index} />)}
                {posts.length === 0 && (
                  <Card.Text className="mt-3 text-center fs-5">
                    Post is not available in this category.
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default Category;
