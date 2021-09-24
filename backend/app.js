const express = require('express')
const path = require('path')
const Sequelize = require('sequelize')

const sequelize = require ('./util/database')


const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/', (req,res) => res.send('INDEX'))
app.use(express.json())

// Routes

app.use('/api/auth', require('./routes/user'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))

// Test DB

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log(err))

module.exports = app

// Creation table

sequelize.sync().then(result => {
  console.log(result)
}).catch(error => {
  console.log(error)
})
