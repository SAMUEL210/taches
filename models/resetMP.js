const mongoose = require('mongoose')
const { isEmail } = require('validator')

const resetMpSchema = new mongoose.Schema({
    uid:{
        type: mongoose.Types.ObjectId,
        required: [true, "Il faut un utilisateur"]
    },
    email: {
        type: String,
        validate: [isEmail, "Adresse mail incorecte!"],
        required: true,
        lowercase: true,
        unique: [true, "Cette adresse mail est déja associé à un compte"]
    },
    statut:{
        type: Boolean,
        default: false
    }
})

const resetMpModel = mongoose.model('resetMP', resetMpSchema)

module.exports = resetMpModel