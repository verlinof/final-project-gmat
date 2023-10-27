import "./App.css";
import GyroChart from "./chart/GyroChart";
import Navbar from "./components/Navbar";
import VoltageChart from "./chart/VoltageChart";
import PressureChart from "./chart/PressureChart";
import AltitudeChart from "./chart/AltitudeChart";
import Map from "./maps/Map";

function App() {
  return (
    <>
      <Navbar />
      <div className="h-80 w-full flex flex-wrap bg-slate-400">
        <div className="w-[700px] h-[300px] flex justify-center p-3" id="map">
          <Map />
        </div>
        <div className="w-1/2 flex justify-center p-3" id="chart-gyro">
          <GyroChart />
        </div>
      </div>
      <div className="w-full flex">
        <div className="w-1/3 p-2" id="chart-voltage">
          <VoltageChart />
        </div>
        <div className="w-1/3 p-2" id="chart-pressure">
          <PressureChart />
        </div>
        <div className="w-1/3 p-2" id="chart-altitude">
          <AltitudeChart />
        </div>
      </div>
    </>
  );
}

export default App;
