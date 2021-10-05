import { useCallback, useEffect, useState } from "react";
import "./current-date.css";
import moment from "moment";

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

    setLastUpdated(moment(updatedAtDate).format("DD MMMM"));
    setProcessing(moment(processedDate).format("DD MMMM"));
  }, []);

  useEffect(() => {
    console.log("herereer");
    fetchData();
  }, [fetchData]);

  return (
    <>
      <h2>Current processing info</h2>
      <div>
        Updated at: {lastUpated} <br />
        Currently processing: {processing}
      </div>
    </>
  );
}

export default CurrentDate;
