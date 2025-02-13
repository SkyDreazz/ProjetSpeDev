// /models/Metadata.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../database'); // Connexion à la base de données

// Définir le modèle "Metadata"
const Metadata = sequelize.define('Metadata', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false, // Ne peut pas être nul
    },
    data: {
        type: DataTypes.JSON, // Pour stocker des objets JSON
        allowNull: false, // Ne peut pas être nul
    },
}, {
    timestamps: true, // Ajouter les champs "createdAt" et "updatedAt"
});

// Exporter correctement le modèle
module.exports = Metadata;  // Cela permet de récupérer "Metadata" dans d'autres fichiers
