import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import RecenterMap from './RecenterMap';

const ForestsOnlyMap = () => {
  const [center, setCenter] = useState([20, 0]); // Default location
  const [forests, setForests] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter([latitude, longitude]);
      },
      (error) => {
        console.error('Geolocation error:', error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    const fetchForests = async () => {
      const query = `[out:json];relation["landuse"="forest"](bbox);out geom;`;
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const forestPolygons = data.elements.map((element) =>
          element.geometry.map((point) => [point.lat, point.lon])
        );
        setForests(forestPolygons);
      } catch (error) {
        console.error('Error fetching forests:', error);
      }
    };

    fetchForests();
  }, []);

  return (
    <div>
    <div className="card-dashboard">
        <h2>Forests</h2>
        <iframe width="950" height="600" frameborder="0" src="https://www.globalforestwatch.org/embed/map/?mainMap=eyJzaG93QW5hbHlzaXMiOnRydWV9&map=eyJjZW50ZXIiOnsibGF0IjoxNi41NDczOTkzMTA4NzIyMiwibG5nIjo3OC41MDU2MjQ2NjAzODU3OX0sInpvb20iOjUuMTI1NjgyNTIzNzI3Njg4LCJkYXRhc2V0cyI6W3siZGF0YXNldCI6InByaW1hcnktZm9yZXN0cyIsIm9wYWNpdHkiOjEsInZpc2liaWxpdHkiOnRydWUsImxheWVycyI6WyJwcmltYXJ5LWZvcmVzdHMtMjAwMSJdfSx7ImRhdGFzZXQiOiJwb2xpdGljYWwtYm91bmRhcmllcyIsImxheWVycyI6WyJkaXNwdXRlZC1wb2xpdGljYWwtYm91bmRhcmllcyIsInBvbGl0aWNhbC1ib3VuZGFyaWVzIl0sIm9wYWNpdHkiOjEsInZpc2liaWxpdHkiOnRydWV9XSwibGFiZWwiOiJkZWZhdWx0In0%3D&mapMenu=eyJtZW51U2VjdGlvbiI6ImRhdGFzZXRzIiwiZGF0YXNldENhdGVnb3J5IjoibGFuZENvdmVyIn0%3D&mapPrompts=eyJzdGVwc0tleSI6ImFuYWx5emVBbkFyZWEiLCJzdGVwc0luZGV4IjowLCJmb3JjZSI6dHJ1ZX0%3D&menu=eyJkYXRhc2V0Q2F0ZWdvcnkiOiJmb3Jlc3RDaGFuZ2UiLCJtZW51U2VjdGlvbiI6ImRhdGFzZXRzIn0%3D"></iframe>
        </div>
        <br/><br/>
    <div className="card-dashboard">
        <h2>Total Tree Cover</h2>
        <iframe width="950" height="600" frameborder="0" src="https://www.globalforestwatch.org/embed/map/?mainMap=eyJzaG93QW5hbHlzaXMiOnRydWV9&map=eyJjZW50ZXIiOnsibGF0IjoxNi42ODI3MjkyNzkwNzc2NzcsImxuZyI6NzguNjAxMTA0MDI3MjkwMX0sInpvb20iOjUuNjczNzQxNDQwNjQ0NTExLCJkYXRhc2V0cyI6W3siZGF0YXNldCI6InRyZWUtY292ZXIiLCJvcGFjaXR5IjoxLCJ2aXNpYmlsaXR5Ijp0cnVlLCJsYXllcnMiOlsidHJlZS1jb3Zlci0yMDAwIl19LHsiZGF0YXNldCI6InBvbGl0aWNhbC1ib3VuZGFyaWVzIiwibGF5ZXJzIjpbImRpc3B1dGVkLXBvbGl0aWNhbC1ib3VuZGFyaWVzIiwicG9saXRpY2FsLWJvdW5kYXJpZXMiXSwib3BhY2l0eSI6MSwidmlzaWJpbGl0eSI6dHJ1ZX1dLCJsYWJlbCI6ImRlZmF1bHQifQ%3D%3D&mapPrompts=eyJzdGVwc0tleSI6ImFuYWx5emVBbkFyZWEiLCJzdGVwc0luZGV4IjowLCJmb3JjZSI6dHJ1ZX0%3D&menu=eyJkYXRhc2V0Q2F0ZWdvcnkiOiJmb3Jlc3RDaGFuZ2UiLCJtZW51U2VjdGlvbiI6ImRhdGFzZXRzIn0%3D"></iframe>
        
    </div>
    </div>
  );
};

export default ForestsOnlyMap;
