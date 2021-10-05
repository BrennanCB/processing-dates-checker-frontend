import { useCallback, useEffect, useState } from "react";
import "./current-date.css";
import dateFormatter from "../helpers/date-formatter.helper";

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
    console.log("herereer");
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <h2>Current processing info</h2>
      <div>
        Updated at: {lastUpated} <br />
        Currently processing: {processing}
      </div>
    </div>
  );
}

export default CurrentDate;
