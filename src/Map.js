import React, { useRef, useEffect, useState } from 'react';
import Menu from './Menu';
import mapboxgl, { Marker } from 'mapbox-gl';
import FindWaypoints from './GenerateRoute';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import './Map.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYW5kcmVhczAxMiIsImEiOiJja21wa3A4YWExMjQ3Mm5wZWNxN3RtbzRnIn0.oLuhVijVndKzAWMUmwhVNg';

const Map = () => {
  const mapContainerRef = useRef(null);
  const [zoom, setZoom] = useState(12);
  const [waypoints, setWaypoints] = useState([]);
  const [update, setUpdate] = useState(false);

  const findCoordinates = async () => {
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve(position);
        },
        error => console.error(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    });
  };

  const GenerateWaypoints = () => {
    const newWaypoints = FindWaypoints(localStorage.getItem('lat'), localStorage.getItem('lng'), localStorage.getItem('distance'));
    waypoints[0] = newWaypoints.LatLng2;
    waypoints[1] = newWaypoints.LatLng3;
    setWaypoints([...waypoints]);
  }

  const Update = () => {
    setUpdate(!update);
  };

  // Initialize map when component mounts
  useEffect(() => {

    async function initMap() {
      const result = await findCoordinates();

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [result.coords.longitude, result.coords.latitude],
        zoom: zoom,
      });
      localStorage.setItem('lat', result.coords.latitude);
      localStorage.setItem('lng', result.coords.longitude);
      var markerElement = document.createElement('div');
      markerElement.className = 'marker';
      // eslint-disable-next-line
      const marker = new Marker(markerElement)
        .setLngLat([result.coords.longitude, result.coords.latitude])
        .addTo(map);

      var directions = window.directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        profile: 'mapbox/walking',
        unit: 'metric'
      });

      // Add navigation control (the +/- zoom buttons)
      map.addControl(
        new mapboxgl.NavigationControl(), 'top-right');
      map.addControl(directions, 'top-left');
      map.on('click');
      map.on('ondrag');
      map.on('load', async function () {

        const existingRoute = directions.getWaypoints();

        if (existingRoute.length > 0) {
          directions.removeRoutes();
        }

        directions.setOrigin([result.coords.longitude, result.coords.latitude]);
        directions.setDestination([result.coords.longitude, result.coords.latitude]);
        for (var i = 0; i < waypoints.length; i++) {
          directions.addWaypoint(i, [waypoints[i][1], waypoints[i][0]]);
        }
      })
      // Clean up on unmount
      return () => map.remove();

    };

    initMap();

  }, [update]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className='map-container' ref={mapContainerRef} />
      <Menu GenerateWaypoints={GenerateWaypoints} Update={Update} />
    </div>
  );
};

export default Map;
