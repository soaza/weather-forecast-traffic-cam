import { DatePicker, TimeInput } from "@mantine/dates";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { DATE_FORMAT, TIME_FORMAT } from "../common/utils";

export const InputFields = (props: {
  setDateTime: (datetime: string) => void;
}) => {
  const { setDateTime } = props;
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const formattedDate = moment(date).format(DATE_FORMAT);
    const formattedTime = moment(time).format(TIME_FORMAT);

    setDateTime(`${formattedDate}T${formattedTime}`);
  }, [date, time]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <DatePicker
        style={{ width: "100%" }}
        placeholder="Pick date"
        label="Date"
        withAsterisk
        value={date}
        onChange={(date: Date) => {
          setDate(date);
        }}
        excludeDate={(date) => date >= new Date()}
      />
      <TimeInput
        style={{ width: "100%" }}
        placeholder="Pick date"
        label="Time"
        withAsterisk
        value={time}
        onChange={(date: Date) => {
          setTime(date);
        }}
      />
    </div>
  );
};
