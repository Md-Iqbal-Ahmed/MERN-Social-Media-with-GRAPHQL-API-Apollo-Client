import React, { useState } from "react";
import { Button, Header, Modal, Form, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { fetchAllPosts } from "./graphql";
import MyPopup from "./MyPopUp";

function ModalExampleModal() {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState({
    body: "",
  });

  const [createPost, { error }] = useMutation(create_post, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: fetchAllPosts,
      });
      proxy.writeQuery({
        query: fetchAllPosts,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = "";
    },
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createPost();
    setOpen(false);
    setValues("");
  };

  const handleCancel = () => {
    window.confirm("Are you sure to cancel this post??");
    setOpen(false);
    setValues("");
  };

  return (
    <div>
      <Modal
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ width: "600px", top: "200px" }}
        trigger={
          <Link
            style={{
              textDecoration: "none",
              color: "teal",
              fontWeight: "600",
              fontSize: "1.2rem",
            }}
            to="/"
          >
            Create Post
          </Link>
        }
      >
        <Modal.Header>Create Post</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Share yor thoughs with your friends</Header>
            <Form onSubmit={handleSubmit}>
              <Form.TextArea
                placeholder="What's in your mind!!"
                name="body"
                type="text"
                rows={4}
                onChange={handleChange}
                value={values.body}
              />
              <Modal.Actions>
                <Button
                  content="Share"
                  color="teal"
                  labelPosition="right"
                  icon="checkmark"
                  type="submit"
                  to="/"
                  positive
                />
                <Button
                  content="Cancel"
                  to="/"
                  color="black"
                  labelPosition="right"
                  icon="cancel"
                  onClick={handleCancel}
                />
              </Modal.Actions>
            </Form>
            {error && (
              <div className="ui error message">
                <ul className="list">
                  <li>{error.graphQLErrors[0].message}</li>
                </ul>
              </div>
            )}
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default ModalExampleModal;

const create_post = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      username
      body
      createdAt
    }
  }
`;
