
//les different types d'un pokemon
const validTypes = ['Plante','Poison','Feu','Eau','Insecte','Vol','Normal','Electrik','Fée']

//cree un modele sequeliza pour sunchroniser le basse de donnée et de créer le table dans un base de donnéé pokedex...........donne le types de table dans me base de donnéés.......... le non de model est le table dans le base de donnéé mais avec s ftsny 
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{msg:'le nom est déjà pris',},
        validate: {
          notEmpty: { msg: 'vous forcement ajouter le nom  du Pokemon '},
          notNull: { msg: 'le nom de pokemon est une propiétes requise.'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Utilisez uniquement de nombres entiers pour le points de vie.'},
          notNull: { msg: 'les poinst de vie sont une propiétes requise.'},
          max: {
            args: [999],
            msg:'le points de vie n\'a pas depasser de 999'
          },
          min: {
            args: [0],
            msg:'le points de vie est forcement superieur ou égale 0'
          }

        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Utilisez uniquement de nombres entiers pour le points de dégâts.'},
          notNull: { msg: 'les poinst de dégâts sont une propiétes requise.'},
          max: {
            args: [99],
            msg:'le points de dégâts n\'a pas depasser de 99'
          },
          min: {
            args: [0],
            msg:'le points de dégâts est forcement superieur ou égale 0'
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: 'Utilisez uniquement l\'url pour le pictures.'},
          notNull: { msg: 'l\'url est une propiétes requise.'}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split(',')
        },
        set(types) {
          this.setDataValue('types', types.join())
        },
        validate: {
          isTypesValid(value) {
            if (!value) {
              throw new Error('Un pokémon doit au moins avoir un type')
            } 
            if (value.split(',').length > 3) {
              throw new Error('Un pokémon ne penx pas avoir plus que 3 types')
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)) {
               throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante ${validTypes}.`)
              }
            }); 
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }