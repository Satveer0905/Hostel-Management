import React from 'react';
import styles from './FeatureCard.module.css';

    
const FeatureCard = ({ title, description, Icon }) => {
  return (
    <div className={styles['feature-card']}>
      
      {/* Icon + Heading together */}
      <div className={styles['icon-title']}>
        {Icon && <Icon className={styles['feature-icon']} />}
        <h3 className={styles['feature-title']}>{title}</h3>
      </div>

      {/* Description */}
      <p>{description}</p>

    </div>
  );
};

export default FeatureCard;
