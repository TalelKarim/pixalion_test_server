import User from '../models/user_model.js';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import generateToken from '../Config/generateToken.js';

export const getAllUsers = (req, res, next) => {
  User.find()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err.stack);
    });
};

export const getOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

export const updateUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const userObject = req.file
        ? {
            ...req.body,
            password: hash,
            token: generateToken(req.params._id),
            imageUrl: `${req.protocol}://${req.get('host')}/images/user/${
              req.file.filename
            }`,
          }
        : {
            ...req.body,
            password: hash,
            _id: req.params.id,
            token: generateToken(req.params._id),
          };
      User.updateOne(
        { _id: req.params.id },
        {
          ...userObject,
        }
      )
        .then(() => {
          res.status(200).json({ ...userObject });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

export const Login = (req, res, next) => {
  User.findOne({ mail: req.body.mail })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: 'Paire login/mot de passe incorrecte' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: 'Paire login/mot de passe incorrecte' });
          }
          res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            nickName: user.nickName,
            Birthday: user.Birthday,
            gender: user.gender,
            imageUrl: user.imageUrl,
            mail: user.mail,
            isInstructor: user.isInstructor,
            speciality: user.speciality,
            token: generateToken(user._id),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
export const filterUsers = (req, res) => {
  const filters = req.query;
  const updatedfilters = {
    ...filters,
    isInstructor: Boolean(filters.isInstructor),
  };
  User.find()
    .then((data) => {
      const filteredUsers = data.filter((user) => {
        let isValid = true;
        for (let filter in updatedfilters) {
          isValid = isValid && user[filter] == updatedfilters[filter];
        }
        return isValid;
      });
      res.status(201).json({ filteredUsers });
    })
    .catch((err) => {
      console.log(err.stack);
    });
};

export const Registration = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        ...req.body,
        password: hash,
        imageUrl: `${req.protocol}://${req.get('host')}/images/user/${
          req.file.filename
        }`,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch((error) => console.log(error.response));
    })
    .catch((error) => res.status(500).json({ error }));
};

export const SearchUser = asyncHandler(async (req, res) => {
  const filter = Boolean(req.query.isInstructor);
  const keyword = req.query.search
    ? {
        $or: [
          { firstName: { $regex: req.query.search, $options: 'i' } },
          { lastName: { $regex: req.query.search, $options: 'i' } },
          { nickName: { $regex: req.query.search, $options: 'i' } },
          { mail: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {};
  const users = await User.find(keyword);
  const filteredUsers = users.filter((user) => {
    return user.isInstructor == filter;
  });
  res.send(filteredUsers);
});

export default {
  getAllUsers,
  Registration,
  SearchUser,
  Login,
  filterUsers,
  updateUser,
  getOneUser,
};
