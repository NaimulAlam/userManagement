import React from 'react';
import Sidebar from './Sidebar';
import UserDashboard from './UserDashboard';

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="text-center my-3 py-2">
        <h5 className="display-4 my-2">Wellcome! to your the dashboard</h5>
      </div>
      <div className="row">
        <div className="col-3">
          <Sidebar />
        </div>
        <div className="col-9 text-center">
          <UserDashboard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
