import React, { useEffect, useRef, useState } from "react";
import Base from "./Base";
import { Button, Card, Container, Form, FormGroup } from "react-bootstrap";
import { loadAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";
import { loadSinglePost, updatePostService } from "../services/post-service";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UpdatePost() {
  const { postId } = useParams();
  const editor = useRef(null);
  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState();

  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });

    loadSinglePost(postId)
      .then((data) => {
        console.log(data);
        setPost({ ...data, categoryId: data.category.categoryId });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleChange = (event, fieldName) => {
    setPost({ ...post, [fieldName]: event.target.value });
  };

  const contentFieldChanged = (data) => {
    setPost({ ...post, content: data });
  };

  const updatePost = (event) => {
    event.preventDefault();
    updatePostService(
      { ...post, category: { categoryId: post.categoryId } },
      post.postId
    )
      .then((data) => {
        console.log(data);
        toast.success("Post updated !");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in updating post !")
      });
  };

  return (
    <Base>
      <Card style={{ boxShadow: "0 6px 6px -6px #fff", border: "0" }}>
        <Card.Body>
          <Card.Title>What you thinking ?</Card.Title>
          <Form onSubmit={updatePost}>
            <FormGroup className="mb-3 mt-2">
              <Form.Label>Post title :</Form.Label>
              <Form.Control
                name="title"
                placeholder="Post title"
                type="text"
                value={post?.title}
                onChange={(data) => handleChange(data, "title")}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Label>Post content :</Form.Label>

              <JoditEditor
                ref={editor}
                value={post?.content}
                onChange={contentFieldChanged}
              />
            </FormGroup>
            <Form.Group className="mb-3">
              <Form.Label for="image">Upload your post banner</Form.Label>
              <Form.Control
                id="image"
                accept="image/*"
                type="file"
                onChange={""}
                //   value={post?.imageName}
                multiple
              />
            </Form.Group>
            <FormGroup>
              <Form.Label>Category :</Form.Label>
              <Form.Control
                as="select"
                name="categoryId"
                onChange={(data) => handleChange(data, "categoryId")}
                value={post?.categoryId}
              >
                <option disabled value={0}>
                  ----Select category-----
                </option>
                {categories.map((category) => (
                  <option value={category.categoryId} key={category.categoryId}>
                    {category.categoryTitle}
                  </option>
                ))}
              </Form.Control>
            </FormGroup>
            <Container className="text-center mt-4">
              <Button
                variant="warning"
                className="rounded-1"
                style={{
                  width: "130px!important",
                  height: "45px",
                  fontSize: "18px !important",
                }}
                type="submit"
              >
                Update Post
              </Button>
              <Button
                variant="danger ms-2 rounded-1"
                style={{
                  width: "140px !important",
                  height: "45px",
                  fontSize: "18px",
                }}
                type="reset"
                onClick={""}
              >
                Reset Content
              </Button>
            </Container>
          </Form>
        </Card.Body>
      </Card>
    </Base>
  );
}

export default UpdatePost;
