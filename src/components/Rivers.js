import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import RecenterMap from './RecenterMap';

const RiversOnlyMap = () => {
  const [center, setCenter] = useState([20, 0]); // Default location
  const [rivers, setRivers] = useState([]);

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
    const fetchRivers = async () => {
      // Fetch only rivers (waterway="river")
      const query = `[out:json];way["waterway"="river"](bbox);out geom;`;
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const riverPolylines = data.elements.map(element => element.geometry.map(point => [point.lat, point.lon]));
        setRivers(riverPolylines);
      } catch (error) {
        console.error('Error fetching rivers:', error);
      }
    };

    fetchRivers();
  }, []);

  return (
    <div>
    <div className="card-dashboard">
        <h2>Simple Rivers View</h2>
        <iframe width="950" height="600" frameborder="0" src="https://www.globalforestwatch.org/embed/map/?mainMap=eyJzaG93QW5hbHlzaXMiOnRydWV9&map=eyJjZW50ZXIiOnsibGF0IjoxNi4zNTQ3NTE5NzQyNDQxMSwibG5nIjo3OS4yNTkxODU0MTY3NDAwNX0sInpvb20iOjYuNTAxMDM2NjAzNDc3MDkxNCwiZGF0YXNldHMiOlt7ImRhdGFzZXQiOiJwb2xpdGljYWwtYm91bmRhcmllcyIsImxheWVycyI6WyJkaXNwdXRlZC1wb2xpdGljYWwtYm91bmRhcmllcyIsInBvbGl0aWNhbC1ib3VuZGFyaWVzIl0sIm9wYWNpdHkiOjEsInZpc2liaWxpdHkiOnRydWV9XSwibGFiZWwiOiJkZWZhdWx0In0%3D&mapMenu=eyJkYXRhc2V0Q2F0ZWdvcnkiOiJiaW9kaXZlcnNpdHkiLCJzZWFyY2hUeXBlIjoiZGVjaW1hbHMifQ%3D%3D&mapPrompts=eyJzdGVwc0tleSI6ImFuYWx5emVBbkFyZWEiLCJzdGVwc0luZGV4IjowLCJmb3JjZSI6dHJ1ZX0%3D&menu=eyJkYXRhc2V0Q2F0ZWdvcnkiOiJmb3Jlc3RDaGFuZ2UiLCJtZW51U2VjdGlvbiI6ImRhdGFzZXRzIn0%3D"></iframe>
    </div>
    <br/><br/>
    <div className="card-dashboard">
    <h2>River Basin Density</h2>
    <iframe width="950" height="600" frameborder="0" src="https://www.globalforestwatch.org/embed/map/?mainMap=eyJzaG93QW5hbHlzaXMiOnRydWV9&map=eyJjZW50ZXIiOnsibGF0IjoxNi43NDgwNTA2NzAyMDc5NiwibG5nIjo4MC41MzM5NTg0NjA1NDE2OH0sInpvb20iOjUuODI1OTk1OTQzNTYxMzA0NSwiZGF0YXNldHMiOlt7ImRhdGFzZXQiOiJyaXZlci1iYXNpbnMiLCJsYXllcnMiOlsicml2ZXItYmFzaW4tYm91bmRhcmllcyJdLCJvcGFjaXR5IjoxLCJ2aXNpYmlsaXR5Ijp0cnVlfSx7ImRhdGFzZXQiOiJ0cmVlLWNvdmVyLWdhaW4iLCJsYXllcnMiOlsidHJlZS1jb3Zlci1nYWluLTIwMDEtMjAyMCJdLCJvcGFjaXR5IjoxLCJ2aXNpYmlsaXR5Ijp0cnVlfSx7ImRhdGFzZXQiOiJ0cmVlLWNvdmVyLWxvc3MiLCJsYXllcnMiOlsidHJlZS1jb3Zlci1sb3NzIl0sIm9wYWNpdHkiOjEsInZpc2liaWxpdHkiOnRydWV9LHsiZGF0YXNldCI6InRyZWUtY292ZXIiLCJsYXllcnMiOlsidHJlZS1jb3Zlci0yMDEwIl0sIm9wYWNpdHkiOjEsInZpc2liaWxpdHkiOnRydWV9XSwibGFiZWwiOiJkZWZhdWx0In0%3D&mapMenu=eyJzZWFyY2hUeXBlIjoiZGVjaW1hbHMifQ%3D%3D&mapPrompts=eyJzdGVwc0tleSI6InRvcGljc1dhdGVyIiwic3RlcHNJbmRleCI6MCwiZm9yY2UiOnRydWV9&menu=eyJkYXRhc2V0Q2F0ZWdvcnkiOiJmb3Jlc3RDaGFuZ2UiLCJtZW51U2VjdGlvbiI6ImRhdGFzZXRzIn0%3D"></iframe>
    </div>
    </div>
  );
};

export default RiversOnlyMap;
