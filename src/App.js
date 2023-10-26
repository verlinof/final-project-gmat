import "./App.css";
import GyroChart from "./chart/GyroChart";
import Navbar from "./components/Navbar";
import VoltageChart from "./chart/VoltageChart";

function App() {
  return (
    <>
      <Navbar />
      <div className="w-full flex bg-slate-400">
        <div className="w-1/2 p-3" id="map">
          TES
        </div>
        <div className="w-1/2 flex justify-center p-3" id="chart-gyro">
          <GyroChart />
        </div>
      </div>
      <div className="w-full flex bg-slate-200">
        <div className="w-1/3 p-2" id="chart-voltage">
          <VoltageChart />
        </div>
        <div className="w-1/3 p-2" id="chart-pressure"></div>
        <div className="w-1/3 p-2" id="chart-altitude"></div>
      </div>
    </>
  );
}

export default App;
