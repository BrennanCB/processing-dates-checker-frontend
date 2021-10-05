import { useCallback, useEffect, useState } from "react";
import "./graph.css";
import moment from "moment";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";
import dateFormatter from "../helpers/date-formatter.helper";

function Graph() {
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    const response = await fetch(
      "https://polar-plains-81129.herokuapp.com/past-dates/"
    );

    const completionDates = await response.json();

    setData(
      completionDates.map(({ updatedAt, processed }) => {
        return {
          updatedAt: dateFormatter(updatedAt, false),
          completionTime: moment
            .duration(moment(new Date(updatedAt)).diff(new Date(processed)))
            .asWeeks(),
        };
      })
    );
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div class="graph-container">
      <ResponsiveContainer>
        <AreaChart
          data={data}
          syncId="processingDatesChart"
          margin={{
            top: 16,
            right: 16,
            left: 16,
            bottom: 16,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="updatedAt" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="completionTime"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div class="d-flex flex-column">
        <span> ave time taken</span>
        <span> trend for data</span>
        <span>current projection for dates</span>
      </div>
    </div>
  );
}

export default Graph;
