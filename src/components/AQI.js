import React, { useState } from 'react'
import Loader from './Loader';

export default function AQI() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div>
      <div className='card-dashboard'>
        <h2>Air Quality Index</h2>
        {isLoading && <Loader/>}
      <iframe width="950" height="600" title='aqi' frameborder="0" onLoad={() => setIsLoading(false)} src="https://www.globalforestwatch.org/embed/map/?map=eyJjZW50ZXIiOnsibGF0IjoxNi40MzQ0MjQ0NTIzMDIxNiwibG5nIjo3OS42MjI5MjE0OTk3MjgwNX0sInpvb20iOjYuMTQ2MjczODU3NTcxMjY5LCJkYXRhc2V0cyI6W3siZGF0YXNldCI6ImFpci1xdWFsaXR5Iiwib3BhY2l0eSI6MSwidmlzaWJpbGl0eSI6dHJ1ZSwibGF5ZXJzIjpbImFpci1xdWFsaXR5Il19LHsiZGF0YXNldCI6InJpdmVyLWJhc2lucyIsImxheWVycyI6WyJyaXZlci1iYXNpbi1ib3VuZGFyaWVzIl0sIm9wYWNpdHkiOjEsInZpc2liaWxpdHkiOnRydWV9XSwibGFiZWwiOiJkZWZhdWx0In0%3D&mapMenu=eyJzZWFyY2hUeXBlIjoiZGVjaW1hbHMifQ%3D%3D&mapPrompts=eyJzdGVwc0tleSI6InRvcGljc1dhdGVyIiwic3RlcHNJbmRleCI6MCwiZm9yY2UiOnRydWV9&menu=eyJkYXRhc2V0Q2F0ZWdvcnkiOiJmb3Jlc3RDaGFuZ2UiLCJtZW51U2VjdGlvbiI6ImRhdGFzZXRzIn0%3D"></iframe>  
    </div>
    </div>
  )
}
