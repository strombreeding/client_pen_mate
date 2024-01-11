import { useState, useEffect } from "react";
import axios from "axios";
import { countryCodes } from "../configs/countryCode";

const useCountryFromLocation = () => {
  const [country, setCountry] = useState(
    {} as { code: string; name: string; latitude: number; longitude: number }
  );

  useEffect(() => {
    const getCountryFromLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async function (position) {
            const { latitude, longitude } = position.coords;

            // Get country code from location coordinates
            const countryRequest = await axios.get(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const countryCode = countryRequest.data.countryCode;

            // Assuming you have a countryCodes array available with country codes and names
            const filteredCountry = countryCodes.filter(
              (item) => item.code === countryCode
            );
            const result = {
              ...filteredCountry[0],
              latitude,
              longitude,
            };
            setCountry(result);
          });
        } else {
          console.log("Geolocation is not supported.");
        }
      } catch (error) {
        console.error("Error fetching country from location:", error);
      }
    };

    getCountryFromLocation();
  }, []);

  return country;
};

export default useCountryFromLocation;
