import React, { useState } from 'react';
import "./nav.css";
import User from "../../img/icons/user.png"
import { useLocation, useNavigate } from "react-router";
import { Modal } from './modals/modal.component.tsx';


export function Nav(){

    const [showModal, setShowModal] = useState(false);
    const nav = useNavigate();

    let loc = useLocation();

    console.log(loc);

    const openModal = () => setShowModal(true);

    const closeModal = () => setShowModal(false);

    return (
        <div className='nav'>
            <Modal isOpen={showModal} onClose={closeModal}></Modal>
            <a onClick={() => nav("/")} className='link'>Accueil</a>
            <a href="#" className='link'>Packs</a>
            <a onClick={() => nav("/cards")} className='link'>Mes cartes</a>
            <a href="#" className='link'>Aide</a>
            <a onClick={openModal}>
                <img src={User} alt="" />
            </a>
        </div>
    )
}