import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js'; // Connexion à la base de données

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

// Exportation par défaut
export default Metadata;