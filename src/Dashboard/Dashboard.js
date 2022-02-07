import React from 'react';
import Sidebar from './Sidebar';
import UserDashboard from './UserDashboard';

const Dashboard = () => {
  return (
    <div className='container-fluid'>
      <div className='row my-5'>
        <div className='col-2'>
          <Sidebar/>
        </div>
        <div className='col-10'>
          <UserDashboard/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;