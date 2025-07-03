import React from 'react';

function MobileContainer({ children }) {
  return (
    <div
      style={{
        maxWidth: 400,
        minHeight: '100vh',
        margin: '0 auto',
        background: '#000000',
        border: '1px solid #e5e7eb',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
}

export default MobileContainer;