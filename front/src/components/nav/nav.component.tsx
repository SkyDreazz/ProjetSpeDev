import React, { useState } from 'react';
import "./nav.css";
import User from "../../img/icons/user.png"
import { useLocation, useNavigate } from "react-router";


export function Nav(){

    const [isRegistered, setIsRegistered] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({username: '', email: ''});
    const nav = useNavigate();

    let loc = useLocation();

    console.log(loc)

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

    return (
        <div className='nav'>
            <a onClick={() => nav("/")} className='link'>Accueil</a>
            <a href="#" className='link'>Packs</a>
            <a onClick={() => nav("/cards")} className='link'>Mes cartes</a>
            <a href="#" className='link'>Aide</a>
            <a onClick={handleButtonClick}>
                <img src={User} alt="" />
            </a>
            {showForm && !isRegistered && (
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
                <button type="submit">S'inscrire</button>
                </form>
            )}
        </div>
    )
}