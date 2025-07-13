import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Active Tasks</h3>
          <p className="text-3xl font-bold text-primary-600">5</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Completed</h3>
          <p className="text-3xl font-bold text-success-600">23</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Earnings</h3>
          <p className="text-3xl font-bold text-secondary-600">€450</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;