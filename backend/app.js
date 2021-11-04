const express = require('express')
const path = require('path')

const Sequelize = require('sequelize');
const User = require('./models/user');
const Subject = require('./models/subject')
const Comment = require('./models/comment')

const sequelize = require ('./util/database')

const app = express();

// CORS

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, x-acces-token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// 

app.get('/', (req,res) => res.send('INDEX'))
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'images')))

// Routes

app.use('/api/auth', require('./routes/user'))
app.use('/api/auth', require('./routes/subject'))
app.use('/api/auth', require('./routes/comment'))
app.use('/api/auth', require ('./routes/multimedia'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))

// Test DB

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log(err))

  // Creation table

User.hasMany(Subject)
Subject.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

Subject.hasMany(Comment)
Comment.belongsTo(Subject)

sequelize.sync().then(result => {
  // console.log(result)
}).catch(error => {
  // console.log(error)
})

module.exports = app


