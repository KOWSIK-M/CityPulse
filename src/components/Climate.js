import React, { useState } from 'react'
import Loader from './Loader'

export default function Climate() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div>
      <div className='card-dashboard'>
        {isLoading && <Loader/>}
      <iframe width="950" height="600" title='climate' frameborder="0" onLoad={() => setIsLoading(false)} src="https://www.globalforestwatch.org/embed/map/country/IND/2/5/?mainMap=eyJzaG93QW5hbHlzaXMiOnRydWV9&map=eyJjZW50ZXIiOnsibGF0IjoxNi40MjQ4NDI4OTExNDU2NjYsImxuZyI6ODAuNzgxMTczNzA1MDA4MTZ9LCJ6b29tIjo4LjAyNTcxOTI0MDQyMTU1MiwiYmFzZW1hcCI6eyJ2YWx1ZSI6ImRhcmsifSwiY2FuQm91bmQiOmZhbHNlLCJkYXRhc2V0cyI6W3siZGF0YXNldCI6InBvbGl0aWNhbC1ib3VuZGFyaWVzIiwibGF5ZXJzIjpbImRpc3B1dGVkLXBvbGl0aWNhbC1ib3VuZGFyaWVzIiwicG9saXRpY2FsLWJvdW5kYXJpZXMiXSwib3BhY2l0eSI6MSwidmlzaWJpbGl0eSI6dHJ1ZX0seyJkYXRhc2V0IjoiY2FyYm9uLWRpb3hpZGUtZW1pc3Npb25zLWZyb20tdHJlZS1jb3Zlci1sb3NzIiwibGF5ZXJzIjpbImNhcmJvbi1kaW94aWRlLWVtaXNzaW9ucy1mcm9tLXRyZWUtY292ZXItbG9zcyJdLCJvcGFjaXR5IjoxLCJ2aXNpYmlsaXR5Ijp0cnVlfV0sImxhYmVsIjoibGlnaHRMYWJlbHMifQ%3D%3D&mapMenu=eyJzZWFyY2hUeXBlIjoiZGVjaW1hbHMifQ%3D%3D&mapPrompts=eyJzdGVwc0tleSI6InRvcGljc0NsaW1hdGUiLCJzdGVwc0luZGV4IjowLCJmb3JjZSI6dHJ1ZX0%3D&menu=eyJkYXRhc2V0Q2F0ZWdvcnkiOiJmb3Jlc3RDaGFuZ2UiLCJtZW51U2VjdGlvbiI6ImRhdGFzZXRzIn0%3D"></iframe>
      </div>
    </div>
  )
}
