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
  
  // Établir la relation one-to-many
  RarityModel.hasMany(MetadataModel);
  MetadataModel.belongsTo(RarityModel);

insertData();