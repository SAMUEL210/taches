const tacheModel = require('../models/taches')

const getTousLesTaches = async (req, rep)=>{
    try{
        let taches = await tacheModel.find({})
        rep.send({taches})
    }catch(e){
        rep.send({ error: e})
    }
}

const getTache = async (req, rep)=>{
    try{
        let tache = await tacheModel.findOne({ _id: req.params.id})
        rep.send({ tache })
    }catch(e){
        rep.send({ error: e})
    }
}

const getUserTaches = async (req, rep)=>{
    try{
        let taches = await tacheModel.find({ uid: req.params.uid})
        rep.send({ taches })
    }catch(e){
        rep.send({ error: e})
    }
}

const creerTache = async (req, rep)=>{
    try{
        let {body} = req
        let tache = new tacheModel(body)
        await tache.save()
        rep.send({ tache })
    }catch(e){
        rep.send({ error: e})
    }   
}

const modifierTache = async (req, rep)=>{
    try{
        let tache = await tacheModel.findOneAndUpdate({ _id: req.params.id}, req.body, {new: true})
        rep.send({ tache })
    }catch(e){
        rep.send({ error: e })
    }
}

const suprimmerTache = async (req, rep)=>{
    try{
        let tache = await tacheModel.findOneAndDelete({ _id: req.params.id})
        rep.send({tache})
    }catch(e){
        rep.send({ error: e})
    }
}


module.exports = {
    getTousLesTaches,
    getTache,
    getUserTaches,
    creerTache,
    modifierTache,
    suprimmerTache
}