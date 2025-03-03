import axios from 'axios';

export const getLocationDetails = async (lat, lng) => {
    try {
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
            params: {
                key: process.env.OPENCAGE_API_KEY,
                q: `${lat},${lng}`,
                language: "en"
            }
        });
        const data = response.data.results[0].components;
        return {
            country: data.country,
            city: data.city || data.town || data.village,
            postalCode: data.postcode,
        };
    } catch (error) {
        console.error("Error fetching location data:", error);
        return { country: "", city: "", postalCode: "" };
    }
};