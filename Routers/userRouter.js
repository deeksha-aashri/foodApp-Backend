const express = require("express");
const userRouter = express.Router();
const {
  getUser,
  postUser,
  updateUser,
  deleteUser,
  allUser,
} = require("../controller/userController");
const {isAuthorised,protectRoute} = require('../helper');
const { signup, login, forgotpassword, resetpassword, logout } = require('../controller/authController');

//options available to a user
userRouter
  .route('/:id')
  .patch(updateUser)
  .delete(deleteUser)

userRouter
  .route("/login")
  .post(login);

userRouter
  .route("/signup")
  .post(signup);

userRouter
  .route("/forgotpassword")
  .post(forgotpassword);

userRouter
  .route("/resetpassword/:token")
  .post(resetpassword);

userRouter
  .route("/logout")
  .get(logout);

//profile page
userRouter.use(protectRoute)
userRouter
  .route('/profile')
  .get(getUser)

//admin specific function
userRouter.use(isAuthorised(['admin']));
userRouter
         .route("/")
         .get(allUser);


module.exports = userRouter;