import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Container, Form, FormGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { getCurrentUserDetail } from "../authentication";
import { loadAllCategories } from "../services/category-service";
import { doCreatePost } from "../services/post-service";

const AddPost = () => {
  const editor = useRef(null);
  const [user, setUser] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });
  useEffect(() => {
    setUser(getCurrentUserDetail());
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fieldChanged = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };
  const contentFieldChanged = (data) => {
    setPost({ ...post, content: data });
  };

  const createPost = (event) => {
    event.preventDefault();
    if (post.title.trim() === "") {
      alert("Please enter a title !");
      return;
    }
    if (post.content.trim() === "") {
      alert("Please write something in content !");
      return;
    }
    if (post.categoryId === "") {
      alert("Please select from a category !");
      return;
    }

    //Submit the form
    post["userId"] = user.id;
    doCreatePost(post)
      .then((data) => {
        alert("Post created successfully !");
        toast.success("Post created successfully !");
        console.log(post);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  };
  const handleReset = () => {
    setPost({
      title: "",
      content: "",
      categoryId: "",
    });
  };

  return (
    <Card style={{ boxShadow: "0 6px 6px -6px #fff", border: "0" }}>
      <Card.Body>
        <Card.Title>What you thinking ?</Card.Title>
        <Form onSubmit={createPost}>
          <FormGroup className="mb-3 mt-2">
            <Form.Label>Post title :</Form.Label>
            <Form.Control
              for="title"
              name="title"
              placeholder="Post title"
              type="text"
              onChange={fieldChanged}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Label>Post content :</Form.Label>
            {/* <Form.Control
              for="title"
              placeholder="Post content"
              as="textarea"
              value=""
              required
              style={{ height: "200px" }}
            /> */}
            <JoditEditor
              ref={editor}
              value={post.content}
              onChange={contentFieldChanged}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Category :</Form.Label>
            <Form.Control
              as="select"
              name="categoryId"
              onChange={fieldChanged}
              defaultValue={0}
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
              variant="dark"
              className="rounded-1"
              style={{
                width: "130px!important",
                height: "45px",
                fontSize: "18px !important",
              }}
              type="submit"
            >
              Create Post
            </Button>
            <Button
              variant="danger ms-2 rounded-1"
              style={{
                width: "140px !important",
                height: "45px",
                fontSize: "18px",
              }}
              type="reset"
              onClick={handleReset}
            >
              Reset Content
            </Button>
          </Container>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddPost;
