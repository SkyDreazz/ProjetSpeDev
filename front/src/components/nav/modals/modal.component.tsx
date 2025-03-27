import React, { useState } from 'react';
import './modal.css'; // Assurez-vous d'avoir un fichier CSS pour la modale
import { useNavigate } from 'react-router';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {

    const [isRegistered, setIsRegistered] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({username: '', email: ''});

    const nav = useNavigate()
        
    const handleFormSubmit = (e) => {
        e.prevendDefault();
        console.log(formData);
        setIsRegistered(true);
        setShowForm(false);
        nav("/user");
    };

    const handleButtonClick = () => {
        if (isRegistered) {
            nav("/user");
        } else {
            setShowForm(true);
        }
    }
  // Ne rien rendre si la modale n'est pas ouverte
  if (!isOpen) return null;

  // Fermer la modale en cliquant à l'extérieur
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
      <form onSubmit={handleFormSubmit}>
            <div>
                <label>
                Username:
                <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                </label>
            </div>
            <div>
                <label>
                    Email:
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </label>
            </div>
            <button type="submit" onClick={handleButtonClick}>S'inscrire</button>
            </form>
      </div>
    </div>
  );
};
