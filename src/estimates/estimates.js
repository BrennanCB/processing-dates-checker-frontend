import { useEffect, useState, useCallback } from "react";
import moment from "moment";
import "./estimates.css";

function Estimates() {
  const [skipHistory, setSkipHistory] = useState(false);
  const [date, setDate] = useState("26 July 2021");
  const [estimate, setEstimate] = useState(undefined);

  const fetchData = useCallback(async () => {
    const response = await fetch(
      `https://polar-plains-81129.herokuapp.com/estimated-completion?date=${date}&skipHistory=${skipHistory}`
    );

    const estimate = new Date(await response.text());

    setEstimate(moment(estimate).format("DD MMMM"));
  }, [date, skipHistory]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <div>i am estimate {estimate}</div>;
}

export default Estimates;
