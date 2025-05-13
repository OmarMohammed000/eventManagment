import express from 'express';

import getUsers from '../controllers/users/getUsers.js';
import deleteUser from '../controllers/users/deleteUser.js';
import makeUserAdmin from '../controllers/users/makeUserAdmin.js';
import isAdmin from '../controllers/users/isAdmin.js';

const app = express.Router();
// User routes
app.get('/api/users', isAdmin,getUsers);
app.delete('/api/users/:id', isAdmin, deleteUser);
app.patch('/api/users/:id/make-admin', isAdmin,makeUserAdmin);

export default app;