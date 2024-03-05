import React from "react";
import '../../styles.scss';

const Footer = () => {
  return (
    <footer className="site-footer ">
      <div className="footer-container ">
        {/* Prima colonna */}
        <div className="footer-column bg-footer-hover">
          <h3>Information</h3>
          <ul>
            <li>About Us</li>
            <li>Terms and Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Seconda colonna */}
        <div className="footer-column bg-footer-hover">
          <h3>Services</h3>
          <ul>
            <li>Order Online</li>
            <li>Partner Restaurants</li>
            <li>Frequently Asked Questions</li>
          </ul>
        </div>

        {/* Terza colonna */}
        <div className="footer-column bg-footer-hover">
          <h3>Contact Us</h3>
          <ul>
            <li>Customer Support</li>
            <li>Feedback</li>
            <li>Assistance</li>
          </ul>
        </div>

        {/* Quarta colonna per la newsletter */}
        <div className="footer-column bg-footer-hover">
          <h3>Subscribe to Newsletter</h3>
          <div className="subscribe-form">
            <input type="email" placeholder="Enter your email" />
            <button className="btn btn-dark">Subscribe</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
