const bcrypt = require('bcrypt')
const User = require('../models/User')
require('dotenv').config()
const jwt = require('jsonwebtoken')


const handleLogin = async (req,res) => {
    const {email, password} = req.body

    if(!email){
        return res.status(422).json({msg: 'O email é obrigatorio!'})
    }
    if(!password){
        return res.status(422).json({msg: 'A senha é obrigatoria!'})
    }

    const user = await User.findOne({email:email})

    if (!user) {
        return res.status(404).json({msg: 'Usuário não encontrado'})
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
        return res.status(422).json({msg: 'Senha inválida!'})
    }

    try {
    const secret = process.env.SECRET
    const token = jwt.sign({
        id: user._id
    }, secret,
    )

    res.status(200).json({msg: 'Autenticação realizada com sucesso', token})

    }  catch (error) {
        console.log(error)

        res.status(500).json({error})
    }
}

module.exports = { handleLogin };