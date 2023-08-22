'use client'
import MapComponent from "./components/MapComponent"
import { generateHexagons, calculateHexagonCenters, getGeoJSONData } from "./utils/hexagonUtils"

const bounds = [10.18, 55.3];
const hexBounds = [9.65, 54.523, 11.282, 56.054]

const cellSize = 1; // Adjust as needed
const setZoom = 8.3


const IndexPage = () => {
  const hexagons = generateHexagons(hexBounds, cellSize, );
  const hexagonCenters = calculateHexagonCenters(hexagons);
  console.log(hexagonCenters.length)

  return (
    <div className="map-container">
      <MapComponent center={bounds} zoom={setZoom} hexagonCenters={hexagonCenters} hexGrid={hexagons}>
      </MapComponent>
    </div>
  );
};

export default IndexPage