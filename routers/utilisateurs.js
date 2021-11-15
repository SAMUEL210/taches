const express = require('express')
const utilisateurModel = require('../models/utilisateurs')
const { checkToken } = require('../middlewares/token')

var router = express.Router()

router.post('/', async (req, rep)=>{
    try{
        let {body} = req;
        let utilisateur = new utilisateurModel(body)
        await utilisateur.save()
        rep.send({ "ok": utilisateur })
    }catch(e){
        rep.send({"error": e.message})
    }
})

router.get('/:id', async(req, rep)=>{
    try{
        rep.send({ "ok": await utilisateurModel.findOne({ _id:req.params.id}) })
    }catch(e){
        rep.send({ 'error': e.message })
    }
})

router.get('/', async(req, rep)=>{
    try{
        rep.send({ "ok": await utilisateurModel.find({}) })
    }catch(e){
        rep.send({ 'error': e.message})
    }
})

router.delete('/:id', async (req, rep)=>{
    try{
        await utilisateurModel.deleteOne({ _id: req.params.id})
        rep.send({ "ok": "Votre compte et toutes vos taches ont été suprimmés!"})
    }catch(e){
        rep.send({"error": e.message})
    }
})
module.exports = router