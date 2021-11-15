const express = require('express')
const { getTousLesTaches, getTache, getUserTaches, creerTache, modifierTache, suprimmerTache } = require('../controllers/taches')

var router = express.Router()

router.route('/').get(getTousLesTaches).post(creerTache)
router.route('/:id').get(getTache).patch(modifierTache).delete(suprimmerTache)
router.route('/u/:uid').get(getUserTaches)

module.exports = router