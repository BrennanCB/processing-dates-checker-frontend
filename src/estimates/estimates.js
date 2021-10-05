import { useEffect, useState, useCallback } from "react";
import "./estimates.css";
import dateFormatter from "../helpers/date-formatter.helper";

function Estimates() {
  const [skipHistory, setSkipHistory] = useState(true);
  const [date, setDate] = useState("26 July 2021");
  const [estimate, setEstimate] = useState(undefined);

  const fetchData = useCallback(async () => {
    const response = await fetch(
      `https://polar-plains-81129.herokuapp.com/estimated-completion?date=${date}&skipHistory=${skipHistory}`
    );

    const estimate = new Date(await response.text());

    setEstimate(dateFormatter(estimate));
  }, [date, skipHistory]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      Submission date: {dateFormatter(date)} <br />
      Estimated completion date: {estimate}
    </div>
  );
}

export default Estimates;
