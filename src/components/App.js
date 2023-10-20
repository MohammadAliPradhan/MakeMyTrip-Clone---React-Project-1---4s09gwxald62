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
import Footer from "./Footer/Footer"
import HotelOffer from "./HotelDetails/HotelDetails/HotelOffer";
import FlightOffer from "./FlightDetails/FlightOfferDetails/FlightOffer";
import TrainOffer from "./TrainDetails/TrainOffer/TrainOffer"
function App() {
  return (
    <>
    <Routes>
      <Route element={<Login />}>
      <Route element={<NavBar />}>
        <Route element={<MmtHeader />}>
          <Route index element={<Home />} />
          <Route path="flight" element={<FlightDetails />}>
            <Route index element={<FlightOffer />}/>
          </Route>
          <Route path="hotel" element={<HotelDetails />}>
            <Route index element={<HotelOffer />}/>
            </Route>
          <Route path="train" element={<TrainDetails />} >
            <Route index element={<TrainOffer/>}/>
            </Route>
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Route>
      </Route>
    </Routes>
    <Footer />
    </>
  )
}

export default App;
