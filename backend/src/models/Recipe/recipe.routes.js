const express = require('express')
const router = express.Router()
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
} = require('./recipe.controller')
const { protect } = require('../../middlewares/authMiddleware')

router.post('/', protect, createRecipe)
router.get('/', getRecipes)
router.get('/:id', getRecipeById)
router.put('/:id', protect, updateRecipe)
router.delete('/:id', protect, deleteRecipe)

module.exports = router
