import React, { useState, useEffect } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import MyPopup from "./MyPopUp";

const LikedButton = ({ post: { id, likes, likeCount }, user }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes, user]);

  const [likePost] = useMutation(likePostMutation, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="blue">
        <Icon size="large" name="thumbs up" />
      </Button>
    ) : (
      <Button color="blue" basic>
        <Icon size="large" name="thumbs up" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="blue" basic>
      <Icon size="large" name="thumbs up" />
    </Button>
  );

  return (
    <MyPopup content={liked ? "Unlike" : "Like"}>
      <Button as="div" labelPosition="right" onClick={likePost}>
        {likeButton}
        <Label as="a" basic color="blue" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </MyPopup>
  );
};

export default LikedButton;

const likePostMutation = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
