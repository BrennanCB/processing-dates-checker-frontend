import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { useCallback, useEffect, useState } from "react";
import dateFormatter from "../helpers/date-formatter.helper";
import "./estimates.css";

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
    <div className="estimates-container">
      <span className="estimation-header">Estimated completion date: </span>
      <h1>{estimate}</h1>
      <span className="current-date">
        for {dateFormatter(date)}
        <IconButton id="editbtn">
          <Edit />
        </IconButton>
      </span>
      {/* <br /> */}
      {/* Use historic data */}
      {/* <Switch
        value={!skipHistory}
        onChange={() => setSkipHistory(!skipHistory)}
      /> */}
    </div>
  );
}

export default Estimates;
