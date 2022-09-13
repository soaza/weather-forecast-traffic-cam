import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { getLocationUsingLatLong, getTrafficImages } from "../common/api";
import { ICamera, ISelectedLocation } from "../common/interfaces";
import { InputFields } from "../components/InputFields";
import { LocationPicker } from "../components/LocationPicker";
import { isMobile } from "../common/hooks";

const Home: NextPage = () => {
  const [dateTime, setDateTime] = useState("");
  const [formattedLocations, setFormattedLocations] = useState<
    ISelectedLocation[]
  >([]);

  useEffect(() => {
    const fetchTrafficData = async () => {
      const imageData = await getTrafficImages(dateTime);

      const locations = imageData.items[0].cameras.slice(0, 5);

      const fetchLocation = async (camera: ICamera) => {
        const res = await getLocationUsingLatLong(
          camera.location.latitude,
          camera.location.longitude
        );
        console.log(res.results[0]);

        const formattedAddress = res.results[0].formatted_address;

        if (formattedAddress) {
          return {
            value: formattedAddress,
            label: formattedAddress,
            screenshot: camera.image,
          };
        } else {
          return;
        }
      };

      const formattedAddresses: ISelectedLocation[] = (await Promise.all(
        locations.map(fetchLocation)
      )) as ISelectedLocation[];

      setFormattedLocations(formattedAddresses);
    };
    if (dateTime) {
      fetchTrafficData();
    }
  }, [dateTime]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "5% 10%",
      }}
    >
      <h1>Weather Forecast & Traffic Cam</h1>

      <div style={{ width: isMobile() ? "100%" : "60%" }}>
        <div>
          <InputFields setDateTime={setDateTime} />
        </div>

        <LocationPicker locations={formattedLocations} />
      </div>
    </div>
  );
};

export default Home;
