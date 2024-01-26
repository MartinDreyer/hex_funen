"use client";
import { useState } from "react";
import MapComponent from "./components/MapComponent";
import {
  generateHexagons,
  calculateHexagonCenters,
} from "./utils/hexagonUtils";
import fyn from "../../public/data/fyn_";

const bounds = [10.18, 55.3];
const hexBounds = [9.65, 54.69, 11.082, 55.654];

const setZoom = 8.3;
const mask = fyn;

const IndexPage = () => {
  const [cellSize, setCellSize] = useState(10);
  const [hexagons, setHexagons] = useState([]);
  const [hexagonCenters, setHexagonCenters] = useState([]);

  const handleInputChange = (e) => {
    setCellSize(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Generate hexagons and calculate centers when the user submits the form
    const newHexagons = generateHexagons(hexBounds, cellSize, mask);
    setHexagons(newHexagons);

    const newHexagonCenters = calculateHexagonCenters(newHexagons);
    setHexagonCenters(newHexagonCenters);
  };

  const downloadHexCenters = () => {
    const hexCentersJson = JSON.stringify(hexagonCenters, null, 2);
    const blob = new Blob([hexCentersJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hexagonCenters.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="flex-col flex justify-center items-center w-screen">
        <div className="p-4 text-center max-w-xs">
          <p className="p-2">Vælg cellestørrelse</p>
          <form onSubmit={handleFormSubmit}>
            <input
              type="number"
              className="shadow"
              value={cellSize}
              onChange={handleInputChange}
            ></input>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
            >
              Bekræft
            </button>
          </form>
        </div>
      </div>
      {hexagonCenters.length > 0 && (
        <div className="flex justify-center">
          <button
            className="bg-blue-500 m-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-10"
            onClick={downloadHexCenters}
          >
            Download Hex Centers
          </button>
        </div>
      )}
      {hexagonCenters.length > 0 && (
        <div className="map-container flex justify-center">
          <MapComponent
            center={bounds}
            zoom={setZoom}
            hexagonCenters={hexagonCenters}
            hexGrid={hexagons}
          ></MapComponent>
        </div>
      )}
    </>
  );
};

export default IndexPage;
