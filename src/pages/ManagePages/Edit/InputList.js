export const inputList = [
  { id: 1, label: "First name", placeholder: "First name", name: "firstName" },
  { id: 2, label: "last name", placeholder: "Last name", name: "lastName" },
  {
    id: 3,
    label: "Employee Id",
    placeholder: "Employee Id",
    name: "employeeId",
  },
  { id: 4, label: "Email", placeholder: "Email", name: "email" },
  { id: 5, label: "Phone Number", placeholder: "Phone Number", name: "mobile" },
];

export const dropdownlist = [
  { id: 1, label: "Supervisor", placeholder: "Supervisor", name: "userBossId" },
  {
    id: 2,
    label: "Select Employee Type",
    placeholder: "userType",
    name: "userType",
  },
  {
    id: 3,
    label: "Select Employee Position",
    placeholder: "position",
    name: "position",
  },
  { id: 4, label: "isActive", placeholder: "isActive", name: "isActive" },
  {
    id: 5,
    label: "checkLocation",
    placeholder: "checkLocation",
    name: "checkLocation",
  },
];

export const userposition = [
  { id: 1, label: "USER", value: "USER" },
  { id: 2, label: "HR", value: "HR" },
  { id: 3, label: "MANAGER", value: "MANAGER" },
];

export const usertype = [
  { id: 1, label: "FULL TIME", value: "FULLTIME" },
  { id: 2, label: "PART TIME", value: "PARTTIME" },
];

export const IsTrue = [
  { id: 1, label: "True", value: true },
  { id: 2, label: "False", value: false },
];

export const optionList = (arr) => {
  return arr.map((item) => ({
    id: item.id,
    label: item.label,
    value: item.value,
  }));
};
