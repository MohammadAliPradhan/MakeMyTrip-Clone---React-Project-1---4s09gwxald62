import { Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Home from "./Home";
import FlightDetails from "./FlightDetails/FlightDetails";
import MmtHeader from "./MmtHeader/MmtHeader";
import NavBar from "./NavBar/NavBar";



function App() {
  return (
  <Routes>
      <Route element={<NavBar />}>
      <Route element={<MmtHeader />}>
      <Route index element={<Home />}/>
      <Route path="/flight" element={<FlightDetails />}/>
      <Route path="/about" element={<h1>This is ali</h1>}/>
      </Route>
      </Route>
  </Routes>
  )
}

export default App;
