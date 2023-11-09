const supervisorList = (originalArray) => {
  return originalArray.map((obj) => {
    return {
      label: obj.employeeId + " " + obj.firstName,
      value: obj.id,
    };
  });
};
export default supervisorList;
