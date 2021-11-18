const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vous devez ajouter un nom'],
    trim: true,
    maxlength: [50, 'Le nom ne pas etre plus de 50 caractère'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  uid: {
    type: mongoose.Types.ObjectId,
    required: [true, "Il faut l'id de l'utilisateur"]
  }
})

module.exports = mongoose.model('Tache', TaskSchema)