import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Image,
  InputGroup,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { isLoggedIn } from "../authentication";
import Base from "../components/Base";
import { BASE_URL } from "../services/helper";
import { createComment, loadSinglePost } from "../services/post-service";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [comment, setComment] = useState({
    content: "",
  });
  useEffect(() => {
    loadSinglePost(postId)
      .then((data) => {
        setPost(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const printDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const submitPost = (event) => {
    event.preventDefault();
    if (!isLoggedIn()) {
      toast.error("You need to be logged in before post your comment !");
      return;
    }
    if (comment.content.trim() === "") {
      toast.warning("Write comment before post !");
      return;
    }
    createComment(comment, post.postId)
      .then((data) => {
        console.log(data);
        toast.success("Comment submitted !");
        setPost({ ...post, comments: [...post.comments, data] });
        setComment({
          content: "",
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <Base>
      <Container className="mt-3">
        <Card className="mt-3">
          <Card.Body>
            <Card className="border-0 shadow rounded-0">
              <Card.Body>
                <Link to="/">Home</Link> / <Link to="">{post?.title}</Link>
              </Card.Body>
            </Card>
            <Card.Text className="mt-3">
              Posted by{" "}
              <b>
                {post?.user.name} on {printDate(post?.addedDate)}
              </b>
            </Card.Text>

            <Card>
              <Card.Body>
                <Card.Text className="text-muted">
                  <span>{post?.category?.categoryTitle}</span>
                </Card.Text>
                <Card.Header>
                  <Card.Title>{post?.title}</Card.Title>
                </Card.Header>
                <Container className="text-center shadow mt-3">
                  <Image
                    className="img-fluid"
                    style={{ maxWidth: "50%" }}
                    src={BASE_URL + "/post/image/" + post?.imageName}
                  />
                </Container>
                <Card.Text
                  className="mt-4"
                  dangerouslySetInnerHTML={{ __html: post?.content }}
                />
              </Card.Body>
            </Card>
            <Card className="border-0 mt-3 shadow">
              <Card.Header className="shadow">
                <Card.Title>
                  Comments ( {post ? post.comments.length : 0} )
                </Card.Title>
              </Card.Header>
              {post &&
                post.comments.map((comment, index) => (
                  <Card className="shadow-sm mt-1 rounded-0" key={index}>
                    <Card.Body>
                      <Card.Text className="ms-3">{comment.content}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              <Card.Footer>
                <Form>
                  <InputGroup>
                    <Form.Control
                      className="rounded-0 border-0 shadow"
                      rows={4}
                      placeholder="Comments...."
                      as="textarea"
                      value={comment.content}
                      onChange={(event) =>
                        setComment({ content: event.target.value })
                      }
                    ></Form.Control>
                  </InputGroup>
                  <Button
                    onClick={submitPost}
                    className="rounded-1 mt-2"
                    type="submit"
                    variant="dark"
                  >
                    P O S T
                  </Button>
                </Form>
              </Card.Footer>
            </Card>
          </Card.Body>
        </Card>
      </Container>
    </Base>
  );
};

export default PostPage;
