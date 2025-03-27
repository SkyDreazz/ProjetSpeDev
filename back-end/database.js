const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('projet_dev', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 8889,
});


const connectBDD = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connexion à la base de données réussie");

        // Synchronisation des modèles avec la base de données
        await sequelize.sync({ force: true }); // `force: true` efface et recrée les tables à chaque démarrage
        console.log("Tables synchronisées");
    } catch (error) {
        console.error("Impossible de se connecter à la base de données : ", error);
    }
};

module.exports = { sequelize, connectBDD, Type, Background, Expression,Hair,Hat,Extra,Glasses,Clothes,Pets,BackpackLoadout,FaceAccessories};
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./data/rarity.json', 'utf8'));
const metadataData = JSON.parse(fs.readFileSync('./data/metadatas.json', 'utf8'));


console.log('data:', data);
console.log('BackpackLoadout:', data.BackpackLoadout);


const insertData = async () => {
    try {
        await connectBDD();

        // Insertion des données dans la table Type
        for (const item of data.Type) {
            await Type.create({
                trait_type: item.trait_type,
                rarity: item.rarity,
            });
        }

        // Insertion des données dans la table Background
        for (const item of data.Background) {
            await Background.create({
                trait_type: item.trait_type,
                rarity: item.rarity,
            });
        }

        // Insertion des données dans la table Expression
        for (const item of data.Expression) {
            await Expression.create({
                trait_type: item.trait_type,
                rarity: item.rarity,
            });
        }

        // Insertion des données dans la table Hair
        for (const item of data.Hair) {
            await Hair.create({
                trait_type: item.trait_type,
                rarity: item.rarity,
            });
        }

        // Insertion des données dans la table Hat
        for (const item of data.Hat) {
            await Hat.create({
                trait_type: item.trait_type,
                rarity: item.rarity,
            });
        }

        // Insertion des données dans la table Extra
        for (const item of data.Extra) {
            await Extra.create({
                trait_type: item.trait_type,
                rarity: item.rarity,
            });
        }

        // Insertion des données dans la table Glasses
        for (const item of data.Glasses) {
            await Glasses.create({
                trait_type: item.trait_type,
                rarity: item.rarity,
            });
        }

        // Insertion des données dans la table Clothes
        for (const item of data.Clothes) {
            await Clothes.create({
                trait_type: item.trait_type,
                rarity: item.rarity,
            });
        }

        // Insertion des données dans la table Pets
        for (const item of data.Pets) {
            await Pets.create({
                trait_type: item.trait_type,
                rarity: item.rarity,
            });
        }

        try {
            if (Array.isArray(data.BackpackLoadout)) {
              for (const item of data.BackpackLoadout) {
                await BackpackLoadout.create({
                  trait_type: item.trait_type,
                  rarity: parseFloat(item.rarity),
                });
                
              }
            }
          } catch (error) {
            console.error("erreur", error);
          }
        
        
        
        if (Array.isArray(data.FaceAccessories)) {
            for (const item of data.FaceAccessories) {
                await FaceAccessories.create({
                    trait_type: item.trait_type,
                    rarity: parseFloat(item.rarity),
                });
            }
        } else {
            console.error('data.FaceAccessories n\'est pas un tableau ou est manquant. Valeur:', data.FaceAccessories);
        }
        

        console.log("Données insérées avec succès");
    } catch (error) {
        console.error("Erreur lors de l'insertion des données : ", error);
    } finally {
        await sequelize.close();
    }
};

// Définir le modèle principal (le "one" dans la relation one-to-many)
const RarityModel = sequelize.define('Rarity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Autres champs de rarity.json
  });
  
  // Définir le modèle secondaire (le "many" dans la relation one-to-many)
  const MetadataModel = sequelize.define('Metadata', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.JSON,
      allowNull: false
    },
    // rarityId sera automatiquement ajouté par Sequelize
  });
  
  // Établir la relation one-to-many
  RarityModel.hasMany(MetadataModel);
  MetadataModel.belongsTo(RarityModel);

insertData();Ú