const User = require('../models/user')
const bcrypt = require ('bcrypt')

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
    await User.findOne ({
      where : {
        email: req.body.email,
        password: req.body.password,
    }
    
  })
  if (login === nul) {
      console.log('Utilisateur ou mot de passe incorrect')
  } else {
    console.log('Connexion réussie')
  }
}

module.exports = {
  signup, login,
}
