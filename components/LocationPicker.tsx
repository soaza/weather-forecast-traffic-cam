import { SegmentedControl, Select } from "@mantine/core";
import React, { useState } from "react";
import { ISelectedLocation } from "../common/interfaces";

export const LocationPicker = (props: { locations: any }) => {
  const { locations } = props;

  const [selectedLocation, setSelectedLocation] = useState<ISelectedLocation>();

  return (
    <>
      <Select
        style={{ marginTop: 10 }}
        placeholder="Pick Location"
        value={selectedLocation?.value}
        onChange={(e) =>
          setSelectedLocation(
            locations.filter((location: any) => location.value === e)[0]
          )
        }
        data={locations ? locations : [{ label: "No location found" }]}
      />

      <img src={selectedLocation?.screenshot} />
    </>
  );
};
