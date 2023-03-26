import React from "react";
import { Button, Card } from "react-bootstrap";

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
        <Card.Text dangerouslySetInnerHTML={{__html:post.content.substring(0, 100) + "...."}}/>
        <Button className="rounded-1 mt-2" variant="secondary">
          Read more
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Post;
