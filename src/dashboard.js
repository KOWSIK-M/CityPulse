import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

function Dashboard() {

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic3RydWRhbCIsImEiOiJja2U2d2wyd2IxaDd1MnJ1bDdpc3d5czhjIn0.CK_h23BOqoBtGYEqW1tuhQ';
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [-122.619991, 45.536023], // starting position [lng, lat]
            zoom: 10.5 // starting zoom
        });

        map.on('load', () => {
            map.addSource('portland', {
                'type': 'raster',
                'url': 'https://shadowmap.s3.amazonaws.com/SHADE-GE-22JUN-10am/22JUNE-10AM+-Model-1.tif'
            });

            map.addLayer({
                'id': 'portland',
                'source': 'portland',
                'type': 'raster'
            });
        });

        // Cleanup map when the component unmounts
        return () => map.remove();
    }, []);

    return (
        <div>
            <div className="pos-f-t">
                <div className="collapse" id="navbarToggleExternalContent">
                    <div className="bg-dark p-4">
                        <h4 className="text-white">Collapsed content</h4>
                        <span className="text-muted">Toggleable via the navbar brand.</span>
                    </div>
                </div>
                <nav className="navbar navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </nav>
            </div>
            
            <div id="map" style={{ width: '100%', height: '500px' }}></div>
        </div>
    );
}

export default Dashboard;
