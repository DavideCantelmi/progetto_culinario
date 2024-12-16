const Recipe = require('./recipe.model.js')

const createRecipe = async (req, res) => {
  const { title, ingredients, instructions, preparationTime, difficulty, cuisineType, tags } = req.body
  const recipe = new Recipe({
    title,
    ingredients,
    instructions,
    preparationTime,
    difficulty,
    cuisineType,
    tags,
    creator: req.user.id
  })
  const savedRecipe = await recipe.save()
  res.status(201).json(savedRecipe)
}

const getRecipes = async (req, res) => {
  const { cuisineType, tags, preparationTime } = req.query
  const query = {}
  if (cuisineType) query.cuisineType = cuisineType
  if (tags) query.tags = { $in: tags.split(',') }
  if (preparationTime) query.preparationTime = { $lte: Number(preparationTime) }
  const recipes = await Recipe.find(query).populate('creator', 'nickname')
  res.json(recipes)
}

const getRecipeById = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id).populate('creator', 'nickname')
  if (recipe) {
    res.json(recipe)
  } else {
    res.status(404).json({ message: 'Recipe not found' })
  }
}

const updateRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)
  if (recipe && recipe.creator.toString() === req.user.id) {
    recipe.title = req.body.title || recipe.title
    recipe.ingredients = req.body.ingredients || recipe.ingredients
    recipe.instructions = req.body.instructions || recipe.instructions
    recipe.preparationTime = req.body.preparationTime || recipe.preparationTime
    recipe.difficulty = req.body.difficulty || recipe.difficulty
    recipe.cuisineType = req.body.cuisineType || recipe.cuisineType
    recipe.tags = req.body.tags || recipe.tags
    const updatedRecipe = await recipe.save()
    res.json(updatedRecipe)
  } else {
    res.status(404).json({ message: 'Recipe not found or not authorized' })
  }
}

const deleteRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)
  if (recipe && recipe.creator.toString() === req.user.id) {
    await recipe.deleteOne()
    res.json({ message: 'Recipe deleted successfully' })
  } else {
    res.status(404).json({ message: 'Recipe not found or not authorized' })
  }
}

module.exports = { createRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe }
