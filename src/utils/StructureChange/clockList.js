const clockList = (originalArray) => {
  return originalArray.map((obj) => {
    return {
      label:
        "IN:" +
        new Date(obj.clockInTime).toTimeString().split(" ")[0] +
        " OUT: " +
        new Date(obj.clockOutTime).toTimeString().split(" ")[0],
      value: obj.id,
    };
  });
};
export default clockList;
