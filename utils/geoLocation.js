// import axios from 'axios';

// export const getLocationDetails = async (lat, lng) => {
//     try {
//         const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
//             params: {
//                 key: process.env.OPENCAGE_API_KEY,
//                 q: `${lat},${lng}`,
//                 language: "en"
//             }
//         });
//         const data = response.data.results[0].components;
//         return {
//             country: data.country,
//             city: data.city || data.town || data.village,
//             postalCode: data.postcode,
//         };
//     } catch (error) {
//         console.error("Error fetching location data:", error);
//         return { country: "", city: "", postalCode: "" };
//     }
// };

import axios from "axios";

export const getLocationDetails = async (lat, lng) => {
    try {
        const response = await axios.get(`https://geocode.maps.co/reverse`, {
            params: {
                lat,
                lon: lng,
                api_key: process.env.GEOCODE_MAPS_API_KEY // Securely store API key in env
            }
        });

        const data = response.data.address;
        console.log(response,"data")
        return {
            country: data.country || "",
            city: data.city || data.state_district || data.village || "",
            postalCode: data.postcode || "",
        };
    } catch (error) {
        console.error("Error fetching location data:", error);
        return { country: "", city: "", postalCode: "" };
    }
};
