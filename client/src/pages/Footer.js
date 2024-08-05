// src/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="footer-logo">Eco Store</h2>
          <p>Discover sustainable products that are good for the planet.</p>
          <div className="footer-social">
            <a href><i className="fab fa-facebook"></i></a>
            <a href><i className="fab fa-twitter"></i></a>
            <a href><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Shop</h3>
          <ul>
            <li><a href>All Products</a></li>
            <li><a href>Clothing</a></li>
            <li><a href>Accessories</a></li>
            <li><a href>Home Goods</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>About</h3>
          <ul>
            <li><a href>Our Story</a></li>
            <li><a href>Sustainability</a></li>
            <li><a href>Careers</a></li>
            <li><a href>Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Help</h3>
          <ul>
            <li><a href>FAQ</a></li>
            <li><a href>Shipping</a></li>
            <li><a href>Returns</a></li>
            <li><a href>Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Sign up for our newsletter to stay up-to-date on the latest eco-friendly products and promotions.</p>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Eco Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
