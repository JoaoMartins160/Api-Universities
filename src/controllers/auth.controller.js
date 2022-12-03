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
    const refreshsecret = process.env.REFRESH_TOKEN_SECRET
0
    const refreshToken = jwt.sign({
        id: user._id
    }, refreshsecret)
    const accessToken = generateAcessToken({user: user._id})

    user.refreshToken = refreshToken;
    const result = await user.save();
    console.log(result);

    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    
    res.status(200).json({msg: 'Autenticação realizada com sucesso',accessToken: accessToken, refreshToken: refreshToken})

    }  catch (error) {
        console.log(error)

        res.status(500).json({error})
    }
}

function generateAcessToken(user){
    const acesssecret = process.env.ACCESS_TOKEN_SECRET 
    return jwt.sign(user, acesssecret,{ expiresIn: '1m'} )
}


module.exports = { handleLogin };