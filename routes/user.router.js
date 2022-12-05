import express from 'express';
import auth from '../Middlewares/auth.js';
const router = express.Router();

import {
  getAllUsers,
  Registration,
  Login,
  SearchUser,
  filterUsers,
  updateUser,
  getOneUser,
} from '../controllers/user.controller.js';

import Multer from '../Middlewares/multer-config.user.js';

router.get('/user/check', auth, filterUsers);

router.get('/user', auth, getAllUsers);

router.get('/oneuser/:id', auth, getOneUser);

router.post('/user/register', Multer, Registration);

router.put('/user/update/:id', Multer, auth, updateUser);

router.post('/user/login', Multer, Login);

router.get('/user/filter', auth, SearchUser);

export default router;
