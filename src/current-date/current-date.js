import { useCallback, useEffect, useState } from "react";
import dateFormatter from "../helpers/date-formatter.helper";
import "./current-date.css";

function CurrentDate() {
  const [lastUpated, setLastUpdated] = useState(undefined);
  const [processing, setProcessing] = useState(undefined);

  const fetchData = useCallback(async () => {
    const response = await fetch(
      "https://polar-plains-81129.herokuapp.com/current-date/"
    );

    const { updatedAt, processed } = await response.json();

    const updatedAtDate = new Date(updatedAt);
    const processedDate = new Date(processed);

    setLastUpdated(dateFormatter(updatedAtDate));
    setProcessing(dateFormatter(processedDate));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="current-dates-container">
      <span className="completion-date">
        Currently processing requests for {processing}
      </span>
      <br />
      <span className="updated-at">Updated at {lastUpated}</span>
    </div>
  );
}

export default CurrentDate;
