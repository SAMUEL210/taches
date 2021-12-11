const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')
const tacheModel = require('../models/taches')
const activerCompteModel = require('../models/activerCompte')

const utilisateurSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: [true, "Vous devez avoir un pseudo"],
        trim: true,
        lowercase: true,
        maxlenght: [20, "Votre pseudo doit fait max de 20 caractère"],
        //unique: [true, "Le pseudo existe déja!"]
    },
    email: {
        type: String,
        //validate: [isEmail, "Adresse mail incorecte!"],
        required: true,
        lowercase: true,
        //unique: [true, "Cette adresse mail est déja associé à un compte"]
    },
    password: {
        type: String,
        required: true
    }
})

utilisateurSchema.pre('save', async function(next){
    let utillisateur = await utilisateurModel.findOne({ pseudo: this.pseudo})
    let utilisateuremail = await utilisateurModel.findOne({ email: this.email})

    if(isEmail(this.email) === false) next(Error("L'adresse mail est incorrecte!"))
    if(utillisateur) next(Error('Le pseudo est déja utilisé!'))
    if(utilisateuremail) next(Error("L'adresse mail est déja associé a un compte!"))
    
    let salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

utilisateurSchema.post('save', async function(next){
    let body = {
            uid: this._id,
            email: this.email,
            pseudo: this.pseudo
        }
    let creerActivationCompte = new activerCompteModel(body)
    await creerActivationCompte.save()
})


utilisateurSchema.pre('deleteOne', async function(next){
    await tacheModel.deleteMany({ uid: this.id })
    next()
})

var utilisateurModel = mongoose.model('utilisateur', utilisateurSchema)
module.exports  = utilisateurModel