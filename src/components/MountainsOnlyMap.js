import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import Loader from './Loader';

const MountainsOnlyMap = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="card-dashboard">
    <h2>Mountains</h2>
        {isLoading && <Loader/>}
    <iframe width="950" height="600" title='Mountains' frameborder="0" onLoad={() => setIsLoading(false)} src="https://www.globalforestwatch.org/embed/map/?map=eyJjZW50ZXIiOnsibGF0IjoxNi40ODk2ODg3NzQyNTkzOSwibG5nIjo4MC42MzAyMzk2NjA4NTkzNX0sInpvb20iOjExLjIyMTc0NDYxNzk0ODEyLCJkYXRhc2V0cyI6W3siZGF0YXNldCI6InJpdmVyLWJhc2lucyIsImxheWVycyI6WyJyaXZlci1iYXNpbi1ib3VuZGFyaWVzIl0sIm9wYWNpdHkiOjEsInZpc2liaWxpdHkiOnRydWV9XSwibGFiZWwiOiJkZWZhdWx0In0%3D&mapMenu=eyJkYXRhc2V0Q2F0ZWdvcnkiOiJiaW9kaXZlcnNpdHkiLCJzZWFyY2hUeXBlIjoiZGVjaW1hbHMifQ%3D%3D&mapPrompts=eyJzdGVwc0tleSI6InRvcGljc1dhdGVyIiwic3RlcHNJbmRleCI6MCwiZm9yY2UiOnRydWV9&menu=eyJkYXRhc2V0Q2F0ZWdvcnkiOiJmb3Jlc3RDaGFuZ2UiLCJtZW51U2VjdGlvbiI6ImRhdGFzZXRzIn0%3D"></iframe>
    </div>
  );
};

export default MountainsOnlyMap;
