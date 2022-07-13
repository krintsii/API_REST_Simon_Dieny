const pokemons = require('../db/mock-pokemon')
const { Pokemon } = require('../db/sequelize')
const pokemon = require('../models/pokemon')
//les operations sur sequelize
const { Op } = require('sequelize')
//jwt middleware 
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.get('/api/pokemons',auth, (req, res) => {
    if (req.query.name) {
      //propriete de parametre de requette 
      const name = req.query.name
      //parenInt est de propriete pour changer le string en nombre
      const limit = parseInt(req.query.limit) || 5
      //exercice
      if (name.length > 2) {
        const message = 'le terme de recherche doit contenir au moins deux caractères'
        return res.status(400).json({message})
      }

      return Pokemon.findAndCountAll({ 
        where: {
        name: { //name est la propiriete de la modele pokemons 
          [Op.like]:`%${name}%` //name est le critère de la recherche
          }
        },
        order: ['name'],
        limit:limit 
      })
      .then(({count, rows}) => {
        const message = `il y a ${count} pokémon qui correspondent au terme de recherche ${name}`
        res.json({message, data: rows })
      })
    } else {
      Pokemon.findAll({order: ['name']})
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        const message = `le liste des pokemons n'a pas pu être recuperer, réessayer dans quelques instance.`
        res.status(500).json({message, data: error})
      })
    }
  })
}