import React, { useEffect, useState, useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCurrentUserDetail, isLoggedIn } from "../authentication";
import userContext from "../context/userContext";

function Post({
  post = {
    title: "This is default post title.",
    content: "This is default post content.",
  },
  deletePost,
}) {
  const userContextData = useContext(userContext);
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(null);

  useEffect(() => {
    setUser(getCurrentUserDetail());
    setLogin(isLoggedIn());
  }, []);
  return (
    <Card className="rounded-0 shadow-sm mt-3 border-1 p-2">
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text
          dangerouslySetInnerHTML={{
            __html: post.content.substring(0, 100) + "....",
          }}
        />
        <Link
          to={"/posts/" + post.postId}
          className="btn btn-secondary rounded-1 mt-2"
        >
          Read more
        </Link>
        {userContextData?.user.login && login && user.id === post.user.id ? (
          <Link to={"/user/update/" + post.postId}
            className="btn btn-warning rounded-1 ms-2 mt-2"
          >
            Update
          </Link>
        ) : (
          " "
        )}
        {userContextData?.user.login && login && user.id === post.user.id ? (
          <Button
            onClick={() => deletePost(post)}
            className="rounded-1 ms-2 mt-2"
            variant="danger"
          >
            Delete
          </Button>
        ) : (
          " "
        )}
      </Card.Body>
    </Card>
  );
}

export default Post;
