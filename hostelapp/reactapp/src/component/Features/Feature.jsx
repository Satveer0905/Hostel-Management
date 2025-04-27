import React, { useState } from 'react';
import FeatureCard from './FeaturesCard.jsx';
import styles from './Feature.module.css';

// Import icons
import { FaWifi, FaLock, FaBolt, FaWater, FaTshirt, FaUtensils, FaCoffee, FaUsers, FaGamepad, FaDumbbell, FaBook, FaInfoCircle, FaBicycle, FaExchangeAlt,FaBuilding, FaBed } from 'react-icons/fa';

const features = [
  { title: "Free High-Speed Wi-Fi", description: "Stay connected with reliable, high-speed internet throughout the hostel premises.", Icon: FaWifi },
  { title: "24/7 Security", description: "Ensuring your safety with round-the-clock security personnel and surveillance systems.", Icon: FaLock },
  { title: "Power Backup", description: "Uninterrupted power supply with backup systems to keep you comfortable at all times.", Icon: FaBolt },
  { title: "24/7 Water Supply", description: "Continuous water availability for all your daily needs.", Icon: FaWater },
  { title: "Laundry Facilities", description: "On-site laundry services with washing machines and dryers for your convenience.", Icon: FaTshirt },
  { title: "Common Kitchen", description: "Shared kitchen equipped with cooking essentials for your culinary needs.", Icon: FaUtensils },
  { title: "Cafeteria", description: "In-house cafeteria offering a variety of meals and snacks at affordable prices.", Icon: FaCoffee },
  { title: "Common Room", description: "A communal space to relax, socialize, and engage with fellow residents.", Icon: FaUsers },
  { title: "Secure Lockers", description: "Personal lockers available in rooms to keep your valuables safe and secure.", Icon: FaLock },
  { title: "Recreational Lounge", description: "Entertainment area with pool tables, gaming consoles, and more for leisure activities.", Icon: FaGamepad },
  { title: "Fitness Center", description: "On-site gym equipped with modern fitness equipment to keep you active and healthy.", Icon: FaDumbbell },
  { title: "Study Room", description: "Quiet and comfortable study areas to help you focus on your academics.", Icon: FaBook },
  { title: "Information Desk", description: "Assistance with local information, travel plans, and hostel services.", Icon: FaInfoCircle },
  { title: "Guest Reception Area", description: "Designated area to welcome and meet your guests without disturbing other residents.", Icon: FaBuilding },
  { title: "Cycle Stand", description: "Secure and covered bicycle parking facility for eco-friendly commuting.", Icon: FaBicycle },
  { title: "Book Exchange", description: "A collection of books available for exchange to encourage reading and sharing.", Icon: FaExchangeAlt },
  { title: "Multiple Room Options", description: "Variety of room choices including dormitories and private rooms to suit your preferences.", Icon: FaBed },
];

const Feature = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter the features based on the search term
  const filteredFeatures = features.filter((feature) =>
    feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className={styles['feature-section']}>
      <h2>Hostel Amenities</h2>

      {/* Search Input */}
      <div style={{ margin: '20px auto', maxWidth: '400px' }}>
        <input
          type="text"
          placeholder="Search amenities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 15px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />
      </div>

      {/* Feature Cards */}
      <div className={styles['feature-list']}>
        {filteredFeatures.length > 0 ? (
          filteredFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              Icon={feature.Icon}
            />
          ))
        ) : (
          <p style={{ marginTop: '20px', fontSize: '1.1rem', color: '#666' }}>
            No matching amenities found.
          </p>
        )}
      </div>
    </section>
  );
};

export default Feature;
