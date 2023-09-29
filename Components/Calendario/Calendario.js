import { useState } from "react";
import "./Calendario.css";
import "dayjs/locale/es-mx";
import { DatePicker } from "@mantine/dates";

function Calendario({ rangeDate, setRangeDate }) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  // console.log(rangeDate);

  const dateFormat = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedDate = `${day.toString().padStart(2, "0")}-${month
      .toString()
      .padStart(2, "0")}-${year}`;

    return formattedDate;
  };

  const isoDateString1 = rangeDate && rangeDate[0];
  const isoDateString2 = rangeDate && rangeDate[1];

  const date1 = new Date(isoDateString1);
  const date2 = new Date(isoDateString2);

  const we = date1;
  const day1 = date1.getDate();
  const month1 = date1.getMonth() + 1;
  const year1 = date1.getFullYear();
  const time1 = date1.toTimeString().slice(0, 8);

  const day2 = date2.getDate();
  const month2 = date2.getMonth() + 1;
  const year2 = date2.getFullYear();
  const time2 = date2.toTimeString().slice(0, 8);

  // console.log(`Date 1: ${day1}/${month1}/${year1} ${time1}   ${we}`);
  // console.log(`Date 2: ${day2}/${month2}/${year2} ${time2}`);

  return (
    <>
      <DatePicker
        type="range"
        defaultDate={new Date(currentYear, 0)}
        numberOfColumns={12}
        value={rangeDate}
        onChange={setRangeDate}
        locale="es-mx"
        allowSingleDateInRange
      />
    </>
  );
}

export default Calendario;
