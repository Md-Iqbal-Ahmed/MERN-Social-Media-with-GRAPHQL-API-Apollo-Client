const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { AuthenticationError } = require("apollo-server");

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invlid token");
      }
    }
    throw new Error("Authencation token must be provided as 'Bearer [token]");
  }
  throw new Error("Authentication header must be provided");
};
