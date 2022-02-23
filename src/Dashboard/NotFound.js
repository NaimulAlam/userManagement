import React from 'react';

const NotFound = () => {
  return (
    <div className="text-center my-5 py-5">
      <h2>The link you provided is not available</h2>
      <a className="btn btn-primary my-3" href="/">
        Go back toHome
      </a>
    </div>
  );
};

export default NotFound;
