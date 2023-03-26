import React, { useEffect, useState } from "react";
import { Card, Container, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import { loadAllPosts } from "../services/post-service";
import Post from "./Post";

function NewFeed() {
  const [posts, setPosts] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });
  useEffect(() => {
    changePage(0);
  }, []);
  const changePage = (pageNumber = 0, pageSize = 5) => {
    loadAllPosts(pageNumber, pageSize)
      .then((data) => {
        setPosts(data);
        window.scroll(0, 0);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading posts !");
      });
  };
  return (
    <>
      <Card className="rounded-1 border-0">
        <Card.Body
          md={{
            size: 10,
            offset: 1,
          }}
        >
          <Card.Header className="shadow-lg">
            <Card.Title>Blogs Count ({posts?.totalElements})</Card.Title>
          </Card.Header>
          {posts.content?.map((post) => (
            <Post post={post} key={post.postId} />
          ))}
          <Container className="mt-3">
            <Pagination size="lg" className="justify-content-center">
              <Pagination.First
                onClick={() => changePage(0)}
                disabled={posts.pageNumber === 0}
              />
              <Pagination.Prev
                onClick={() => changePage(posts.pageNumber - 1)}
                disabled={posts.pageNumber === 0}
              >
                Previous
              </Pagination.Prev>
              {[...Array(posts.totalPages)].map((item, index) => (
                <Pagination.Item
                  onClick={() => changePage(index)}
                  active={index === posts.pageNumber}
                  key={index}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => changePage(posts.pageNumber + 1)}
                disabled={posts.lastPage}
              >
                Next
              </Pagination.Next>
              <Pagination.Last
                onClick={() => changePage(posts.totalPages - 1)}
                disabled={posts.pageNumber === posts.totalPages - 1}
              />
            </Pagination>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
}

export default NewFeed;
