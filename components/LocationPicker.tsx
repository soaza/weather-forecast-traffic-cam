import { Loader, SegmentedControl, Select } from "@mantine/core";
import React, { useState } from "react";
import { isMobile } from "../common/hooks";
import { ISelectedLocation } from "../common/interfaces";

export const LocationPicker = (props: { locations: any }) => {
  const { locations } = props;

  const [selectedLocation, setSelectedLocation] = useState<ISelectedLocation>();

  return (
    <>
      <Select
        label="Location"
        style={{ marginTop: 10 }}
        placeholder="Pick Location"
        value={selectedLocation?.value}
        onChange={(e) =>
          setSelectedLocation(
            locations.filter((location: any) => location?.value === e)[0]
          )
        }
        data={
          locations
            ? locations.filter((location: any) => location !== undefined)
            : [{ label: "No location found" }]
        }
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          style={{ marginTop: 30, width: isMobile() ? "100%" : "50%" }}
          src={selectedLocation?.screenshot}
        />
      </div>
    </>
  );
};
