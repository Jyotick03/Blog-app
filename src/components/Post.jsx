import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Post({
  post = {
    title: "This is default post title.",
    content: "This is default post content.",
  },
}) {
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
      </Card.Body>
    </Card>
  );
}

export default Post;
