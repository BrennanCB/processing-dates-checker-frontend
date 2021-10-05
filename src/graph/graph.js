import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import dateFormatter from "../helpers/date-formatter.helper";
import "./graph.css";

function Graph() {
  const [data, setData] = useState([]);
  const [aveTime, setAveTime] = useState(0);
  const [trend, setTrend] = useState(0);
  const [currentCompletion, setCurrentCompletion] = useState(0);

  const fetchData = useCallback(async () => {
    const response = await fetch(
      "https://polar-plains-81129.herokuapp.com/past-dates/"
    );

    const completionDates = await response.json();

    const finalisedDates = completionDates.map(({ updatedAt, processed }) => {
      return {
        updatedAt: dateFormatter(updatedAt, false),
        completionTime: moment
          .duration(moment(new Date(updatedAt)).diff(new Date(processed)))
          .asWeeks(),
      };
    });

    const listOfDates = finalisedDates.reduce((arr, curr, currIndex, array) => {
      if (currIndex + 1 >= array.length) return arr;

      const firstDiff = curr.completionTime;
      const lastDiff = array[currIndex + 1].completionTime;

      const diff = ((lastDiff - firstDiff) / firstDiff) * 100;

      return [...arr, diff];
    }, []);

    const trend =
      listOfDates.reduce((val, curr) => {
        return val + curr;
      }, 0) / listOfDates.length;

    const ave =
      finalisedDates.reduce((val, curr) => {
        return val + curr.completionTime;
      }, 0) / finalisedDates.length;

    setData(finalisedDates);
    setAveTime(ave.toFixed(2));
    setTrend(trend.toFixed(2));
    setCurrentCompletion(
      moment
        .duration(
          moment(
            new Date(completionDates[completionDates.length - 1].updatedAt)
          ).diff(
            new Date(completionDates[completionDates.length - 1].processed)
          )
        )
        .asWeeks()
        .toFixed(2)
    );
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="graph-container">
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
          <Tooltip
            formatter={(value, name, props) => {
              return value.toFixed(2);
            }}
          />
          <Area
            type="monotone"
            name="Weeks to complete"
            dataKey="completionTime"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="d-flex flex-column">
        <span className="nowrap"> Ave complation {aveTime} weeks</span>
        <span className="nowrap"> Change in completion rage {trend}%</span>
        <span className="nowrap">
          {" "}
          Last completion time {currentCompletion} weeks
        </span>
      </div>
    </div>
  );
}

export default Graph;
