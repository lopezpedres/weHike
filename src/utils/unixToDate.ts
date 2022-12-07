const unixToDate = (unix: number) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(unix * 1000);
  const day = days[date.getDay()];

  return day;
};
export default unixToDate;
