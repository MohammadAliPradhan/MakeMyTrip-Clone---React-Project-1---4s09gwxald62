import axios from 'axios';
import React, { useEffect } from 'react';
import { getHeaderWithProjectId } from './components/Authenticaltion/utils/service';

function FlightTest() {

    async function getBusList() {
        try {
            const config = {
                headers: {
                    projectId: getHeaderWithProjectId(),
                }
            };

            const response = await axios.get(
                'http://localhost:8080/api/v1/bookingportals/flights',
                {
                    params: {
                        search: '{"source":"delhi","destination":"Mumbai"}',
                        day: 'Mon',
                    },
                    config,
                }
            );

            console.log(response);
        } catch (error) {
            console.error('Error fetching bus list:', error);
        }
    }

    useEffect(() => {
        getBusList();
    }, []);  // A
    return (
        <div>
            {/* You can render something here if needed */}
        </div>
    );
}

export default FlightTest;
