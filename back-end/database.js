const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('projet_dev', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 8889,
});

// Modèles pour chaque table
const Type = sequelize.define('Type', {
    trait_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rarity: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
});

const Background = sequelize.define('Background', {
    trait_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rarity: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
});

const Expression = sequelize.define('Expression', {
    trait_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rarity: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
});

// Répétez pour les autres tables (Hair, Hat, Extra, Glasses, Clothes, Pets, Backpack_Loadout, Face_Accessories)...

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

module.exports = { sequelize, connectBDD, Type, Background, Expression /*, autres modèles... */ };
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/rarity.json', 'utf8'));

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

        // Répétez pour les autres tables (Hair, Hat, Extra, Glasses, Clothes, Pets, Backpack_Loadout, Face_Accessories)...

        console.log("Données insérées avec succès");
    } catch (error) {
        console.error("Erreur lors de l'insertion des données : ", error);
    } finally {
        await sequelize.close();
    }
};

insertData();