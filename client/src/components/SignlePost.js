import React, { useContext, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import {
  Card,
  Grid,
  Modal,
  Button,
  Icon,
  Form,
  Transition,
} from "semantic-ui-react";
import moment from "moment";
import { AuthContext } from "../components/authContext/Auth";
import DeleteButton from "./DeleteButton";
import MyPopup from "./MyPopUp";

const SignlePost = () => {
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = useState("");

  const params = useParams();
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const postId = params.postId;

  const { data, loading } = useQuery(fetchSinglePost, {
    variables: { postId },
  });

  const [createPost] = useMutation(create_post, {
    update() {
      setComment("");
    },
    variables: {
      postId,
      body: comment,
    },
  });

  const deletePostCallback = () => {
    history.push("/");
  };

  if (loading) {
    <h1>Loading....</h1>;
  }
  return (
    <div style={{ marginTop: "20px", marginLeft: "20%" }}>
      {data && (
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              <>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      {data.getPost.username}

                      {user && user.username === data.getPost.username && (
                        <DeleteButton
                          postId={postId}
                          callback={deletePostCallback}
                        />
                      )}
                    </Card.Header>

                    <Card.Meta>
                      {moment(data.getPost.createdAt).fromNow()}
                    </Card.Meta>
                    <Card.Description style={{ marginTop: "15px" }}>
                      {data.getPost.body}
                    </Card.Description>
                  </Card.Content>

                  <Card.Content extra>
                    <Card.Description
                      textAlign="left"
                      style={{
                        color: "teal",
                        fontSize: "1.3rem",
                      }}
                    >
                      {data.getPost.likeCount} of your friends likes your post
                      <Modal
                        closeIcon
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        style={{ top: "15vh" }}
                        size="tiny"
                        trigger={
                          <Button floated="right" color="blue">
                            See who Like this Post
                          </Button>
                        }
                      >
                        <Modal.Content>
                          {data.getPost.likes.map((like) => (
                            <h1
                              style={{
                                textAlign: "center",
                                padding: "5px",
                                margin: "5px 0",
                                color: "teal",
                              }}
                              key={like.id}
                            >
                              {like.username}
                              <span
                                style={{
                                  fontSize: "16px",
                                  color: "darkgrey",
                                  marginLeft: "25px",
                                  justifyItems: "center",
                                }}
                              >
                                {moment(like.createdAt).fromNow(true)}
                              </span>
                            </h1>
                          ))}
                        </Modal.Content>
                      </Modal>
                    </Card.Description>
                  </Card.Content>
                </Card>
                {user && (
                  <Card fluid>
                    <Card.Content>
                      <Card.Header style={{ marginBottom: "10px" }}>
                        Post a Comment
                      </Card.Header>
                      <Form>
                        <Form.TextArea
                          type="text"
                          name="comment"
                          onChange={(e) => setComment(e.target.value)}
                          rows={2}
                          value={comment}
                          required
                        />
                        <MyPopup content="Create Comments">
                          <Button
                            color="teal"
                            floated="right"
                            type="submit"
                            onClick={createPost}
                          >
                            Create Comment
                          </Button>
                        </MyPopup>
                      </Form>
                    </Card.Content>
                  </Card>
                )}
                {data.getPost.comments.map((comment) => (
                  <Transition.Group key={comment.id}>
                    <Card key={comment.id} fluid>
                      <Card.Content>
                        <Card.Header>
                          {comment.username}{" "}
                          {user && user.username === comment.username && (
                            <DeleteButton
                              postId={postId}
                              commentId={comment.id}
                            />
                          )}
                        </Card.Header>

                        <Card.Meta>
                          {moment(comment.createdAt).fromNow()}
                        </Card.Meta>
                        <Card.Description>{comment.body}</Card.Description>
                      </Card.Content>
                    </Card>
                  </Transition.Group>
                ))}
              </>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </div>
  );
};

export default SignlePost;

const create_post = gql`
  mutation createComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      body
      comments {
        id
        createdAt
        body
        username
      }
    }
  }
`;

const fetchSinglePost = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      username
      createdAt
      body
      user
      commentCount
      likeCount
      comments {
        id
        username
        createdAt
        body
      }
      likes {
        id
        username
        createdAt
      }
    }
  }
`;
