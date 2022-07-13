//importation 
//express
const express = require('express');
//le middleware morgan
// const morgan = require('morgan')
//le favi con 
const favicon = require('serve-favicon')
//le middleware body-parser
const bodyParser = require('body-parser')
//le sequelize 
const sequelize = require('./src/db/sequelize')


const app = express()
const port = process.env.PORT || 3000


app.get('/', (req, res) => {
    res.json('hello Heroku!!!!!!!!')
})


//middleware morgan 
app
    .use(favicon(__dirname + '/favicon.ico'))
    // .use(morgan('dev'))
    .use(bodyParser.json())


sequelize.initDb()


//ici, nous placerons nos futures points de terminaisons.
require('./src/Routes/findAllPokemons')(app)
require('./src/Routes/findPokemonByPk')(app)
require('./src/Routes/createPokemon')(app)
require('./src/Routes/updatePokemon')(app)
require('./src/Routes/deletePokemon')(app)
require('./src/Routes/login')(app)

//on ajoute le gestion d'erreure 404
app.use(({res}) => {
    const message = 'impossible de trouver la ressource demandée; trouver un autre URL.'
    res.status(404).json({message})
})

//le serveur dans de port 
app.listen(port, ()=> {
    console.log(`notre application Node est demarrée sur: http://localhost:${port}`);
})








// //le sequelize et le dataTypes pour le base de donnéés....le ORM sequelize
// const {Sequelize, DataTypes} = require('sequelize')
// // le helper.js pour le reponse en format JSON 
// const {success, getUniqueId} = require('./helper.js')
// // le donnée des pokemons en format d'objet  en JS 
// let pokemons = require('./src/db/mock-pokemon');
// // le model sequelize dans un base de données
// const pokemonModel = require('./src/models/pokemon')





// 

// //middleware logger
// app.use((req, res, next) => {
//     console.log(`URL : ${req.url}`)
//     next()
// });



//connecter le base de données
// const sequelize = new Sequelize(
//     'pokedex',
//     'root',
//     '123456',
//     {
//         host: 'localhost',
//         dialect: 'mariadb',
//         dialectOptions: {
//             timezone: 'Etc/GMT-2'
//         },
//         logging: false
//     }
// )
// //l'authentification de node à la base de données
// sequelize.authenticate()
//     .then(_=> console.log('la connexion à a base de données a été bien établie'))
//     .catch(error => console.error(`impossible de se connecter à la bases de données ${error }`))


// //authentificate le model sequelize a base de donnée mysql
// const Pokemon = pokemonModel(sequelize, DataTypes)

// sequelize.sync({force: true})
//     .then(_ => {
//         console.log('la base de données "pokedex" a été bien synchronisée.')



//         pokemons.map(pokemon => {
//             Pokemon.create({
//                 name: pokemon.name,
//                 hp: pokemon.hp,
//                 cp: pokemon.cp,
//                 picture: pokemon.picture,
//                 types: pokemon.types.join()  
//             }).then(pokemon => console.log(pokemon.toJSON()))
//         })
//     })





// app.get('/', (req,res) => {
//     res.send('hello ...serveur')
// })

// // // on utilise la liste de pokemons dans notre point de terminaison :
// // app.get('/api/pokemons/:id',(req,res)=>{
// //     const id= parseInt(req.params.id);
// //     const pokemon = pokemons.find(pokemon => pokemon.id === id)
// //     res.send(`vous avez demandé le pokemon ${pokemon.name}`)
// // })

// app.get('/api/pokemons/:id',(req,res)=>{
//     const id= parseInt(req.params.id);
//     const pokemon = pokemons.find(pokemon => pokemon.id === id)
//     const message = 'Un pokemon a bien été trouvé.'
//     res.json(success(message, pokemon))
// })

// //recuperer les 12 pokemon
// app.get('/api/pokemons',(req,res)=>{
//     const message = 'La liste de pokemon a été bien recupérée.'
//     res.json(success(message, pokemons))
// })


// //pour ajouter des nouveau pokemon dans un id unique 
// app.post('/api/pokemons', (req, res) =>{
//     const id = getUniqueId(pokemons);
//     const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
//     pokemons.push(pokemonCreated)
//     const message = `le pokemon ${pokemonCreated.name} a été bien crée.`
//     res.json(success(message, pokemonCreated))
// })

// //pour modidier un api 
// app.put('/api/pokemons/:id',  (req, res)=>{
//     const id = parseInt(req.params.id)
//     const pokemonUpdated = { ...req.body, id:id }
//     pokemons = pokemons.map(pokemon => {
//         return pokemon.id === id ? pokemonUpdated : pokemon
//     })
//     const message = `le pokemon ${pokemonUpdated.name} a été bien modifier.`
//     res.json(success(message, pokemonUpdated))
// })


// //pour effacer les donnees
// app.delete('/api/pokemons/:id', (req, res) => {
//   const id = parseInt(req.params.id)
//   const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
//   pokemons = pokemons.filter(pokemon => pokemon.id !== id)
//   const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
//   res.json(success(message, pokemonDeleted))
// });





// //le nouveau point de terminaison ,affichent  le nombre total de pokémons :
// app.get('/api/pokemons', (req, res)=> {
//     res.send(`Il y a ${pokemons.length} pokemons dan s le pokedex pour le moment.`)
// })



