import { Navigate, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Home from "./Home";
import FlightDetails from "./FlightDetails/FlightDetails";
import MmtHeader from "./MmtHeader/MmtHeader";
import NavBar from "./NavBar/NavBar";
import HotelDetails from "./HotelDetails/HotelDetails"
import TrainDetails from "./TrainDetails/TrainDetails"
import Login from "./Authenticaltion/Login/Login.jsx";
import SignUp from "./Authenticaltion/SignUp/SignUp";
import Footer from "./Footer/Footer"
import HotelOffer from "./HotelDetails/HotelDetails/HotelOffer";
import FlightOffer from "./FlightDetails/FlightOfferDetails/FlightOffer";
import TrainOffer from "./TrainDetails/TrainOffer/TrainOffer"
import Profile from "./Authenticaltion/Profile/Profile";
import { createContext, useState } from "react";
import AuthNavigator from "./Navigator/AuthNavigator";


export const AuthContext = createContext();
function App() {
  const [showHome, setShowHome] = useState(false)

  let loggedInState;
  const user = sessionStorage.getItem('loggedInuser')

  if (user) {
    loggedInState = true;
  } else {
    loggedInState = false;
  }



  const [isLoggedin, setIsLoggedIn] = useState(loggedInState)



  console.log(isLoggedin);

  return (
    <>
      <AuthContext.Provider value={{ isLoggedin, setIsLoggedIn }} >
        <Routes>
          <Route element={<NavBar />}>
            <Route element={<MmtHeader />}>
              <Route index element={<Home />} />
              <Route path="flight" element={<FlightDetails />}>
                <Route index element={<FlightOffer />} />
              </Route>
              <Route path="hotel" element={<HotelDetails />}>
                <Route index element={<HotelOffer />} />
              </Route>
              <Route path="train" element={<TrainDetails />} >
                <Route index element={<TrainOffer />} />
              </Route>
            </Route>
          </Route>
          <Route path="/profile" element={isLoggedin ? <Profile /> : <Navigate to={"/login"} />} />


        </Routes>
        <Footer />
      </AuthContext.Provider>
    </>
  )
}

export default App;
