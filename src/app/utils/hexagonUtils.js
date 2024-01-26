import turfHexGrid from '@turf/hex-grid';
import turfCenter from '@turf/center';



export const generateHexagons = (bounds, cellSize, mask) => {
  const hexGrid = turfHexGrid(bounds, cellSize, { units: 'kilometers', mask: mask});
  return hexGrid
}

export const calculateHexagonCenters = hexGrid => {
  const centroids =  hexGrid.features.map(hexagon => turfCenter(hexagon).geometry.coordinates);
  return centroids
};
