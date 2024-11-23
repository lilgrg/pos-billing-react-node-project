import React from 'react';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <header className={styles.header}>
        <h1>Welcome to Our Store</h1>
        <p>Your one-stop solution for all your shopping needs.</p>
      </header>
      
      <section className={styles.features}>
        <div className={styles.feature}>
          <h2>Quality Products</h2>
          <p>We offer the best quality products in the market.</p>
        </div>
        <div className={styles.feature}>
          <h2>Fast Delivery</h2>
          <p>Get your orders delivered at lightning speed.</p>
        </div>
        <div className={styles.feature}>
          <h2>Customer Support</h2>
          <p>Our support team is here to assist you 24/7.</p>
        </div>
      </section>
      
      <footer className={styles.footer}>
        <p>&copy; 2024 Our Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;