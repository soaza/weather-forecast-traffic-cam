import { DatePicker, TimeInput } from "@mantine/dates";
import React from "react";

export const InputFields = () => {
  return (
    <>
      <DatePicker placeholder="Pick date" label="Date" withAsterisk />
      <TimeInput placeholder="Pick date" label="Time" withAsterisk />
    </>
  );
};
