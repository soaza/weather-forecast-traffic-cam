import { SegmentedControl } from "@mantine/core";
import React, { useEffect } from "react";
import { getLocationUsingLatLong } from "../common/api";
import { ILocation } from "../common/interfaces";

export const LocationPicker = (props: { locations: ILocation[] }) => {
  const { locations } = props;

  useEffect(() => {
    // https://maps.googleapis.com/maps/api/geocode/json?latlng=44.4647452,7.3553838&key=AIzaSyByQN48s8m41InBkkfPS_7G9Sm5KoNDHi4
    const fetchLocation = async (location: ILocation) => {
      const res = await getLocationUsingLatLong(
        location.latitude,
        location.longitude
      );
      console.log(res.results[0]?.formatted_address);
    };

    locations.map(fetchLocation);
  }, [locations]);

  return <SegmentedControl data={[]} orientation="vertical" />;
};
