import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./TrainFinal.css"
import { AuthContext } from '../../App'


function TrainDetailsSingle() {
    const trainId = useParams()

    const { isLoggedin } = useContext(AuthContext)
    console.log("majurna", isLoggedin);

    console.log(trainId);


    const [checkAuthState, setCheckAuthState] = useState(sessionStorage.getItem("userToken"))


    if (checkAuthState) {
        console.log("areee");
    } else {
        console.log("marere");
    }

    return (

        <>
            <div class="parent-train-single-page">
                <div class="trdInfo">
                    <div class="trdDetails makeFlex column">
                        <div class="appendBottom30">
                            <div class="makeFlex end appendBottom5 spaceBetween">
                                <div class=" column appendRight50">
                                    <h3 class="font22 latoBlack appendBottom5">Bkn Duronto Exp</h3>
                                    <p><span class="font12 lightGreyText">#12259<span class="appendLeft10">|</span></span><span
                                        class="font12 appendLeft10"><span class="lightGreyText">Departs on:</span><span
                                            class="lightGreenText"> S</span><span class="lightGreenText"> M</span><span
                                                class="lightGreyText"> T</span><span class="lightGreenText"> W</span><span
                                                    class="lightGreenText"> T</span><span class="lightGreyText"> F</span><span
                                                        class="lightGreyText"> S</span></span></p>
                                </div>
                                <div class="makeFlex hrtlCenter" style={{ marginBottom: '-10px' }}>
                                    <div class="makeFlex column appendRight20" style={{ marginLeft: '5px' }}>
                                        <p class="appendBottom10"><span class="latoBlack">5:00 PM</span><span
                                            class="latoBlack">,
                                        </span><span class="lightGreyText">16 Nov</span></p>
                                        <p class="font12 darkGreyText">Kolkata Sealdah Railway Station (SDAH)</p>
                                    </div><span class="bdrTop"></span>
                                    <div class="makeFlex column appendRight20">
                                        <p class="font12 latoBold appendBottom20">12<span class="lightGreyText"> hrs
                                        </span>30<span class="lightGreyText"> mins</span></p>
                                    </div><span class="bdrTop"></span>
                                    <div class="makeFlex column appendBottom10 appendTop15">
                                        <p class="appendBottom10"><span class="latoBlack">5:30 AM</span><span
                                            class="latoBlack">,
                                        </span><span class="lightGreyText">17 Nov</span></p>
                                        <p class="font12 darkGreyText appendBottom10">Kanpur Central Railway Station (CNB)</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="makeFlex appendBottom50 makeRelative">
                            <div class="makeFlex column appendRight40">
                                <div class="makeFlex column">
                                    <h3 class="latoBold font14 darkGreyText appendBottom10">Availability Status</h3>
                                    <div class="trStatusBlock">
                                        <p class="makeFlex appendBottom5 hrtlCenter"><span
                                            class="latoBlack font16 appendRight20">3A</span><span
                                                class="latoBold font16"><span class="orangeText">GNWL172/WL18</span></span></p>
                                        <p class="font12 lightGreyText appendTop10">moments ago</p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginLeft: '43px' }}>
                                <div role="button" class="selectedQuotaContainer noSelection selectWrap makeRelative">
                                    <p class="labelName appendBottom10 darkGreyText font14 greyed latoBold">Your Boarding
                                        Station
                                    </p>
                                    <p class="selectedQuota cursorPointer latoBold font12 makeFlex"><span> </span><span
                                        class="latoRegular font14 darkGreyText"> SEALDAH (SDAH) - 5:00 PM (16 Nov)
                                    </span><span class="font12 latoRegular appendLeft130 deepskyBlueText">Change</span><span
                                        class="arrow arrow-down-wide"></span></p>
                                    <ul class="quotaBox  makeAbsolute textLeft font14 darkGreyText">
                                        <li class="latoBold makeFlex font16">SEALDAH (SDAH) - 5:00 PM (16 Nov)</li>
                                        <li class="">DHANBAD JN (DHN) - 8:35 PM (16 Nov)</li>
                                        <li class="">DD UPADHYAYA JN (DDU) - 1:35 AM (17 Nov)</li>
                                    </ul>
                                </div>
                                <p class="shiftFiller font12"></p>
                            </div>
                            <div class="btnTosinglePage">
                                <h3>Book Now</h3>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrainDetailsSingle
