import React, { useContext } from "react";
import { Card, Icon, Button, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "./authContext/Auth";
import LikedButton from "./LikedButton";
import DeleteButton from "./DeleteButton";
import MyPopup from "./MyPopUp";

const PostCard = ({
  post: { id, username, createdAt, body, likeCount, commentCount, likes },
}) => {
  const { user } = useContext(AuthContext);
  return (
    <div style={{ margin: "5px 5px 20px 30px" }}>
      <Card>
        <Card.Content>
          {user && user.username === username && <DeleteButton postId={id} />}
          <Card.Header
            size="large"
            style={{ color: "#3b5998" }}
            content={username}
          />
          <Card.Meta
            as={Link}
            to={`/posts/${id}`}
            content={moment(createdAt).fromNow(true)}
          />

          <Card.Description content={body} />
        </Card.Content>
        <Card.Content extra>
          <LikedButton user={user} post={{ id, likeCount, likes }} />
          <MyPopup content="Comment on Post">
            <Button as="div" floated="right" labelPosition="right">
              <Button as={Link} to={`/posts/${id}`} basic color="teal">
                <Icon size="large" name="chat" />
              </Button>
              <Label
                as={Link}
                to={`/posts/${id}`}
                basic
                color="teal"
                pointing="left"
              >
                {commentCount}
              </Label>
            </Button>
          </MyPopup>
        </Card.Content>
      </Card>
    </div>
  );
};

export default PostCard;
