import React from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import { fetchAllPosts } from "../components/graphql";

const Home = () => {
  const { loading, data } = useQuery(fetchAllPosts);

  return (
    <Grid columns={3}>
      <Grid.Row className="page__title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        <Transition.Group>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            data.getPosts &&
            data.getPosts.map((post) => (
              <Grid.Column key={post.id}>
                <PostCard post={post} />
              </Grid.Column>
            ))
          )}
        </Transition.Group>
      </Grid.Row>
    </Grid>
  );
};

export default Home;
