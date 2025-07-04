import React from 'react';

function MobileContainer({ children }) {
  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        margin: 0,
        background: '#000000',
        border: 'none',
        borderRadius: 16,
        boxShadow: 'none',
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
}

export default MobileContainer;