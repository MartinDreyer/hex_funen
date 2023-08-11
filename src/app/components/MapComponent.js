
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = process.env.NEXT_PUBLIC_MB_ACCESS_TOKEN; // Replace with your Mapbox access token

const MapComponent = ({ center, zoom, hexagonCenters }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom,
      
    });

    map.on('load', () => {
      // Create a GeoJSON source for the hexagons
      map.addSource('hexagons', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: hexagonCenters.map(center => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: center,
            },
          })),
        },
      });

      // Add a layer to display the hexagons
      map.addLayer({
        id: 'hexagons-layer',
        source: 'hexagons',
        type: 'circle',
        paint: {
          'circle-radius': 5,
          'circle-color': 'blue',
        },
      });
    });


    return () => map.remove();
  }, [center, zoom, hexagonCenters]);

  return <div ref={mapContainer} />;
};

export default MapComponent;
