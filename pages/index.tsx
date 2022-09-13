import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { getLocationUsingLatLong, getTrafficImages } from "../common/api";
import { ICamera, ISelectedLocation } from "../common/interfaces";
import { InputFields } from "../components/InputFields";
import { LocationPicker } from "../components/LocationPicker";
import { isMobile } from "../common/hooks";
import { WeatherForecast } from "../components/WeatherForecast";

const Home: NextPage = () => {
  const [dateTime, setDateTime] = useState("");
  const [formattedLocations, setFormattedLocations] = useState<
    ISelectedLocation[]
  >([]);

  useEffect(() => {
    const fetchLocation = async (camera: ICamera) => {
      const res = await getLocationUsingLatLong(
        camera.location.latitude,
        camera.location.longitude
      );

      const formattedAddress = res.results[0]?.formatted_address;

      if (formattedAddress) {
        return {
          value: formattedAddress,
          label: formattedAddress,
          screenshot: camera.image,
        };
      }
    };

    const fetchTrafficData = async () => {
      const imageData = await getTrafficImages(dateTime);

      const locations = imageData.items[0].cameras;

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
        padding: "5% 10%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile() ? "column" : "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: isMobile() ? "100%" : "60%" }}>
          <h1>Traffic Cam</h1>

          <div>
            <InputFields setDateTime={setDateTime} />
          </div>

          <LocationPicker locations={formattedLocations} />
        </div>

        <div style={{ width: isMobile() ? "100%" : "30%" }}>
          <WeatherForecast dateTime={dateTime} />
        </div>
      </div>
    </div>
  );
};

export default Home;
