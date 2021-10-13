import moment from "moment";

export default function dateFormatter(date, longMonth = true) {
  return moment(new Date(date)).format(`DD ${longMonth ? "MMMM" : "MMM"}`);
}
