const express = require('express')
const utilisateurModel = require('../models/utilisateurs')
const bcrypt = require('bcrypt')
const { createToken }  = require('../middlewares/token')
var router = express.Router()

router.post('/', async (req, rep)=> {
    let utilisateur = await utilisateurModel.findOne({ pseudo: req.body.pseudo })
    if(utilisateur){
        bcrypt.compare(req.body.password, utilisateur.password, function(err, result) {
            if (result == true) {
                const token = createToken(utilisateur);
                rep.header("Authorization", token);
                rep.send({ id: utilisateur._id });
            } else rep.send({ error: "Identifiants incorrectes!"});
        });
    }else rep.send({ error: "Identifiants incorrectes!"})
})

module.exports = router