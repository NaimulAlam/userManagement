import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import UserDashboard from './UserDashboard';

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div>
        <Navbar />
      </div>
      <div className="text-center my-3 py-2">
        <h5 className="display-3 ">Wellcome to User Dashboard</h5>
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
