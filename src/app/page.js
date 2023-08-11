'use client'
import MapComponent from "./components/MapComponent"
import { generateHexagons, calculateHexagonCenters } from "./utils/hexagonUtils"

const bounds = [10.18, 55.3]; // Funen bounds (lng/lat)
const cellSize = 10; // Adjust as needed
const setZoom = 8.3

const IndexPage = () => {
  const hexagons = generateHexagons(bounds, cellSize);
  const hexagonCenters = calculateHexagonCenters(hexagons);

  return (
    <div className="map-container">
      <MapComponent center={bounds} zoom={setZoom} hexagonCenters={hexagonCenters}>
      </MapComponent>
    </div>
  );
};

export default IndexPage