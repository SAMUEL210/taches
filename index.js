const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const taches = require('./routers/taches')
const utilisateur = require('./routers/utilisateurs')
const login = require('./routers/login')

app = express()

mongoose.Promise = Promise
mongoose.connect(process.env.bd_url, { useNewUrlParser:true, useUnifiedTopology: true })
var bd = mongoose.connection
bd.on('error', console.error.bind('ERREUR CONNECTION'))
bd.once('open', () => { console.log('STATUT BD : ', bd.states[bd._readyState])})

app.use(express.static('./public'))
app.use(express.json())
app.use(cors({ origin: "*" }));
app.use('/api/v1/login', login)
app.use('/api/v1/taches', taches)
app.use('/api/v1/utilisateurs', utilisateur)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Serveur en écoute sur ${PORT}`)
})
