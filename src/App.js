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
      <div className="h-screen w-full bg-slate-400">
        <div className="pb-5 w-full flex flex-wrap justify-center">
          <div className="w-[700px] h-[300px] flex justify-center p-3" id="map">
            <Map />
          </div>
          <div
            className="w-1/2 flex h-[300px] justify-center p-3"
            id="chart-gyro"
          >
            <GyroChart />
          </div>
        </div>
        <div className="w-full flex py-2 flex-wrap justify-center bg-slate-400">
          <div className="w-1/3 px-2 flex justify-center" id="chart-voltage">
            <VoltageChart />
          </div>
          <div className="w-1/3 px-2 flex justify-center" id="chart-pressure">
            <PressureChart />
          </div>
          <div className="w-1/3 px-2 flex justify-center" id="chart-altitude">
            <AltitudeChart />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
