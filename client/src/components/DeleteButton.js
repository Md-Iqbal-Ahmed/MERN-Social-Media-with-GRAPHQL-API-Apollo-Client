import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import MyPopup from "./MyPopUp";
import { useMutation, gql } from "@apollo/client";
import { fetchAllPosts } from "../components/graphql";

const DeleteButton = ({ postId, commentId, callback }) => {
  const [confrimOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? Delete_comment : Delete_post;

  const [deleteMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: fetchAllPosts,
        });
        proxy.writeQuery({
          query: fetchAllPosts,
          data: {
            getPosts: data.getPosts.filter((p) => p.id !== postId),
          },
        });
      }
      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <>
      <MyPopup content={commentId ? "Delete Comment" : "Delete Post"}>
        <Button
          color="red"
          floated="right"
          size="mini"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon
            style={{ marginLeft: "3px" }}
            size="large"
            name="trash alternate"
          />
        </Button>
      </MyPopup>
      <Confirm
        open={confrimOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteMutation}
      />
    </>
  );
};

export default DeleteButton;

const Delete_post = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const Delete_comment = gql`
  mutation deleComment($postId: String!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;
