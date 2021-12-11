const express = require('express')
const activerCompteModel = require('../models/activerCompte')

var router = express.Router()

router.get('/:id', async(req, rep) =>{
    try{
        let activationCompte = await activerCompteModel.findOne({ _id: req.params.id})
        rep.send({activationCompte})
    }catch(e){
        rep.send({'error': e.message})
    }
})

router.put('/:id', async(req, rep) =>{
    try{
        let {body} = req
        let modifActivationCompte = activerCompteModel.FindeOneAndUpdate({_id: req.params.id}, body,{
            new: true
        })
        rep.send({modifActivationCompte})
    }catch(e){
        rep.send({'error': e.message})
    }
})

module.exports = router