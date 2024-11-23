import React, { useState } from 'react'
import Loader from './Loader'

export default function NewsOnlyMaps() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div>
      <div className='card-dashboard'>
        {isLoading && <Loader/>}
      <iframe width="950" height="600" frameborder="0" onLoad={() => setIsLoading(false)} title='news' src="https://www.globalforestwatch.org/embed/map/?map=eyJjZW50ZXIiOnsibGF0IjoxMy4wNTU5NjM1OTQ4MTM0ODgsImxuZyI6NjguMDkxNTk2MTg2MjA4Mzl9LCJ6b29tIjoyLjU0ODA1ODkxNjkxNjk1MiwiZGF0YXNldHMiOlt7ImRhdGFzZXQiOiJmaXJlLWFsZXJ0cy12aWlycyIsIm9wYWNpdHkiOjEsInZpc2liaWxpdHkiOnRydWUsImxheWVycyI6WyJmaXJlLWFsZXJ0cy12aWlycyJdfSx7ImRhdGFzZXQiOiJnbGFkLWRlZm9yZXN0YXRpb24tYWxlcnRzLXYyIiwib3BhY2l0eSI6MSwidmlzaWJpbGl0eSI6dHJ1ZSwibGF5ZXJzIjpbInBsYWNlcy10by13YXRjaC12MiJdfSx7ImRhdGFzZXQiOiJwb2xpdGljYWwtYm91bmRhcmllcyIsImxheWVycyI6WyJkaXNwdXRlZC1wb2xpdGljYWwtYm91bmRhcmllcyIsInBvbGl0aWNhbC1ib3VuZGFyaWVzIl0sIm9wYWNpdHkiOjEsInZpc2liaWxpdHkiOnRydWV9XSwibGFiZWwiOiJkZWZhdWx0In0%3D&mapMenu=eyJzZWFyY2hUeXBlIjoiZGVjaW1hbHMifQ%3D%3D&mapPrompts=eyJvcGVuIjp0cnVlLCJzdGVwc0tleSI6InRvcGljc0Jpb2RpdmVyc2l0eSIsInN0ZXBzSW5kZXgiOjAsImZvcmNlIjp0cnVlfQ%3D%3D&menu=eyJkYXRhc2V0Q2F0ZWdvcnkiOiJmb3Jlc3RDaGFuZ2UiLCJtZW51U2VjdGlvbiI6ImRhdGFzZXRzIn0%3D"></iframe>
      </div>
    </div>
  )
}
