import { faSmog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import '../UserDashboard.css';
import AQI from './AQI';
import Biodiversities from './Biodiversities';
import CitySearchMap from './CitySearch';
import Deforestation from './Deforestation';
import ForestsOnlyMap from './ForestsOnlyMap';
import LakesOnlyMap from './LakesOnlyMap';
import MountainsOnlyMap from './MountainsOnlyMap';
import RiversOnlyMap from './Rivers';
import RoadsOnlyMap from './Roads';


export default function AllMaps() {
  const [currentComponent, setCurrentComponent] = useState(null);

  // Back button to return to the main component
  const handleBack = () => {
    setCurrentComponent(null);
  };

  // Components mapping
  const componentMap = {
    search: <CitySearchMap/> ,
    roads: <RoadsOnlyMap />,
    rivers: <RiversOnlyMap />,
    forest: <ForestsOnlyMap/>,
    lakes: <LakesOnlyMap/>,
    mountains: <MountainsOnlyMap/>,
    biodiversity: <Biodiversities/>,
    aqi: <AQI/>,
    deforestation: <Deforestation/>
  };

  // If a component is selected, render it
  if (currentComponent) {
    return (
      <div className="ag-format-container">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        {componentMap[currentComponent]}
      </div>
    );
  }

  // Default view
  return (
    <div>
      <div className="ag-format-container">
        <div className="ag-courses_box">
          <div className="ag-courses_item">
            <div
              className="ag-courses-item_link"
              onClick={() => setCurrentComponent('search')}
            >
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Search</div>
              <div className="ag-courses-item_date-box">A City you want</div>
            </div>
          </div>

          <div className="ag-courses_item">
            <div
              className="ag-courses-item_link"
              onClick={() => setCurrentComponent('roads')}
            >
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Roads</div>
              <div className="ag-courses-item_date-box">
                Travel forever, Never Stop!🧳
                <span className="ag-courses-item_aqi"></span>
              </div>
            </div>
          </div>

          <div className="ag-courses_item">
            <div
              className="ag-courses-item_link"
              onClick={() => setCurrentComponent('rivers')}
            >
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Rivers</div>
              <div className="ag-courses-item_date-box">Be Hydrated always 😉</div>
            </div>
          </div>

          <div className="ag-courses_item">
            <div
              className="ag-courses-item_link"
              onClick={() => setCurrentComponent('forest')}
            >
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Forests</div>
              <div className="ag-courses-item_date-box">Let the inner you find Peace🌳</div>
            </div>
          </div>

          <div className="ag-courses_item">
            <div
              className="ag-courses-item_link"
              onClick={() => setCurrentComponent('lakes')}
            >
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Lakes</div>
              <div className="ag-courses-item_date-box">Wanna go for Fishing? 🎣</div>
            </div>
          </div>
          <div className="ag-courses_item">
            <div
              className="ag-courses-item_link"
              onClick={() => setCurrentComponent('mountains')}
            >
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Mountains</div>
              <div className="ag-courses-item_date-box">Ready for Hiking Partner?!</div>
            </div>
          </div>
          
          <div className="ag-courses_item">
            <div
              className="ag-courses-item_link"
              onClick={() => setCurrentComponent('biodiversity')}
            >
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Biodiversity</div>
              <div className="ag-courses-item_date-box">Well lots of friends for us 🐾</div>
            </div>
          </div>

          <div className="ag-courses_item">
            <div
              className="ag-courses-item_link"
              onClick={() => setCurrentComponent('aqi')}
            >
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">AQI</div>
              <div className="ag-courses-item_date-box">Uff !! These humans are polluting us <FontAwesomeIcon icon={faSmog}/></div>
            </div>
          </div>

          <div className="ag-courses_item">
            <div
              className="ag-courses-item_link"
              onClick={() => setCurrentComponent('deforestation')}
            >
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Deforestation</div>
              <div className="ag-courses-item_date-box">Evil Humans 😈 vs Poor Trees 🥲</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
