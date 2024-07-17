import React from 'react';
import EventsPage from './events';

const IndexPage = () => {
  console.log('Index page loaded');
  return (
    <div className="container mx-auto p-4">
      <EventsPage />
    </div>
  );
};

export default IndexPage;
