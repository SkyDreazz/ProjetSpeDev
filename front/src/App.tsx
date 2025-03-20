import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Nav } from './components/nav/nav.component.tsx';

export default function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <div className="main-content">
        <div className="pack">
          <h1>Ouvrir un Pack</h1>
          <div className='pack-opening'>
            <div>

            </div>
            <div>
              <h2>Rareté des cartes</h2>
            </div>
          </div>
        </div>
        <div className="locked-cards">

        </div>
      </div>
    </div>
  );
}
