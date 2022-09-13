import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { getTrafficImages } from "../common/api";
import { ILocation } from "../common/interfaces";
import { InputFields } from "../components/InputFields";
import { LocationPicker } from "../components/LocationPicker";

const Home: NextPage = () => {
  const [locations, setLocations] = useState<ILocation[]>([]);

  useEffect(() => {
    const fetchTrafficData = async () => {
      const res = await getTrafficImages();
      setLocations(res.items[0].cameras.map((camera: any) => camera.location));
    };
    fetchTrafficData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "5% 10%",
        gap: 20,
      }}
    >
      <div
        style={{
          width: "70%",
          display: "flex",
          flexDirection: "row",
          gap: 30,
        }}
      >
        <InputFields />
      </div>
      <LocationPicker locations={locations} />
    </div>
  );
};

export default Home;
