require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

app.post('/auth/register', async(req,res) => {
    const {name, email, password, confirmpassword} = req.body


    if(!name){
        return res.status(422).json({msg: 'o nome é obrigatorio!'})
    }
})





const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@web-project.cww0cfx.mongodb.net/?retryWrites=true&w=majority`)
    .then(() =>{
        app.listen(4000)
        console.log('Conectou ao banco!')
    })
    .catch((err) => console.log(err))

