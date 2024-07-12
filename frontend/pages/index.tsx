// frontend/pages/index.tsx

import React from 'react';
import EventsPage from './events';

const IndexPage = () => {
  console.log('Index page loaded');
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to My App</h1>
      <EventsPage />
    </div>
  );
};

export default IndexPage;
