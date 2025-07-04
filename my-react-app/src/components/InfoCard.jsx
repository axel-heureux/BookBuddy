// src/components/InformativeCard.jsx
import React from 'react';
import './InfoCard.css';

function InformativeCard({ title, text }) {
  return (
    <div className="informative-card">
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

export default InformativeCard;
