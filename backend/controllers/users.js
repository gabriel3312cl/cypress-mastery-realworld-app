const { User } = require("../models");
const { jwtSign } = require("../helper/jwt");
const { bcryptHash, bcryptCompare } = require("../helper/bcrypt");
const { ValidationError } = require("../helper/customErrors");

// Register
const signUp = async (req, res, next) => {
  try {
    const { username, email, bio, image, password } = req.body.user;

    const usernameExists = await User.findOne({
      where: { username: req.body.user.username },
    });
    if (usernameExists) throw new ValidationError("Username has already been taken");

    const userExists = await User.findOne({
      where: { email: req.body.user.email },
    });
    if (userExists) throw new ValidationError("Email has already been taken");

    const newUser = await User.create({
      email: email,
      username: username,
      bio: bio,
      image: image,
      password: await bcryptHash(password),
    });

    newUser.dataValues.token = await jwtSign(newUser);

    res.status(201).json({ user: newUser });
  } catch (error) {
    next(error);
  }
};

// Login
const signIn = async (req, res, next) => {
  try {
    const { user } = req.body;

    const existentUser = await User.findOne({ where: { email: user.email } });
    if (!existentUser) throw new ValidationError("Email or password is invalid");

    const pwd = await bcryptCompare(user.password, existentUser.password);
    if (!pwd) throw new ValidationError("Email or password is invalid");

    existentUser.dataValues.token = await jwtSign(user);

    res.json({ user: existentUser });
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, signIn };
