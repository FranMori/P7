const User = require('../models/user')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
const fs = require('fs')
const config = require("../util/auth.config");

// Authentication
const signup = async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10)
  try {
    const user = await User.create(Object.assign(req.body, {password: hash}))
    return res.status(201).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

const login = async (req, res) => {
    const user = await User.findOne ({
      where : {email: req.body.email}})
  if (user) {
      const password_valid = await bcrypt.compare (req.body.password, user.password)
    if (password_valid) {
      res.status(200).json({
        userId: user.id,
        accesToken: jwt.sign(
          {id: user.id},
          config.secret,
          {expiresIn:'24h'}
        )
      })
    }else {
    res.status(400).json ({error: "Password Incorrect"})
  }} else {
    res.status(400).json({error: "User does not exist"})
  }
}

const logout = async (req,res) => {
  req.session.destroy()
  res.redirect('/')
}

// Profile
const getAllUsers = async (req, res) => {
  User.findAll()
  .then(infos => res.status(200).json(infos))
  .catch(error => res.status(400).json({error}))
}

const getUser = async (req, res) => {
  User.findOne ({
    where : {id: req.params.id}
  })
  .then(user => res.status(200).json(user))
  .catch(error => res.status(400).json({error}))
}

 const modifyUser = async (req,res) => {
   User.findOne({ 
     where: {id: req.params.id}

    })
  .then(function (user) {
    if (user) {
      user.update({
        prenom: req.body.prenom,
        nom: req.body.nom,
        email: req.body.email,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      })
      .then(newUser => res.status(200).json(newUser))
    }
  })
.catch(error => res.status(400).json({error})
)}

const deleteUser = async (req,res) => {
  User.destroy ({
    where : {id: req.params.id}
  })
.then(() => res.status(200).json({message: 'Utilisateur supprimé'}))
.catch(error => res.status(400).json({error}))
}

module.exports = {
  signup, login, logout, getAllUsers, getUser, modifyUser, deleteUser
}
