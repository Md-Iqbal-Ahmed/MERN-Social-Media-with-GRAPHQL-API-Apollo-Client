import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { AuthContext } from "../components/authContext/Auth";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = (props) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState("");
  const context = useContext(AuthContext);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [adduser, { loading }] = useMutation(RegisterUser, {
    update(_, { data: { register: userData } }) {
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

    adduser();
  };

  return (
    <div className="form-container">
      <Form
        onSubmit={handleSubmit}
        noValidate
        className={loading ? loading : ""}
      >
        <h1 className="form-container-h1">Registration</h1>
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
          label="Email"
          placeholder="Enter Your Email Address"
          name="email"
          type="text"
          value={values.email}
          error={errors.email ? true : false}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Your Password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={handleChange}
        />
        <Button type="submit" color="teal">
          Register
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

export default Register;

const RegisterUser = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      token
      username
      email
      createdAt
    }
  }
`;
