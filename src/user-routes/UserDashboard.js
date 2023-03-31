import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { Card, Container } from "react-bootstrap";
import AddPost from "../components/AddPost";
import { deletePostService, loadPostUserWise } from "../services/post-service";
import { getCurrentUserDetail } from "../authentication";
import Post from "../components/Post";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setUser(getCurrentUserDetail());
    console.log(user);
    loadUserPost()
  }, []);

  const loadUserPost = () => {
    loadPostUserWise(getCurrentUserDetail().id)
      .then((data) => {
        setPosts([...data]);
        console.log(posts);
      })
      .catch((error) => console.log(error));
  };

  const deletePostById = (posts) => {
    deletePostService(posts.postId).then(response => {
      toast.success("Post deleted successfully !")
      loadUserPost();
    }).catch(error => {
      console.log(error)
      toast.error("Error deleting post !")
    })
  }

  return (
    <Base>
      <Container>
        <AddPost />
        <Card className="rounded-1 border-0 mt-3">
          <Card.Body
            md={{
              size: 10,
              offset: 1,
            }}
          >
            <Card.Header className="shadow-lg">
              <Card.Title>Blogs Count ({posts?.length})</Card.Title>
            </Card.Header>
            {posts &&
              posts.map((post, index) => <Post deletePost={deletePostById} post={post} key={index} />)}
          </Card.Body>
        </Card>
      </Container>
    </Base>
  );
};

export default UserDashboard;
