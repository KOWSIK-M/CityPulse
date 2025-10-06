import React, { useState } from "react";
import Loader from "./Loader";

export default function AQI() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div>
      <div className="card-dashboard">
        <h2>Air Quality Index</h2>
        {isLoading && <Loader />}
        <iframe
          width="950"
          height="600"
          title="aqi"
          frameborder="0"
          onLoad={() => setIsLoading(false)}
          src="{process.env.AQI_SRC}"
        ></iframe>
      </div>
    </div>
  );
}
