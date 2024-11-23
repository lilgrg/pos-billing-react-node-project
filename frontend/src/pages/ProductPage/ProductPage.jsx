import React from 'react';
import styles from './ProductPage.module.scss';

const ProductPage = ({ product }) => {
  return (
    <div className={styles.productPage}>
      <div className={styles.productDetails}>
        <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
        <div className={styles.productInfo}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productDescription}>{product.description}</p>
          <span className={styles.productPrice}>${product.price}</span>
          <button className={styles.addToCartButton}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;