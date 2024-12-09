import React from 'react';
import Card from './Card';

const Insights = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sales Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Weekly Sales" content="$15,300" />
        <Card title="New Users" content="240" />
        <Card title="Item Orders" content="1,230" />
        <Card title="Bug Reports" content="23" />
      </div>
    </div>
  );
};

export default Insights;
