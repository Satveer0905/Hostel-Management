import React from 'react';
import styles from './Feature.module.css'; // Correct CSS module import

const features = [
  {
    title: "Free High-Speed Wi-Fi",
    description: "Stay connected with reliable, high-speed internet throughout the hostel premises.",
  },
  {
    title: "24/7 Security",
    description: "Ensuring your safety with round-the-clock security personnel and surveillance systems.",
  },
  {
    title: "Secure Lockers",
    description: "Personal lockers available in rooms to keep your valuables safe and secure.",
  },
  {
    title: "Power Backup",
    description: "Uninterrupted power supply with backup systems to keep you comfortable at all times.",
  },
  {
    title: "24/7 Water Supply",
    description: "Continuous water availability for all your daily needs.",
  },
  {
    title: "Laundry Facilities",
    description: "On-site laundry services with washing machines and dryers for your convenience.",
  },
  {
    title: "Common Kitchen",
    description: "Shared kitchen equipped with cooking essentials for your culinary needs.",
  },
  {
    title: "Cafeteria",
    description: "In-house cafeteria offering a variety of meals and snacks at affordable prices.",
  },
  {
    title: "Common Room",
    description: "A communal space to relax, socialize, and engage with fellow residents.",
  },
  {
    title: "Recreational Lounge",
    description: "Entertainment area with pool tables, gaming consoles, and more for leisure activities.",
  },
  {
    title: "Fitness Center",
    description: "On-site gym equipped with modern fitness equipment to keep you active and healthy.",
  },
  {
    title: "Study Room",
    description: "Quiet and comfortable study areas to help you focus on your academics.",
  },
  {
    title: "Information Desk",
    description: "Assistance with local information, travel plans, and hostel services.",
  },
  {
    title: "Guest Reception Area",
    description: "Designated area to welcome and meet your guests without disturbing other residents.",
  },
  {
    title: "Cycle Stand",
    description: "Secure and covered bicycle parking facility for eco-friendly commuting.",
  },
  {
    title: "Book Exchange",
    description: "A collection of books available for exchange to encourage reading and sharing.",
  },
  {
    title: "Multiple Room Options",
    description: "Variety of room choices including dormitories and private rooms to suit your preferences.",
  },
];

const Feature = () => {
  return (
    <section className={styles['feature-section']}>
      <h2>Hostel Amenities</h2>
      <div className={styles['feature-list']}>
        {features.map((feature, index) => (
          <div className={styles['feature-card']} key={index}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
