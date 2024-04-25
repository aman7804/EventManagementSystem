import "../cards/style.css";
import React from 'react';

const BarChart = () => {
  return (
    <>  
      <div className="card h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-4">
            <h2 className="mb-0 text-md">Bookings report</h2>
            <div className="form-group mb-0">
              <label htmlFor="barChartFilter" className="sr-only">Filter revenue</label>
              <select className="custom-select" id="barChartFilter">
                <option disabled>Filter revenue</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option selected>Monthly</option>
                <option>Yearly</option>
              </select>
            </div> 
          </div> 
          <img 
            src={require('C:/Users/WIN10/source/repos/EventManagementSystem/ems.client/src/assets/images/barCHaart.jpg')}
            alt="dashboard"
            className="img-fluid" 
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
        </div>
      </div>
    </>
  );
}

export default BarChart;
