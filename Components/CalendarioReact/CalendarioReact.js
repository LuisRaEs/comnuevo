import { useState } from "react";
import Calendar from "react-calendar";

function CalendarioReact() {
  const [value, setValue] = useState(new Date());

  return (
    <div>
      <Calendar onChange={setValue} value={value} />
    </div>
  );
}

export default CalendarioReact;
