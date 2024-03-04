import React from "react";
import '../../styles.css';

const Footer = () => {
    return (
        <footer className="site-footer mt-5">
          <div className="footer-container">
            {/* Prima colonna */}
            <div className="footer-column">
              <h3>Informazioni</h3>
              <ul>
                <li>Chi siamo</li>
                <li>Termini e condizioni</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
    
            {/* Seconda colonna */}
            <div className="footer-column">
              <h3>Servizi</h3>
              <ul>
                <li>Ordina Online</li>
                <li>Ristoranti Partner</li>
                <li>Domande frequenti</li>
              </ul>
            </div>
    
            {/* Terza colonna */}
            <div className="footer-column">
              <h3>Contattaci</h3>
              <ul>
                <li>Supporto Clienti</li>
                <li>Feedback</li>
                <li>Assistenza</li>
              </ul>
            </div>
    
            {/* Quarta colonna per la newsletter */}
            <div className="footer-column">
              <h3>Iscriviti alla Newsletter</h3>
              <div className="subscribe-form">
                <input type="email" placeholder="Inserisci la tua email" />
                <button>Iscriviti</button>
              </div>
            </div>
          </div>
        </footer>
      );
    };

export default Footer;
