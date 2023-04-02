import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import {
  deletePostService,
  loadAllPosts,
  loadPostUserWise,
} from "../services/post-service";
import Post from "./Post";
import { getCurrentUserDetail } from "../authentication";
import { useNavigate } from "react-router-dom";

function NewFeed() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    changePage(currentPage);
  }, [currentPage]);
  const changePage = (pageNumber = 0, pageSize = 5) => {
    loadAllPosts(pageNumber, pageSize)
      .then((data) => {
        setPosts({
          content: [...posts.content, ...data.content],
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          pageSize: data.pageSize,
          pageNumber: data.pageNumber,
        });
        console.log(data);
        // window.scroll(0, 0);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading posts !");
      });
  };

  const pageChangeInfinite = () => {
    setCurrentPage(currentPage + 1);
    console.log("Page changed to " + currentPage + "...");
  };

  const loadUserPost = () => {
    loadPostUserWise(getCurrentUserDetail().id)
      .then((data) => {
        setPosts([...data]);
        console.log(posts);
      })
      .catch((error) => console.log(error));
  };

  const deletePostById = (posts) => {
    deletePostService(posts.postId)
      .then((response) => {
        toast.success("Post deleted successfully !");
        loadUserPost();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error deleting post !");
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
          <InfiniteScroll
            dataLength={posts?.content?.length}
            next={pageChangeInfinite}
            hasMore={posts.totalPages === posts.pageNumber ? false : true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {posts.content?.map((post) => (
              <Post post={post} deletePost={deletePostById} key={post.postId} />
            ))}
          </InfiniteScroll>
          {/* <Container className="mt-3">
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
          </Container> */}
        </Card.Body>
      </Card>
    </>
  );
}

export default NewFeed;
