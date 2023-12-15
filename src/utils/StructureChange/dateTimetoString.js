const dateTimeToString = (input) => {
  if (input) {
    return new Date(input).toTimeString().split(" ")[0];
  }
  return "N/A";
};
export default dateTimeToString;
