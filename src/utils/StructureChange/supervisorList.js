const  supervisorList = (originalArray) => {
    return originalArray.map((obj) => {
      return {
        label: obj.EmployeeID + " " + obj.FistName,
        value: obj.id,
      };
    });
  };
  export default supervisorList