import React from 'react'
import messageIcon from '../../assets/images/icons8-message-20.png';
import "../../components/cards/style.css";

const LatestQueries: React.FC = () => {
  return (
    <>
      <div className="h-100">
        <div className="card d-block h-100">
          <div className="card-body">
            <h2 className="text-md">Latest enquiries</h2>
          </div>
          <h4 className="mb-2 ml-3 text-sm font-weight-bold text-secondary">Recent</h4>
          <ul className="list-unstyled mb-5">
            <li className="d-flex align-items-center justify-content-between py-2 px-3 border-top">
              <div className="mr-auto">
                <span className="d-block">Jason Sandoval</span>
                <span className="text-secondary">jason84@example.com</span>
              </div>
              <img src={messageIcon} alt="msgIcon" className="mr-2 mx-2" aria-hidden="true"/>
            </li>
            <li className="d-flex align-items-center justify-content-between py-2 px-3 border-top">
              <div className="mr-auto">
                <span className="d-block">Andrea Dixon</span>
                <span className="text-secondary">andreadixon@me.com</span>
              </div>
              <img src={messageIcon} alt="msgIcon" className="mr-2 mx-2" aria-hidden="true"/>
            </li>
            <li className="d-flex align-items-center justify-content-between py-2 px-3 border-top">
              <div className="mr-auto">
                <span className="d-block">Christian Fox</span>
                <span className="text-secondary">christian@nike.com</span>
              </div>
              <img src={messageIcon} alt="msgIcon" className="mr-2 mx-2" aria-hidden="true"/>
            </li>
            <li className="d-flex align-items-center justify-content-between py-2 px-3 border-top">
              <div className="mr-auto">
                <span className="d-block">Olivia Johnson</span>
                <span className="text-secondary">olivia-89@example.com</span>
              </div>
              <img src={messageIcon} alt="msgIcon" className="mr-2 mx-2" aria-hidden="true"/>
            </li>
          </ul>

          <h4 className="mb-2 ml-3 text-sm font-weight-bold text-secondary">Previous</h4>
          <ul className="list-unstyled mb-5 mb-lg-0">
            <li className="d-flex align-items-center justify-content-between py-2 px-3 border-top">
              <div className="mr-auto">
                <span className="d-block">David Holland</span>
                <span className="text-secondary">david-96@neole.com</span>
              </div>
              <img src={messageIcon} alt="msgIcon" className="mr-2 mx-2" aria-hidden="true"/>
            </li>
            <li className="d-flex align-items-center justify-content-between py-2 px-3 border-top">
              <div className="mr-auto">
                <span className="d-block">Catherine Ellis</span>
                <span className="text-secondary">cath_92@example.com</span>
              </div>
              <img src={messageIcon} alt="msgIcon" className="mr-2 mx-2" aria-hidden="true"/>
            </li>
          </ul>
        </div> 
      </div>
    </>
  )
}

export default LatestQueries
