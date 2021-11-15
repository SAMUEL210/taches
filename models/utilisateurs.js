const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')
const tacheModel = require('../models/taches')

const utilisateurSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: [true, "Vous devez avoir un pseudo"],
        trim: true,
        maxlenght: [20, "Votre pseudo doit fait max de 20 caractère"],
        unique: [true, "Le pseudo existe déja!"]
    },
    email: {
        type: String,
        validate: [isEmail, "Adresse mail incorecte!"],
        required: true,
        lowercase: true,
        unique: [true, "Cette adresse mail est déja associé à un compte"]
    },
    password: {
        type: String,
        required: true
    }
})

utilisateurSchema.pre('save', async function(next){
    let salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

utilisateurSchema.pre('deleteOne', async function(next){
    await tacheModel.deleteMany({ uid: this.id })
    next()
})

module.exports  = mongoose.model('utilisateur', utilisateurSchema)