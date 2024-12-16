const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  image: { type: String, default: '' },
  preparationTime: { type: Number, required: true },
  difficulty: { type: String, required: true, enum: ['facile', 'media', 'difficile'] },
  cuisineType: { type: String, required: true },
  tags: { type: [String], default: [] },
  ratings: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, rating: { type: Number, required: true } }],
  averageRating: { type: Number, default: 0 },
  reviews: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, comment: { type: String, required: true }, images: { type: [String], default: [] } }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = Recipe
