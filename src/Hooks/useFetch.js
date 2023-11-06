// import React, { useEffect, useState } from 'react'

// function useFetch(url) {
//     const [data, setData] = useState([])
//     const [loading, setLoading] = useState([])
//     const [error, setError] = useState([])

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true)
//             try {
//                 const res = await axios.get(url)
//                 setData(res.data);
//             } catch (err) {
//                 setError(err)
//             }
//             setLoading(false);
//         }
//         fetchData();

//     }, [url])
// }

// export default useFetch
