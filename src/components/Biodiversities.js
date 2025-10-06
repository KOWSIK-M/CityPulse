import React, { useState } from 'react'
import Loader from './Loader';

export default function Biodiversities() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className='card-dashboard'>
    {isLoading && <Loader/>}
      <iframe width="950" height="600" frameborder="0" onLoad={() => setIsLoading(false)} src="{process.env.BIODIVERSITY_SRC}"></iframe>
    </div>
  )
}
