import React from 'react'
import { useParams } from 'react-router-dom'

function TrainDetailsSingle() {
    const trainId = useParams()
    console.log(trainId);

    return (

        <div>
            working on it
        </div>
    )
}

export default TrainDetailsSingle
