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
import HoleSinglePage from "./HotelSinglePage/HoleSinglePage.jsx";
import Somet from "./somet.jsx";
import ListPage from "./ListPage/ListPage.jsx";
import JustShow from "../JustShow.jsx";
import FormData from "../FormData.jsx";
import FlightTest from "../FlightTest.jsx";
import ModalYes from "./ModalYes.jsx";
import FLightSinglePage from "./FlightDetails/FlightSinglePage/FLightSinglePage.jsx";
import FlightSingleInfoPage from "./FlightSingleInfoPage.jsx";
import PaymentAndBookin from "./FlightDetails/PaymentAndBookin.jsx";
import PaymentConfirmationModal from "./FlightDetails/PaymentConfimation/PaymentConfirmationModal.jsx";



export const ButtonContext = createContext();
export const AuthContext = createContext();
export const LoginButtonContext = createContext();
export const ApiDetails = createContext();
export const ModalForBooking = createContext();
function App() {
  const [modalA, SetmodalA] = useState();
  const [showHome, setShowHome] = useState()
  const [buttonState, setButtonState] = useState();
  const [loginButton, setLoginButton] = useState();
  const [ApiInfo, setApiInfo] = useState([])

  let isUserLoggedIn;
  const token = sessionStorage.getItem("userToken");
  if (token) {
    isUserLoggedIn = true;
  } else {
    isUserLoggedIn = false;
  }
  const [isLoggedin, setIsLoggedIn] = useState(isUserLoggedIn)

  console.log(isLoggedin);

  return (
    <>
      <ModalForBooking.Provider value={{ modalA, SetmodalA }}>
        <ApiDetails.Provider value={{ ApiInfo, setApiInfo }}>
          <LoginButtonContext.Provider value={{ loginButton, setLoginButton }}>
            <ButtonContext.Provider value={{ buttonState, setButtonState }}>
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
                  <Route path="/profile" element={<Profile />} />

                  <Route path="/login" element={<Login />} />
                  <Route path="/list" element={<ListPage />} />
                  <Route path="/justshow" element={<JustShow />} />
                  <Route path="hotels/:singleId" element={<HoleSinglePage />} />
                  <Route path="/formdata" element={<FormData />} />
                  <Route path="/getflight" element={<FlightTest />} />
                  <Route path="flightsingle" element={<FLightSinglePage />} />
                  <Route path="flightSingle/:flightId" element={<FlightSingleInfoPage />} />
                  <Route path="payment" element={<PaymentAndBookin />} />
                  <Route path="paymentconfimation" element={<PaymentConfirmationModal />} />
                </Routes>



              </AuthContext.Provider>
            </ButtonContext.Provider>
          </LoginButtonContext.Provider>
        </ApiDetails.Provider>
      </ModalForBooking.Provider>
    </>
  )
}

export default App;