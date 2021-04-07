const User = require("../../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");
const { UserInputError } = require("apollo-server");
const {
  registerValidateInput,
  loginValidateInput,
} = require("../../utils/validations");

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = loginValidateInput(username, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = "Wrong credintials";
        throw new UserInputError("Wrong credintials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, password, confirmPassword, email } }
    ) {
      const { errors, valid } = registerValidateInput(
        username,
        password,
        confirmPassword,
        email
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });

      if (user) {
        throw new UserInputError("Username is already taken", {
          errors: {
            username: "Username is already taken",
          },
        });
      }

      const userEmail = await User.findOne({ email });

      if (userEmail) {
        throw new UserInputError("Email already exists", {
          errors: {
            email: "Email already exists",
          },
        });
      }

      hashPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        password: hashPassword,
        email,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
  Query: {
    async getUsers() {
      try {
        const user = await User.find();

        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};
