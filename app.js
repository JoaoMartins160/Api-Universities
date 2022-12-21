require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

const app = express()

app.use(express.json())

const User = require('./src/models/User')

app.use(cookieParser());

app.get("/users/:id", checkToken, async (req,res) => {
    const id = req.params.id

    const user = await User.findById(id, '-password')

    if(!user) {
        return res.status(404).json ({msg: 'Usuário não encontrado!'})
    }

    res.status(200).json ({user})
})

function checkToken (req,res,next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
        return res.status(401).json({msg: 'Usuario não Logado!'})
    }

    try {
        
        const acesssecret = process.env.ACCESS_TOKEN_SECRET
        jwt.verify(token, acesssecret)
        next()

    } catch (error) {
        res.status(400).json ({msg: 'Token inválido!'})
    }
}

app.use('/refresh', require('./src/routes/refresh'));

app.use('/auth/register', require('./src/routes/register'));

app.use('/auth/login', require('./src/routes/auth'));

app.use('/logout', require('./src/routes/logout'));

app.use('/universities', require('./src/routes/api/universities'));

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@web-project.cww0cfx.mongodb.net/?retryWrites=true&w=majority`)
    .then(() =>{
        app.listen(4000)
        console.log('Conectou ao banco!')
    })
    .catch((err) => console.log(err))

