import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { AuthContext } from "../components/authContext/Auth";

const initialState = {
  username: "",
  password: "",
};

const Login = (props) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState("");
  const context = useContext(AuthContext);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [LoginUser, { loading }] = useMutation(Login_User, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    LoginUser();
  };

  return (
    <div className="form-container">
      <Form
        onSubmit={handleSubmit}
        noValidate
        className={loading ? loading : ""}
      >
        <h1 className="form-container-h1">Login</h1>

        <Form.Input
          label="Username"
          placeholder="Enter Your Username"
          name="username"
          type="text"
          error={errors.username ? true : false}
          value={values.username}
          onChange={handleChange}
        />
        <Form.Input
          label="Password"
          placeholder="Enter Your Password"
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={handleChange}
        />

        <Button type="submit" color="teal">
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Login;

const Login_User = gql`
  mutation register($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      token
      createdAt
    }
  }
`;
