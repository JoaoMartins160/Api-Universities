const bcrypt = require('bcrypt')
const User = require('../models/User')


const handleNewUser = async(req,res) => {
    const {name, email, password, confirmpassword} = req.body


    if(!name){
        return res.status(422).json({msg: 'O nome é obrigatorio!'})
    }
    if(!email){
        return res.status(422).json({msg: 'O email é obrigatorio!'})
    }
    if(!password){
        return res.status(422).json({msg: 'A senha é obrigatoria!'})
    }

    if(password !==confirmpassword){
        return res.status(422).json({ msg: 'As senhas não conferem!'})
    }
    const userExists = await User.findOne({ email:email })

    if(userExists){
        return res.status(422).json({msg: 'Por Favor, utilize outro e-mail'})
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        name,
        email,
        password: passwordHash,
    })

    try {
        await user.save(

            res.status(201).json({msg: 'Usuário criado com sucesso!'})
        )
    } catch (error) {
        console.log(error)

        res.status(500).json({msg: 'error'})
    }
}


module.exports = {handleNewUser}