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
import ComingSoon from "./ComingSoon/ComingSoon.jsx";
import TrainSinglePage from "./TrainDetails/TrainSinglePage/TrainSinglePage.jsx";
import TrainDetailsSingle from "./TrainDetails/TrainFinalSinglePage.jsx/TrainDetailsSingle.jsx";
import PaymentTrain from "./TrainDetails/PaymentTrain/PaymentTrain.jsx";
import MemberModal from "./TrainDetails/Testingfun/MemberModal.jsx";
import SecondTesting from "./TrainDetails/Testingfun/SecondTesting.jsx";
import AllOtherRoute from "./AllOtherRoute/AllOtherRoute.jsx";
import AuthNavigator from "./Navigator/AuthNavigator.jsx";
import ProfilePage from "../Profile/ProfilePage.jsx";
import HotelSelectRoomPage from "./HotelSinglePage/HotelRoomPage/HotelSelectRoomPage.jsx";
import MyTrips from "./MyTrips/MyTrips.jsx";




export const ButtonContext = createContext();
export const AuthContext = createContext();
export const LoginButtonContext = createContext();
export const ApiDetails = createContext();
export const ModalForBooking = createContext();
export const ModalForFlightBooking = createContext();
export const trainModalTestContext = createContext();
export const TraceHistory = createContext();
function App() {
  const [modalTrain, setModalTrain] = useState()
  const [test, setTest] = useState(false)
  const [modalA, SetmodalA] = useState();
  const [showHome, setShowHome] = useState()
  const [buttonState, setButtonState] = useState();
  const [loginButton, setLoginButton] = useState();
  const [ApiInfo, setApiInfo] = useState([])
  const [historyy, setHistoryy] = useState();

  let isUserLoggedIn;
  const token = sessionStorage.getItem("userToken");
  if (token) {
    isUserLoggedIn = true;
  } else {
    isUserLoggedIn = false;
  }
  const [isLoggedin, setIsLoggedIn] = useState(isUserLoggedIn)


  return (
    <>
      <TraceHistory.Provider value={{ historyy, setHistoryy }}>
        <trainModalTestContext.Provider value={{ modalTrain, setModalTrain }}>
          <ModalForFlightBooking.Provider value={{ test, setTest }}>
            <ModalForBooking.Provider value={{ modalA, SetmodalA }}>
              <ApiDetails.Provider value={{ ApiInfo, setApiInfo }}>
                <LoginButtonContext.Provider value={{ loginButton, setLoginButton }}>
                  <ButtonContext.Provider value={{ buttonState, setButtonState }}>
                    <AuthContext.Provider value={{ isLoggedin, setIsLoggedIn }} >
                      <Routes>
                        <Route element={<NavBar />}>
                          <Route element={<MmtHeader />}>

                            <Route path="/" element={<FlightDetails />}>
                              <Route index element={<FlightOffer />} />
                            </Route>
                            <Route path="hotel" element={<HotelDetails />}>
                              <Route index element={<FlightOffer />} />
                            </Route>
                            <Route path="train" element={<TrainDetails />} >
                              <Route index element={<FlightOffer />} />

                            </Route>
                            <Route path="/allotherroute" element={< AllOtherRoute />} >
                              <Route index element={<FlightOffer />} />
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
                        <Route path="trainsingle" element={<TrainSinglePage />} />
                        <Route path="traindetail/:trainId" element={<TrainDetailsSingle />} />
                        <Route path="paymenttrain" element={<PaymentTrain />} />
                        <Route path="*" element={<ComingSoon />} />
                        <Route path="somethingnsdf" element={<MemberModal />} />
                        <Route path="secondTesting" element={<SecondTesting />} />
                        <Route path="profilePageA" element={<ProfilePage />} />
                        <Route path="hotelroomselect" element={<AuthNavigator><HotelSelectRoomPage /></AuthNavigator>} />
                        <Route path="mytrips" element={<MyTrips />} />


                      </Routes>






                    </AuthContext.Provider>
                  </ButtonContext.Provider>
                </LoginButtonContext.Provider>
              </ApiDetails.Provider>
            </ModalForBooking.Provider>
          </ModalForFlightBooking.Provider>
        </trainModalTestContext.Provider>
      </TraceHistory.Provider>
    </>
  )
}

export default App;