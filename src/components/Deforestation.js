import React, { useState } from 'react'
import Loader from './Loader';

export default function Deforestation() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div>
      <div className='card-dashboard'>
        <h2>Deforestation & Places to Watch</h2>
        {isLoading && <Loader/>}
      <iframe width="950" height="600" title='deforestation' frameborder="0" onLoad={() => setIsLoading(false)} src="https://www.globalforestwatch.org/embed/map/?map=eyJjZW50ZXIiOnsibGF0IjoxOS43NDEzOTA4MzIzNTQwOTIsImxuZyI6NjEuNDU4NTk5OTk2NTkzNTU2fSwiem9vbSI6My4wMDA4NjMwOTYxMzAyNiwiZGF0YXNldHMiOlt7ImRhdGFzZXQiOiJnbGFkLWRlZm9yZXN0YXRpb24tYWxlcnRzLXYyIiwib3BhY2l0eSI6MSwidmlzaWJpbGl0eSI6dHJ1ZSwibGF5ZXJzIjpbInBsYWNlcy10by13YXRjaC12MiJdfSx7ImRhdGFzZXQiOiJpbnRlZ3JhdGVkLWRlZm9yZXN0YXRpb24tYWxlcnRzLThiaXQiLCJvcGFjaXR5IjoxLCJ2aXNpYmlsaXR5Ijp0cnVlLCJsYXllcnMiOlsiaW50ZWdyYXRlZC1kZWZvcmVzdGF0aW9uLWFsZXJ0cy04Yml0Il19LHsiZGF0YXNldCI6InJpdmVyLWJhc2lucyIsImxheWVycyI6WyJyaXZlci1iYXNpbi1ib3VuZGFyaWVzIl0sIm9wYWNpdHkiOjEsInZpc2liaWxpdHkiOnRydWV9XSwibGFiZWwiOiJkZWZhdWx0In0%3D&mapMenu=eyJzZWFyY2hUeXBlIjoiZGVjaW1hbHMifQ%3D%3D&mapPrompts=eyJzdGVwc0tleSI6InRvcGljc1dhdGVyIiwic3RlcHNJbmRleCI6MCwiZm9yY2UiOnRydWV9&menu=eyJkYXRhc2V0Q2F0ZWdvcnkiOiJmb3Jlc3RDaGFuZ2UiLCJtZW51U2VjdGlvbiI6ImRhdGFzZXRzIn0%3D"></iframe>
      </div>
    </div>
  )
}
