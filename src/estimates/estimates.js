import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Input,
} from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import dateFormatter from "../helpers/date-formatter.helper";
import "./estimates.css";
import moment from "moment";

function Estimates() {
  const [skipHistory, setSkipHistory] = useState(true);
  const [date, setDate] = useState("26 July 2021");
  const [estimate, setEstimate] = useState(undefined);
  const [open, setOpen] = useState(true);

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

  const updateDate = (eventDate) => {
    if (!eventDate) return;
    setOpen(false);
    setDate(moment(new Date(eventDate)).format(`DD MMMM YYYY`));
  };

  return (
    <div className="estimates-container">
      <span className="estimation-header">Estimated completion date: </span>
      <h1 className="estimation">{estimate}</h1>
      <span className="current-date">
        for {date}
        <IconButton onClick={() => setOpen(true)} id="editbtn">
          <Edit />
        </IconButton>
      </span>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Submission date</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the submission date for your request to get the processing
            time estimates.
          </DialogContentText>
          <Input
            type="date"
            variant="outlined"
            value={new Date(date).toLocaleDateString().replace(/\//g, "-")}
            onChange={(event) => updateDate(event.target.value)}
            renderInput={(params) => <TextField {...params} />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
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
