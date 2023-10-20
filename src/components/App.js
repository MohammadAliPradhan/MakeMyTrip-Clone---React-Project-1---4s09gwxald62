import { Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Home from "./Home";
import FlightDetails from "./FlightDetails/FlightDetails";
import MmtHeader from "./MmtHeader/MmtHeader";
import NavBar from "./NavBar/NavBar";
import HotelDetails from "./HotelDetails/HotelDetails"
import TrainDetails from "./TrainDetails/TrainDetails"
import Login from "./Authenticaltion/Login/Login.jsx";
import SignUp from "./Authenticaltion/SignUp/SignUp.jsx";

function App() {
  return (
    <Routes>
      <Route element={<Login />}>
      <Route element={<NavBar />}>
        <Route element={<MmtHeader />}>
          <Route index element={<Home />} />
          <Route path="flight" element={<FlightDetails />} />
          <Route path="hotel" element={<HotelDetails />} />
          <Route path="train" element={<TrainDetails />} />
          
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Route>
      </Route>

    </Routes>
  )
}

export default App;
