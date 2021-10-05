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
} from "recharts";

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
          updatedAt: moment(new Date(updatedAt)).format("DD MMMM"),
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
    <AreaChart
      width={800}
      height={200}
      data={data}
      syncId="processingDatesChart"
      margin={{
        top: 10,
        right: 30,
        left: 60,
        bottom: 0,
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
  );
}

export default Graph;
