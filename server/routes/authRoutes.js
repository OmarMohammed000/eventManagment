import isAuth from "../controllers/users/isAuth.js";
import express from "express";
import login from "../controllers/users/login.js";
import register from "../controllers/users/register.js";
import logout from "../controllers/users/logout.js";
import refreshToken from "../controllers/users/refreshToken.js";

const app = express.Router();
// login route
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.post('/api/auth/logout', isAuth, logout);
app.post('/api/auth/refresh-token', refreshToken);

export default app;