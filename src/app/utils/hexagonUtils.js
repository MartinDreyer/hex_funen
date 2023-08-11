import turfHexGrid from '@turf/hex-grid';
import turfCenter from '@turf/center';

export const generateHexagons = (bounds, cellSize) => {
  const hexGrid = turfHexGrid(bounds, cellSize, { units: 'kilometers' });
  return hexGrid.features.map(hexagon => hexagon.geometry.coordinates[0]);
};

export const calculateHexagonCenters = hexagons => {
  return hexagons.map(hexagon => turfCenter(hexagon).geometry.coordinates);
};
