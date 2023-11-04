import Select from "react-select";

/**
 * The options array should contain objects.
 * Required keys are "name" and "value" but you can have and use any number of key/value pairs.
 */
const options = [
  { name: "Swedish", value: "sv" },
  { name: "English", value: "en" },
  {
    type: "group",
    name: "Group name",
    items: [{ name: "Spanish", value: "es" }],
  },
];


const DropdownSearch = ({  }) => {
  return (
    <div className="h=full w-full ">
      <Select
        options={options} // Pass the value pro
      />
    </div>
  );
};

export default DropdownSearch;
