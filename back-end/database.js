const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projet_dev', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

const connectBDD = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connexion à la base de données réussie")
    } catch (error) {
        console.error("Impossible de se connecter à la base de données : ", error);
    }
};

module.exports = { sequelize, connectBDD }